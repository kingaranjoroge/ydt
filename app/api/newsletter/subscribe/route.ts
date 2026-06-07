import { NextResponse } from "next/server"
import { z } from "zod"
import { createSupabaseAdminClient } from "@/lib/supabase/server"

const subscribeSchema = z.object({
  email: z.string().trim().email().max(254),
})

const resendApiKey = process.env.RESEND_API_KEY
const newsletterFromEmail = process.env.NEWSLETTER_FROM_EMAIL

async function sendAcknowledgementEmail(email: string) {
  if (!resendApiKey || !newsletterFromEmail) {
    throw new Error("Newsletter email delivery is not configured.")
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: newsletterFromEmail,
      to: [email],
      subject: "Thanks for subscribing to YDT Community",
      html: `
        <p>Thanks for subscribing to YDT Community.</p>
        <p>We will send occasional opportunities, stories, and updates to this inbox.</p>
      `,
      text: "Thanks for subscribing to YDT Community. We will send occasional opportunities, stories, and updates to this inbox.",
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || "Failed to send acknowledgement email.")
  }
}

export async function POST(request: Request) {
  const supabase = createSupabaseAdminClient()

  if (!supabase) {
    return NextResponse.json(
      { message: "Newsletter subscriptions are not configured yet." },
      { status: 503 }
    )
  }

  const body = await request.json().catch(() => null)
  const parsed = subscribeSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Enter a valid email address to subscribe." },
      { status: 400 }
    )
  }

  const email = parsed.data.email.toLowerCase()
  const referrer = request.headers.get("referer") ?? null
  const userAgent = request.headers.get("user-agent") ?? null

  const { error } = await supabase.from("newsletter_subscribers").insert({
    email,
    source: "footer",
    referrer,
    user_agent: userAgent,
  })

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({
        message: "You are already subscribed. Check your inbox for our latest updates.",
      })
    }

    return NextResponse.json(
      { message: "We could not save your subscription right now. Please try again." },
      { status: 500 }
    )
  }

  try {
    await sendAcknowledgementEmail(email)
  } catch (error) {
    console.error("Failed to send newsletter acknowledgement email", error)
  }

  return NextResponse.json({
    message: "Thanks for subscribing. Check your inbox for our welcome email.",
  })
}