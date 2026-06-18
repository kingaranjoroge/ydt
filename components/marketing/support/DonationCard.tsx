"use client"

import { useState, type FormEvent } from "react"
import { ShieldCheck, Target } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

import { SectionLabel } from "./SectionLabel"
import { donationTiers } from "./data"

export function DonationCard() {
  const [selectedAmount, setSelectedAmount] = useState(500)
  const [customAmount, setCustomAmount] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [status, setStatus] = useState<{ kind: "idle" | "success" | "error"; message: string }>({ kind: "idle", message: "" })

  const activeAmount = customAmount.trim() || String(selectedAmount)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedAmount = Number(activeAmount.replace(/,/g, "").trim())
    const normalizedPhone = phoneNumber.replace(/\s+/g, "").trim()

    if (!Number.isFinite(normalizedAmount) || normalizedAmount <= 0 || !normalizedPhone) {
      setStatus({ kind: "error", message: "Enter a valid donation amount and phone number to show the demo flow." })
      return
    }

    setStatus({
      kind: "success",
      message: `Demo only: donation flow prepared for KES ${normalizedAmount.toLocaleString("en-KE")} from +254${normalizedPhone.replace(/^\+?254/, "")}.`,
    })
  }

  return (
    <section id="donate" className="py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-[1.1fr_0.9fr] md:px-6">
        <Card className="border-border/70 shadow-lg shadow-primary/5">
          <CardHeader className="space-y-3">
            <SectionLabel>Individual Donations</SectionLabel>
            <CardTitle className="text-3xl">Make a direct contribution</CardTitle>
            <CardDescription className="max-w-2xl text-base leading-relaxed">
              Select a preset tier or enter a custom amount. This build stays fully static, so the button only demonstrates the future flow.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid gap-3 sm:grid-cols-3">
              {donationTiers.map((tier) => {
                const isSelected = selectedAmount === tier.amount && !customAmount.trim()
                return (
                  <button
                    key={tier.amount}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(tier.amount)
                      setCustomAmount("")
                    }}
                    className={cn(
                      "group rounded-2xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md",
                      isSelected ? "border-primary bg-primary/5 shadow-md shadow-primary/10" : "border-border bg-background",
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-muted-foreground">KES {tier.amount.toLocaleString("en-KE")}</p>
                      {isSelected ? <Badge className="bg-primary text-primary-foreground">Selected</Badge> : null}
                    </div>
                    <p className="mt-4 text-base font-semibold text-foreground">{tier.label}</p>
                  </button>
                )
              })}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="custom-donation" className="text-sm font-medium text-foreground">Custom donation amount</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                      KES
                    </span>
                    <Input
                      id="custom-donation"
                      inputMode="numeric"
                      value={customAmount}
                      onChange={(event) => {
                        setCustomAmount(event.target.value)
                        const digits = event.target.value.replace(/[^0-9]/g, "")
                        if (digits) {
                          setSelectedAmount(Number(digits))
                        }
                      }}
                      placeholder="1,000"
                      className="pl-16 text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone-number" className="text-sm font-medium text-foreground">Phone number</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm font-medium text-muted-foreground">
                      +254
                    </span>
                    <Input
                      id="phone-number"
                      type="tel"
                      value={phoneNumber}
                      onChange={(event) => setPhoneNumber(event.target.value)}
                      placeholder="7XX XXX XXX"
                      className="pl-16 text-base"
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </div>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                Demo state only. Payment integration, STK Push, and backend processing can be added later.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button type="submit" size="lg" className="text-base">Donate Now</Button>
                <p className="text-sm text-muted-foreground">Your selection will be previewed before any future payment flow.</p>
              </div>

              {status.message ? (
                <div
                  className={cn(
                    "rounded-2xl border p-4 text-sm leading-relaxed",
                    status.kind === "error" ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-800",
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

        <div className="grid gap-4">
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Target className="h-5 w-5 text-primary" />
                Where support goes
              </CardTitle>
              <CardDescription>Small, direct, and visible community outcomes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="rounded-2xl border border-border bg-background p-4">
                <div className="flex items-center justify-between text-foreground">
                  <span>Programs & learner support</span>
                  <span className="font-semibold">75%</span>
                </div>
                <Progress value={75} className="mt-3 h-3" />
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Mentorship", value: "Workshops and coaching" },
                  { label: "Access", value: "Connectivity and tools" },
                  { label: "Opportunity", value: "Community pathways" },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-border bg-background p-4">
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="mt-2 text-xs leading-relaxed">{item.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Trust signals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Anonymous donors are welcome and recognized with discretion.</p>
              <p>Financial reporting and allocation updates can be published quarterly.</p>
              <p>Support flows remain modular so future payment integrations can slot in cleanly.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}