"use client"

import { useState, type FormEvent } from "react"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email.trim()) {
      return
    }

    setSubscribed(true)
    setEmail("")
  }

  return (
    <section className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-secondary/10 p-6 shadow-sm sm:p-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
          Weekly Opportunities
        </p>
        <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
          Join 2,000+ others getting weekly digital opportunities
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Receive curated jobs, learning resources, and practical community updates to accelerate your digital career.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row" aria-label="Newsletter sign up form">
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            required
            className="h-11 bg-card/90"
            aria-label="Email address"
          />
          <Button type="submit" className="h-11 px-6">
            Subscribe
          </Button>
        </form>

        {subscribed ? (
          <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary" role="status" aria-live="polite">
            <CheckCircle2 className="h-4 w-4" />
            Thanks for subscribing. You are on the list.
          </p>
        ) : null}
      </div>
    </section>
  )
}
