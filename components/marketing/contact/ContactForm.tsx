"use client"

import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

import { SectionLabel } from "../support/SectionLabel"
import { enquiryOptions } from "./enquiry-options"

type Status = { kind: "idle" | "loading" | "success" | "error"; message: string }

const initialForm = { name: "", email: "", enquiryType: "", message: "" }

export function ContactForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState<Status>({ kind: "idle", message: "" })

  const handleChange = (field: keyof typeof initialForm) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleEnquiryChange = (value: string) => {
    setForm((prev) => ({ ...prev, enquiryType: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!form.name.trim() || !form.email.trim() || !form.enquiryType || !form.message.trim()) {
      setStatus({ kind: "error", message: "Please fill in your name, email, enquiry type, and message." })
      return
    }

    setStatus({ kind: "loading", message: "" })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const payload = (await response.json().catch(() => null)) as { message?: string } | null

      if (!response.ok) {
        throw new Error(payload?.message ?? "We could not send your message. Please try again.")
      }

      setStatus({
        kind: "success",
        message: payload?.message ?? "Thanks for reaching out. We'll get back to you soon.",
      })
      setForm(initialForm)
    } catch (error) {
      setStatus({
        kind: "error",
        message: error instanceof Error ? error.message : "We could not send your message. Please try again.",
      })
    }
  }

  return (
    <Card className="border-border/70 shadow-lg shadow-primary/5">
      <CardHeader className="space-y-3">
        <SectionLabel>Send a Message</SectionLabel>
        <CardTitle className="text-3xl">Tell us what&apos;s on your mind</CardTitle>
        <CardDescription className="max-w-2xl text-base leading-relaxed">
          Whether it&apos;s a partnership idea, a program question, or feedback, fill out the form and our team will follow up.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5" aria-label="Contact form">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Full name</Label>
              <Input
                id="contact-name"
                value={form.name}
                onChange={handleChange("name")}
                placeholder="Jane Doe"
                autoComplete="name"
                required
                disabled={status.kind === "loading"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-email">Email address</Label>
              <Input
                id="contact-email"
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                placeholder="you@example.com"
                autoComplete="email"
                required
                disabled={status.kind === "loading"}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-enquiry">Enquiry type</Label>
            <Select
              value={form.enquiryType}
              onValueChange={handleEnquiryChange}
              disabled={status.kind === "loading"}
            >
              <SelectTrigger id="contact-enquiry" aria-label="Enquiry type">
                <SelectValue placeholder="Select a reason for reaching out" />
              </SelectTrigger>
              <SelectContent>
                {enquiryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              value={form.message}
              onChange={handleChange("message")}
              placeholder="Tell us a bit more..."
              className="min-h-[140px]"
              required
              disabled={status.kind === "loading"}
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button type="submit" size="lg" className="text-base" disabled={status.kind === "loading"}>
              {status.kind === "loading" ? "Sending..." : "Send Message"}
            </Button>
          </div>

          {status.message ? (
            <div
              className={cn(
                "rounded-2xl border p-4 text-sm leading-relaxed",
                status.kind === "error"
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-emerald-200 bg-emerald-50 text-emerald-800",
              )}
              role="status"
              aria-live="polite"
            >
              {status.message}
            </div>
          ) : null}
        </form>
      </CardContent>
    </Card>
  )
}

export default ContactForm
