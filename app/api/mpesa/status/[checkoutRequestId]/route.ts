import { NextResponse } from "next/server"

import { createSupabaseAdminClient } from "@/lib/supabase/server"
import { stkQuery } from "@/lib/mpesa/client"

const TERMINAL_STATUSES = new Set(["completed", "failed", "cancelled", "timeout"])
const QUERY_FALLBACK_DELAY_MS = 15_000

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ checkoutRequestId: string }> }
) {
  const { checkoutRequestId } = await params
  const supabase = createSupabaseAdminClient()

  if (!supabase) {
    return NextResponse.json({ message: "Donations are not configured yet." }, { status: 503 })
  }

  const { data: donation } = await supabase
    .from("donations")
    .select("status, amount, mpesa_receipt_number, result_desc, created_at")
    .eq("checkout_request_id", checkoutRequestId)
    .maybeSingle()

  if (!donation) {
    return NextResponse.json({ message: "We couldn't find that payment." }, { status: 404 })
  }

  if (TERMINAL_STATUSES.has(donation.status)) {
    return NextResponse.json({
      status: donation.status,
      amount: donation.amount,
      mpesaReceiptNumber: donation.mpesa_receipt_number,
      resultDesc: donation.result_desc,
    })
  }

  const createdAt = new Date(donation.created_at).getTime()
  if (Date.now() - createdAt > QUERY_FALLBACK_DELAY_MS) {
    const queryResult = await stkQuery(checkoutRequestId)

    if (queryResult.ok && queryResult.resultCode !== 0) {
      const status = queryResult.resultCode === 1032 ? "cancelled" : "failed"

      await supabase
        .from("donations")
        .update({
          status,
          result_code: queryResult.resultCode,
          result_desc: queryResult.resultDesc,
          updated_at: new Date().toISOString(),
        })
        .eq("checkout_request_id", checkoutRequestId)
        .eq("status", "pending")

      return NextResponse.json({
        status,
        amount: donation.amount,
        mpesaReceiptNumber: null,
        resultDesc: queryResult.resultDesc,
      })
    }
  }

  return NextResponse.json({
    status: donation.status,
    amount: donation.amount,
    mpesaReceiptNumber: donation.mpesa_receipt_number,
    resultDesc: donation.result_desc,
  })
}
