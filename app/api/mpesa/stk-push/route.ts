import { NextResponse } from "next/server"
import { z } from "zod"

import { createSupabaseAdminClient } from "@/lib/supabase/server"
import { isMpesaConfigured, normalizeKenyanPhone, stkPush } from "@/lib/mpesa/client"

const stkPushSchema = z.object({
  amount: z.number().int().min(1).max(250000),
  phone: z.string().trim().min(9).max(15),
})

export async function POST(request: Request) {
  const supabase = createSupabaseAdminClient()

  if (!supabase) {
    return NextResponse.json(
      { message: "Donations are not configured yet. Please try again later." },
      { status: 503 }
    )
  }

  if (!isMpesaConfigured()) {
    return NextResponse.json(
      { message: "M-Pesa payments are not configured yet. Please pay manually instead." },
      { status: 503 }
    )
  }

  const body = await request.json().catch(() => null)
  const parsed = stkPushSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Enter a valid donation amount and phone number to continue." },
      { status: 400 }
    )
  }

  const normalizedPhone = normalizeKenyanPhone(parsed.data.phone)

  if (!normalizedPhone) {
    return NextResponse.json(
      { message: "Enter a valid Safaricom number, e.g. 712 345 678." },
      { status: 400 }
    )
  }

  const { amount } = parsed.data

  const { data: donation, error: insertError } = await supabase
    .from("donations")
    .insert({ amount, phone: normalizedPhone, status: "pending" })
    .select("id")
    .single()

  if (insertError || !donation) {
    console.error("Failed to create donation row", insertError)
    return NextResponse.json(
      { message: "We could not start your donation right now. Please try again." },
      { status: 500 }
    )
  }

  const result = await stkPush({ amount, phone: normalizedPhone })

  if (!result.ok) {
    console.error("M-Pesa STK push failed", result.error)
    await supabase
      .from("donations")
      .update({ status: "failed", result_desc: result.error, updated_at: new Date().toISOString() })
      .eq("id", donation.id)

    return NextResponse.json(
      { message: "We couldn't reach M-Pesa right now. Try paying manually instead." },
      { status: 502 }
    )
  }

  const { error: updateError } = await supabase
    .from("donations")
    .update({
      checkout_request_id: result.checkoutRequestId,
      merchant_request_id: result.merchantRequestId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", donation.id)

  if (updateError) {
    console.error("Failed to record STK push identifiers", updateError)
  }

  return NextResponse.json({
    message: "Check your phone to complete the payment.",
    checkoutRequestId: result.checkoutRequestId,
    donationId: donation.id,
  })
}
