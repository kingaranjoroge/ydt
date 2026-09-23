# M-Pesa STK Push for Donations (with Manual Paybill kept as fallback)

## Context

Previously, `DonationCard.tsx` only offered a "manual" flow: the user enters an amount/phone, clicks Donate Now, and a modal shows Paybill instructions to complete on their own phone — there was no way to verify a donation actually happened, and the phone number field was collected but unused. This feature adds real Safaricom STK Push (Lipa Na M-Pesa Online) so a payment prompt is pushed directly to the donor's phone, while keeping the manual-instructions flow available as a secondary option (chosen via tabs, STK Push default). This closes the loop on confirming and recording actual donations, while not removing the fallback for users whose STK prompt fails or who prefer paying independently.

## Scope decision

The `donations` table records **STK Push transactions only**. The Manual tab stays pixel-for-pixel as it was before — no API call, no DB row. STK and manual donations aren't unified in one ledger yet; that's a known, acceptable gap for now.

The amount-tier grid and phone input stay **shared above the tabs** (not duplicated per tab). Tabs only change what Submit does and what result UI renders below it.

## 1. Daraja OAuth + helpers — `lib/mpesa/client.ts`

- Module-level in-memory token cache (`{token, expiresAt}`), refetch when within 60s of expiry. No Redis/global store — on Vercel this means occasional extra token fetches across cold starts/instances, which is fine at this volume; avoids over-engineering.
- `baseUrl`: `MPESA_ENV === "production" ? "https://api.safaricom.co.ke" : "https://sandbox.safaricom.co.ke"`.
- `normalizeKenyanPhone(input)` — accepts `0712345678` / `712345678` / `+254712345678`, returns `2547XXXXXXXX` or `null`.
- `buildStkPassword(shortcode, passkey, timestamp)`, `nairobiTimestamp()` (UTC+3, since Vercel runs UTC).
- `stkPush(payload)` / `stkQuery(checkoutRequestId)` — `fetch` wrappers for the two Daraja endpoints (no axios needed, native `fetch` is already the project's convention).

## 2. Initiate route — `app/api/mpesa/stk-push/route.ts`

Follows the existing `app/api/contact/route.ts` / `newsletter/subscribe/route.ts` convention: zod validation → `createSupabaseAdminClient()` null-check (→503) → DB write → external call → `NextResponse.json({message})` shaped responses.

- Body: `{ amount: number, phone: string }`. zod: `amount` int 1–250000, `phone` string.
- Normalize phone (400 on invalid) → **insert a `pending` row first** (gives an audit trail even if Daraja fails) → call Daraja STK push with `CallBackURL: MPESA_CALLBACK_URL?secret=MPESA_CALLBACK_SECRET`.
- Success (`ResponseCode==="0"`): update row with `checkout_request_id`/`merchant_request_id`, return `200 {message, checkoutRequestId, donationId}`.
- Failure: update row `status='failed'`, `console.error`, return `502` with a message nudging toward manual payment.

## 3. Callback webhook — `app/api/mpesa/callback/route.ts`

Public endpoint Safaricom POSTs to asynchronously (can't send custom headers, so no bearer auth).

- **Shared secret via query string**: the callback URL is registered with `?secret=MPESA_CALLBACK_SECRET`; mismatch → still ack 200 (don't leak validation via error responses), skip DB write.
- Only mutate a row that already exists for the given `checkout_request_id` — prevents spoofed POSTs from writing arbitrary data. No IP allowlist (Safaricom's source IPs aren't reliably published; not worth the fragility here).
- Parse `Body.stkCallback` (guarded, malformed → ack 200 + log). `ResultCode===0` → pull `Amount`/`MpesaReceiptNumber`/`PhoneNumber` from `CallbackMetadata.Item`, set `status='completed'` using **Safaricom-reported values**, never client-submitted ones. `ResultCode===1032` → `status='cancelled'`; anything else → `status='failed'`. Store `result_code`/`result_desc` regardless.
- Idempotent: only update `WHERE id=... AND status='pending'` (guards against Safaricom's callback retries).
- Always respond `200 {"ResultCode":0,"ResultDesc":"Success"}` — required ack shape, otherwise Safaricom keeps retrying.

## 4. Status polling — `app/api/mpesa/status/[checkoutRequestId]/route.ts`

- `GET`: look up row by `checkout_request_id` (404 if missing). Terminal status → return immediately.
- Still `pending` after ~15s → fall back to `stkQuery()`, but **only** to detect definitive failure/cancellation sooner; never use it to mark `completed` (Query API has no receipt number — completion must come from the callback, to avoid recording success without a real receipt).
- Client contract: poll every 3s, give up after ~60s (20 attempts) and show a "still processing / pay manually instead" state.

## 5. Database — `supabase/migrations/20260922120000_donations.sql`

Mirrors the `contact_submissions.sql` migration pattern:

```sql
create extension if not exists pgcrypto;

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  amount integer not null,
  phone text not null,
  status text not null default 'pending'
    check (status in ('pending', 'completed', 'failed', 'cancelled', 'timeout')),
  checkout_request_id text unique,
  merchant_request_id text,
  mpesa_receipt_number text,
  result_code integer,
  result_desc text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists donations_checkout_request_id_idx
  on public.donations (checkout_request_id);

alter table public.donations enable row level security;
```

`updated_at` is set explicitly in app code on each `UPDATE` — no trigger precedent exists in this codebase, so none was introduced.

## 6. Frontend — `components/marketing/support/DonationCard.tsx`

- Uses existing `@/components/ui/tabs` (`Tabs`/`TabsList`/`TabsTrigger`/`TabsContent`) — already present in the project, no new dependency.
- State: `paymentMethod: "stk" | "manual"` (default `"stk"`), `mpesaState: "idle" | "requesting" | "polling" | "success" | "failed" | "timeout"`, plus `checkoutRequestId`, `receiptNumber`, `elapsedSeconds`, `mpesaError`.
- Shared tier grid + amount + phone inputs stay above the tabs, unchanged.
- `handleSubmit` keeps existing validation, then branches:
  - **manual** → exactly the original code path: `setConfirmedAmount(...); setIsMpesaModalOpen(true)`. No API call, Dialog untouched.
  - **stk** → `POST /api/mpesa/stk-push`, then polls `GET /api/mpesa/status/[checkoutRequestId]` every 3s up to 60s, transitioning `mpesaState` through requesting → polling → success/failed/timeout.
- UI per state: idle (submit button), requesting (disabled + spinner), polling (spinner + "check your phone" + elapsed seconds + cancel), success (receipt + amount + "donate again"), failed (error + "try again" + "pay manually instead" button that flips `paymentMethod`), timeout ("still processing" + "check again" + "pay manually instead").
- The original `Dialog` is not touched at all — it's simply what the Manual tab still triggers.

## 7. Environment variables — `.env.example` additions

```
MPESA_ENV=sandbox
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_SHORTCODE=174379
MPESA_PASSKEY=your_passkey
MPESA_CALLBACK_URL=https://your-deployment-url.vercel.app/api/mpesa/callback
MPESA_CALLBACK_SECRET=your_random_shared_secret
```

No `NEXT_PUBLIC_*` vars needed — the browser only ever talks to our own `/api/mpesa/*` routes, never Daraja directly. Local dev note: Safaricom can't reach `localhost`, so `MPESA_CALLBACK_URL` needs an ngrok tunnel or a deployed preview URL during testing.

## 8. Daraja Developer Portal prerequisites

1. Create an account at developer.safaricom.co.ke.
2. Create a new App with the "Lipa Na M-Pesa Online" (STK Push) product — issues a **sandbox** Consumer Key/Secret immediately, no approval wait.
3. For development, use Safaricom's standard published sandbox values regardless of the real Paybill: Shortcode `174379` + the standard sandbox Passkey from Daraja's docs.
4. Use Safaricom's sandbox test MSISDNs (e.g. `254708374149`) — sandbox is fully simulated, no real phone prompt or money movement.
5. Build/test against `https://sandbox.safaricom.co.ke` (`MPESA_ENV=sandbox`).
6. To go live: submit a Go-Live request in the Daraja portal referencing the real Paybill `880100` (business verification tied to the account holding that Paybill via NCBA Bank Kenya Plc).
7. Once approved, Safaricom issues production Consumer Key/Secret + a production Passkey tied to `880100` (passkey typically obtained via Safaricom business support directly).
8. Flip env vars (`MPESA_ENV=production`, `MPESA_SHORTCODE=880100`, production passkey, production `MPESA_CALLBACK_URL`) — base URL switches automatically.
9. Run one real, small-value end-to-end test before wider rollout.

## File list

| File | Purpose |
|---|---|
| `lib/mpesa/client.ts` | OAuth token cache, base URL, phone normalization, STK push/query helpers |
| `app/api/mpesa/stk-push/route.ts` | Initiates STK push, writes pending donation row |
| `app/api/mpesa/callback/route.ts` | Safaricom webhook, updates donation row |
| `app/api/mpesa/status/[checkoutRequestId]/route.ts` | Client polling endpoint |
| `supabase/migrations/20260922120000_donations.sql` | `donations` table |
| `components/marketing/support/DonationCard.tsx` | Tabs + STK state machine; manual flow untouched |
| `.env.example` | `MPESA_*` vars |

## Verification plan

1. `ngrok http 3000`, set `.env.local` with sandbox credentials + `MPESA_CALLBACK_URL` pointed at the ngrok HTTPS URL.
2. Apply the migration to Supabase (CLI, matching existing migration workflow).
3. `npm run dev`, open `/support#donate`, confirm STK tab is selected by default.
4. Submit with sandbox test number `0708374149` → confirm `checkoutRequestId` returned, UI enters polling state.
5. Watch ngrok inspector (`127.0.0.1:4040`) for the inbound callback POST; confirm UI reaches success state with a receipt number.
6. Check the Supabase `donations` row: `status='completed'`, IDs + receipt + `result_code=0` populated, `updated_at` advanced.
7. Simulate a `ResultCode:1032` callback manually (curl through the ngrok URL with a real `CheckoutRequestID`) → confirm row flips to `cancelled` and UI shows failed state with "pay manually instead".
8. Pause ngrok mid-request → confirm client gives up at ~60s and shows the timeout UI.
9. Switch to Manual tab → confirm it still opens the untouched Dialog with zero network requests.
10. Confirm no real secrets are committed — only `.env.example` placeholders.
