"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import { CheckCircle2, Loader2, ShieldCheck, Target, XCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

import { SectionLabel } from "./SectionLabel"
import { donationTiers } from "./data"

const MPESA_PAYBILL_NUMBER = "880100"
const MPESA_ACCOUNT_NAME = "NCBA Bank Kenya Plc"
const MPESA_ACCOUNT_NUMBER = "4412750019"

const POLL_INTERVAL_SECONDS = 3
const POLL_TIMEOUT_SECONDS = 60

type MpesaState = "idle" | "requesting" | "polling" | "success" | "failed" | "timeout"

export function DonationCard() {
  const [selectedAmount, setSelectedAmount] = useState(500)
  const [customAmount, setCustomAmount] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [status, setStatus] = useState<{ kind: "idle" | "error"; message: string }>({ kind: "idle", message: "" })
  const [isMpesaModalOpen, setIsMpesaModalOpen] = useState(false)
  const [confirmedAmount, setConfirmedAmount] = useState(0)

  const [paymentMethod, setPaymentMethod] = useState<"stk" | "manual">("stk")
  const [mpesaState, setMpesaState] = useState<MpesaState>("idle")
  const [checkoutRequestId, setCheckoutRequestId] = useState<string | null>(null)
  const [receiptNumber, setReceiptNumber] = useState<string | null>(null)
  const [stkAmount, setStkAmount] = useState(0)
  const [mpesaError, setMpesaError] = useState("")
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const activeAmount = customAmount.trim() || String(selectedAmount)

  useEffect(() => {
    return () => {
      if (pollTimerRef.current) {
        clearInterval(pollTimerRef.current)
      }
    }
  }, [])

  const stopPolling = () => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current)
      pollTimerRef.current = null
    }
  }

  const checkStatus = async (id: string) => {
    try {
      const response = await fetch(`/api/mpesa/status/${id}`)
      const data = await response.json()

      if (!response.ok) {
        return
      }

      if (data.status === "completed") {
        stopPolling()
        setReceiptNumber(data.mpesaReceiptNumber ?? null)
        setMpesaState("success")
      } else if (data.status === "failed" || data.status === "cancelled") {
        stopPolling()
        setMpesaError(data.resultDesc || "The payment was not completed.")
        setMpesaState("failed")
      }
    } catch {
      // transient network error while polling — keep waiting for the next tick
    }
  }

  const beginPolling = (id: string) => {
    setElapsedSeconds(0)
    setMpesaState("polling")

    let seconds = 0
    pollTimerRef.current = setInterval(() => {
      seconds += 1
      setElapsedSeconds(seconds)

      if (seconds >= POLL_TIMEOUT_SECONDS) {
        stopPolling()
        setMpesaState("timeout")
        return
      }

      if (seconds % POLL_INTERVAL_SECONDS === 0) {
        void checkStatus(id)
      }
    }, 1000)
  }

  const resetMpesaFlow = () => {
    stopPolling()
    setMpesaState("idle")
    setCheckoutRequestId(null)
    setReceiptNumber(null)
    setMpesaError("")
    setElapsedSeconds(0)
  }

  const switchToManual = () => {
    resetMpesaFlow()
    setPaymentMethod("manual")
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedAmount = Number(activeAmount.replace(/,/g, "").trim())
    const normalizedPhone = phoneNumber.replace(/\s+/g, "").trim()

    if (!Number.isFinite(normalizedAmount) || normalizedAmount <= 0 || !normalizedPhone) {
      setStatus({ kind: "error", message: "Enter a valid donation amount and phone number to continue." })
      return
    }

    setStatus({ kind: "idle", message: "" })

    if (paymentMethod === "manual") {
      setConfirmedAmount(normalizedAmount)
      setIsMpesaModalOpen(true)
      return
    }

    setStkAmount(normalizedAmount)
    setMpesaError("")
    setMpesaState("requesting")

    try {
      const response = await fetch("/api/mpesa/stk-push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: normalizedAmount, phone: normalizedPhone }),
      })

      const data = await response.json()

      if (!response.ok) {
        setMpesaError(data.message || "We couldn't reach M-Pesa right now.")
        setMpesaState("failed")
        return
      }

      setCheckoutRequestId(data.checkoutRequestId)
      beginPolling(data.checkoutRequestId)
    } catch {
      setMpesaError("We couldn't reach M-Pesa right now. Check your connection and try again.")
      setMpesaState("failed")
    }
  }

  return (
    <section id="donate" className="py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-[1.1fr_0.9fr] md:px-6">
        <Card className="border-border/70 shadow-lg shadow-primary/5">
          <CardHeader className="space-y-3">
            <SectionLabel>Individual Donations</SectionLabel>
            <CardTitle className="text-3xl">Make a direct contribution</CardTitle>
            <CardDescription className="max-w-2xl text-base leading-relaxed">
              Select a preset tier or enter a custom amount.
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

              <Tabs
                value={paymentMethod}
                onValueChange={(value) => {
                  if (value === "manual") {
                    switchToManual()
                  } else {
                    resetMpesaFlow()
                    setPaymentMethod("stk")
                  }
                }}
              >
                <TabsList>
                  <TabsTrigger value="stk">Pay via STK Push</TabsTrigger>
                  <TabsTrigger value="manual">Pay manually</TabsTrigger>
                </TabsList>

                <TabsContent value="stk" className="space-y-4">
                  {mpesaState === "idle" ? (
                    <Button type="submit" size="lg" className="text-base">Send M-Pesa prompt</Button>
                  ) : null}

                  {mpesaState === "requesting" ? (
                    <Button type="button" size="lg" className="text-base" disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending request…
                    </Button>
                  ) : null}

                  {mpesaState === "polling" ? (
                    <div className="rounded-2xl border border-border bg-muted/30 p-4 text-sm">
                      <p className="flex items-center gap-2 font-medium text-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Check your phone and enter your M-Pesa PIN
                      </p>
                      <p className="mt-1 text-muted-foreground">Waiting… {elapsedSeconds}s</p>
                      <button
                        type="button"
                        onClick={resetMpesaFlow}
                        className="mt-3 text-sm font-medium text-primary underline-offset-4 hover:underline"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : null}

                  {mpesaState === "success" ? (
                    <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 text-sm">
                      <p className="flex items-center gap-2 font-medium text-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        Thank you! We received KES {stkAmount.toLocaleString("en-KE")}
                        {receiptNumber ? ` (Receipt ${receiptNumber})` : ""}.
                      </p>
                      <Button type="button" variant="outline" className="mt-3" onClick={resetMpesaFlow}>
                        Donate again
                      </Button>
                    </div>
                  ) : null}

                  {mpesaState === "failed" ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                      <p className="flex items-center gap-2 font-medium">
                        <XCircle className="h-4 w-4" />
                        {mpesaError}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-3">
                        <Button type="button" variant="outline" onClick={resetMpesaFlow}>
                          Try again
                        </Button>
                        <Button type="button" variant="outline" onClick={switchToManual}>
                          Pay manually instead
                        </Button>
                      </div>
                    </div>
                  ) : null}

                  {mpesaState === "timeout" ? (
                    <div className="rounded-2xl border border-border bg-muted/30 p-4 text-sm">
                      <p className="font-medium text-foreground">We haven&apos;t heard back yet.</p>
                      <div className="mt-3 flex flex-wrap gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => checkoutRequestId && void checkStatus(checkoutRequestId)}
                        >
                          Check again
                        </Button>
                        <Button type="button" variant="outline" onClick={switchToManual}>
                          Pay manually instead
                        </Button>
                      </div>
                    </div>
                  ) : null}
                </TabsContent>

                <TabsContent value="manual">
                  <Button type="submit" size="lg" className="text-base">Donate Now</Button>
                </TabsContent>
              </Tabs>

              {status.message ? (
                <div
                  className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-700"
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

      <Dialog open={isMpesaModalOpen} onOpenChange={setIsMpesaModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete your donation via M-Pesa</DialogTitle>
            <DialogDescription>
              Follow these steps on your phone to send KES {confirmedAmount.toLocaleString("en-KE")} using Lipa na M-Pesa.
            </DialogDescription>
          </DialogHeader>

          <ol className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <li className="flex gap-3">
              <span className="font-semibold text-foreground">1.</span>
              <span>Go to M-Pesa on your phone and select <span className="font-medium text-foreground">Lipa na M-Pesa</span>, then <span className="font-medium text-foreground">Pay Bill</span>.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-foreground">2.</span>
              <span>Enter Business Number <span className="font-medium text-foreground">{MPESA_PAYBILL_NUMBER}</span>.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-foreground">3.</span>
              <span>Enter Account Number <span className="font-medium text-foreground">{MPESA_ACCOUNT_NUMBER}</span>.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-foreground">4.</span>
              <span>Enter Amount <span className="font-medium text-foreground">KES {confirmedAmount.toLocaleString("en-KE")}</span>.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-foreground">5.</span>
              <span>Enter your M-Pesa PIN and confirm. You&apos;ll receive an SMS once the payment goes through.</span>
            </li>
          </ol>

          <div className="rounded-2xl border border-border bg-muted/30 p-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Paybill / Business No.</span>
              <span className="font-semibold text-foreground">{MPESA_PAYBILL_NUMBER}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-muted-foreground">Bank</span>
              <span className="font-semibold text-foreground">{MPESA_ACCOUNT_NAME}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-muted-foreground">Account Number</span>
              <span className="font-semibold text-foreground">{MPESA_ACCOUNT_NUMBER}</span>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setIsMpesaModalOpen(false)} className="w-full sm:w-auto">
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
