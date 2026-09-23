const consumerKey = process.env.MPESA_CONSUMER_KEY
const consumerSecret = process.env.MPESA_CONSUMER_SECRET
const shortcode = process.env.MPESA_SHORTCODE
const passkey = process.env.MPESA_PASSKEY
const callbackUrl = process.env.MPESA_CALLBACK_URL
const callbackSecret = process.env.MPESA_CALLBACK_SECRET

export function isMpesaConfigured() {
  return Boolean(consumerKey && consumerSecret && shortcode && passkey && callbackUrl && callbackSecret)
}

export function isValidCallbackSecret(value: string | null) {
  return Boolean(callbackSecret) && value === callbackSecret
}

function getBaseUrl() {
  return process.env.MPESA_ENV === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke"
}

let cachedToken: { token: string; expiresAt: number } | null = null

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
    return cachedToken.token
  }

  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64")
  const response = await fetch(`${getBaseUrl()}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${credentials}` },
  })

  if (!response.ok) {
    throw new Error(`Failed to obtain M-Pesa access token (status ${response.status}).`)
  }

  const data = (await response.json()) as { access_token: string; expires_in: string }
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + Number(data.expires_in) * 1000,
  }

  return cachedToken.token
}

export function normalizeKenyanPhone(input: string): string | null {
  const digits = input.replace(/[^0-9]/g, "")

  let local: string | null = null
  if (digits.startsWith("254") && digits.length === 12) {
    local = digits.slice(3)
  } else if (digits.startsWith("0") && digits.length === 10) {
    local = digits.slice(1)
  } else if (digits.length === 9) {
    local = digits
  }

  if (!local || !/^7\d{8}$/.test(local)) {
    return null
  }

  return `254${local}`
}

function nairobiTimestamp(): string {
  const nowNairobi = new Date(Date.now() + 3 * 60 * 60 * 1000)
  const pad = (value: number) => String(value).padStart(2, "0")

  return (
    `${nowNairobi.getUTCFullYear()}${pad(nowNairobi.getUTCMonth() + 1)}${pad(nowNairobi.getUTCDate())}` +
    `${pad(nowNairobi.getUTCHours())}${pad(nowNairobi.getUTCMinutes())}${pad(nowNairobi.getUTCSeconds())}`
  )
}

type StkPushResult =
  | { ok: true; checkoutRequestId: string; merchantRequestId: string }
  | { ok: false; error: string }

export async function stkPush({ amount, phone }: { amount: number; phone: string }): Promise<StkPushResult> {
  const timestamp = nairobiTimestamp()
  const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64")

  try {
    const accessToken = await getAccessToken()
    const response = await fetch(`${getBaseUrl()}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: shortcode,
        PhoneNumber: phone,
        CallBackURL: `${callbackUrl}?secret=${callbackSecret}`,
        AccountReference: "YDT Donation",
        TransactionDesc: "Donation to YDT",
      }),
    })

    const data = await response.json()

    if (!response.ok || data.ResponseCode !== "0") {
      return { ok: false, error: data.errorMessage || data.ResponseDescription || "M-Pesa rejected the request." }
    }

    return {
      ok: true,
      checkoutRequestId: data.CheckoutRequestID,
      merchantRequestId: data.MerchantRequestID,
    }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Failed to reach M-Pesa." }
  }
}

type StkQueryResult =
  | { ok: true; resultCode: number; resultDesc: string }
  | { ok: false; error: string }

export async function stkQuery(checkoutRequestId: string): Promise<StkQueryResult> {
  const timestamp = nairobiTimestamp()
  const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64")

  try {
    const accessToken = await getAccessToken()
    const response = await fetch(`${getBaseUrl()}/mpesa/stkpushquery/v1/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestId,
      }),
    })

    const data = await response.json()

    if (!response.ok || data.ResultCode === undefined) {
      return { ok: false, error: data.errorMessage || "M-Pesa query failed." }
    }

    return { ok: true, resultCode: Number(data.ResultCode), resultDesc: data.ResultDesc }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Failed to reach M-Pesa." }
  }
}
