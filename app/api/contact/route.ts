import { NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"

import { enquiryValues, getEnquiryLabel } from "@/components/marketing/contact/enquiry-options"

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  enquiryType: z.enum(enquiryValues),
  message: z.string().trim().min(10).max(5000),
})

const resendApiKey = process.env.RESEND_API_KEY
const contactFromEmail = process.env.CONTACT_FROM_EMAIL
const contactToEmail = process.env.CONTACT_TO_EMAIL
const resend = resendApiKey ? new Resend(resendApiKey) : null

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

export async function POST(request: Request) {
  if (!resend || !contactFromEmail || !contactToEmail) {
    return NextResponse.json(
      { message: "The contact form is not configured yet. Please email us directly." },
      { status: 503 }
    )
  }

  const body = await request.json().catch(() => null)
  const parsed = contactSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Please fill in your name, email, enquiry type, and a message of at least 10 characters." },
      { status: 400 }
    )
  }

  const { name, email, enquiryType, message } = parsed.data
  const enquiryLabel = getEnquiryLabel(enquiryType)

  const { error } = await resend.emails.send({
    from: contactFromEmail,
    to: [contactToEmail],
    replyTo: email,
    subject: `[Contact Form] ${enquiryLabel} — ${name}`,
    html: `
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Enquiry type:</strong> ${escapeHtml(enquiryLabel)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    `,
    text: `Name: ${name}\nEmail: ${email}\nEnquiry type: ${enquiryLabel}\n\nMessage:\n${message}`,
  })

  if (error) {
    console.error("Failed to send contact form email", error)
    return NextResponse.json(
      { message: "We could not send your message right now. Please try again or email us directly." },
      { status: 500 }
    )
  }

  return NextResponse.json({
    message: "Thanks for reaching out. We'll get back to you soon.",
  })
}
