import { NextResponse } from "next/server"

import { createSupabaseAdminClient } from "@/lib/supabase/server"
import { isValidCallbackSecret } from "@/lib/mpesa/client"

const ACK = { ResultCode: 0, ResultDesc: "Success" }

type CallbackItem = { Name: string; Value?: string | number }

export async function POST(request: Request) {
  const secret = new URL(request.url).searchParams.get("secret")

  if (!isValidCallbackSecret(secret)) {
    console.warn("Rejected M-Pesa callback with invalid secret")
    return NextResponse.json(ACK)
  }

  const supabase = createSupabaseAdminClient()
  if (!supabase) {
    console.error("M-Pesa callback received but Supabase is not configured")
    return NextResponse.json(ACK)
  }

  const body = await request.json().catch(() => null)
  const stkCallback = body?.Body?.stkCallback

  if (!stkCallback?.CheckoutRequestID) {
    console.warn("Malformed M-Pesa callback payload", body)
    return NextResponse.json(ACK)
  }

  const { CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = stkCallback

  const { data: donation } = await supabase
    .from("donations")
    .select("id, status")
    .eq("checkout_request_id", CheckoutRequestID)
    .maybeSingle()

  if (!donation) {
    console.warn("M-Pesa callback for unknown checkout request", CheckoutRequestID)
    return NextResponse.json(ACK)
  }

  if (donation.status !== "pending") {
    return NextResponse.json(ACK)
  }

  const resultCode = Number(ResultCode)
  const update: Record<string, unknown> = {
    result_code: resultCode,
    result_desc: ResultDesc ?? null,
    updated_at: new Date().toISOString(),
  }

  if (resultCode === 0) {
    const items: CallbackItem[] = CallbackMetadata?.Item ?? []
    const metadata = Object.fromEntries(items.map((item) => [item.Name, item.Value]))

    update.status = "completed"
    update.mpesa_receipt_number = metadata.MpesaReceiptNumber ?? null
    if (metadata.Amount !== undefined) {
      update.amount = metadata.Amount
    }
    if (metadata.PhoneNumber !== undefined) {
      update.phone = String(metadata.PhoneNumber)
    }
  } else if (resultCode === 1032) {
    update.status = "cancelled"
  } else {
    update.status = "failed"
  }

  const { error } = await supabase
    .from("donations")
    .update(update)
    .eq("id", donation.id)
    .eq("status", "pending")

  if (error) {
    console.error("Failed to apply M-Pesa callback update", error)
  }

  return NextResponse.json(ACK)
}
