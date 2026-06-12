"use client"

import { useState, type FormEvent, type ReactNode } from "react"
import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  Check,
  GraduationCap,
  HeartHandshake,
  LaptopMinimal,
  Package,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

type DonationTier = {
  amount: number
  label: string
}

type SponsorshipRow = {
  label: string
  bronze: string
  silver: string
  gold: string
}

type SponsorshipCardProps = {
  icon: ReactNode
  title: string
  description: string
  note: string
}

const donationTiers: DonationTier[] = [
  { amount: 500, label: "Internet for a Student" },
  { amount: 2500, label: "Workshop Support" },
  { amount: 10000, label: "Campus Lead Grant" },
]

const sponsorshipRows: SponsorshipRow[] = [
  {
    label: "Visibility",
    bronze: "Logo on the support page and supporter acknowledgements",
    silver: "Logo in campaign materials and event mentions",
    gold: "Premium logo placement, partner spotlight, and co-branded moments",
  },
  {
    label: "Access",
    bronze: "Quarterly impact notes",
    silver: "Bi-monthly check-ins with the program team",
    gold: "Priority access to talent introductions and planning sessions",
  },
  {
    label: "Engagement",
    bronze: "Support a workshop or cohort",
    silver: "Engage with learners during program activations",
    gold: "Host a signature partnership activation or co-created initiative",
  },
  {
    label: "Investment",
    bronze: "KES 50,000+",
    silver: "KES 150,000+",
    gold: "KES 500,000+",
  },
]

const inKindSponsors = [
  {
    icon: <LaptopMinimal className="h-5 w-5" />,
    title: "Tool & Software Sponsors",
    description: "Provide licenses, platforms, and digital tools that improve learning and collaboration.",
    note: "Examples: productivity suites, design tools, cloud credits, AI tools.",
  },
  {
    icon: <Building2 className="h-5 w-5" />,
    title: "Infrastructure Sponsors",
    description: "Support sessions with devices, connectivity, venue access, and event operations.",
    note: "Examples: laptops, internet, rooms, displays, logistics.",
  },
  {
    icon: <GraduationCap className="h-5 w-5" />,
    title: "Knowledge Sponsors",
    description: "Contribute mentoring, workshops, advisory time, and guest facilitation.",
    note: "Examples: office hours, talks, masterclasses, curriculum input.",
  },
]

const transparencyCards = [
  {
    title: "Financial transparency",
    description: "A simple summary showing how support is allocated across delivery and operations.",
  },
  {
    title: "Program updates",
    description: "Quarterly notes on cohorts, workshops, and other community milestones.",
  },
  {
    title: "Governance overview",
    description: "A compact trust resource that can expand into a full reporting pack later.",
  },
]

const donorWall = [
  "TechBridge Africa",
  "Nairobi Community Circle",
  "Amina K.",
  "Kisumu Alumni Network",
  "Bright Future Partners",
  "Anonymous Supporter",
]

function SectionLabel({ children }: { children: string }) {
  return <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary">{children}</Badge>
}

export function SupportHeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-primary/10 via-background to-background">
      <div className="absolute inset-0">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute right-0 top-28 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-[1.15fr_0.85fr] md:px-6 md:py-28">
        <div className="flex flex-col justify-center">
          <SectionLabel>Support YDT Community</SectionLabel>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Support the Next Generation of Digital Talent
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Help YDT equip young people with digital skills, mentorship, and access to opportunities across Kenya.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="text-base shadow-lg shadow-primary/20">
              <Link href="#donate">Donate via M-Pesa</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="text-base">
              <Link href="/downloads/ydt-partnership-deck.pdf" download>
                Download Partnership Deck
              </Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5">
              <Sparkles className="h-4 w-4 text-primary" />
              Static frontend demo
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Trust-first design
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5">
              <HeartHandshake className="h-4 w-4 text-primary" />
              Future-ready for integrations
            </span>
          </div>
        </div>

        <Card className="overflow-hidden border-primary/10 bg-card/90 shadow-2xl shadow-primary/5 backdrop-blur">
          <CardHeader className="space-y-4 border-b border-border/60 bg-gradient-to-br from-primary/5 via-background to-emerald-50/80">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <Banknote className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-xl">Ways to Support</CardTitle>
                <CardDescription>Choose the path that fits your role in the community.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            {[
              "One-time donations that fund learners and workshops",
              "Corporate sponsorships with visibility and co-branding",
              "In-kind contributions for tools, space, and expertise",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background p-4">
                <div className="mt-0.5 rounded-full bg-primary/10 p-1.5 text-primary">
                  <Check className="h-4 w-4" />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

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

function SponsorshipCard({ icon, title, description, note }: SponsorshipCardProps) {
  return (
    <Card className="group border-border/70 transition-all duration-200 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5">
      <CardHeader>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          {icon}
        </div>
        <CardTitle className="mt-4 text-xl">{title}</CardTitle>
        <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground">{note}</p>
      </CardContent>
    </Card>
  )
}

export function SponsorshipTable() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-3xl">
          <SectionLabel>Corporate Sponsorship</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Partner With YDT</h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Compare sponsorship tiers and choose the level of visibility, access, and community engagement that fits your organization.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-lg shadow-primary/5">
          <div className="overflow-x-auto">
            <table className="min-w-[760px] w-full border-collapse text-left">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-5 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Benefit</th>
                  <th className="px-6 py-5 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Bronze</th>
                  <th className="px-6 py-5 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Silver</th>
                  <th className="px-6 py-5 text-sm font-semibold uppercase tracking-wider text-primary">Gold (Partner)</th>
                </tr>
              </thead>
              <tbody>
                {sponsorshipRows.map((row, index) => (
                  <tr key={row.label} className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                    <th className="px-6 py-5 align-top text-sm font-semibold text-foreground">{row.label}</th>
                    <td className="px-6 py-5 align-top text-sm leading-relaxed text-muted-foreground">{row.bronze}</td>
                    <td className="px-6 py-5 align-top text-sm leading-relaxed text-muted-foreground">{row.silver}</td>
                    <td className="bg-primary/5 px-6 py-5 align-top text-sm leading-relaxed text-foreground">
                      <div className="flex items-start gap-2">
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{row.gold}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="text-base">
            <a href="https://docs.google.com/forms/d/1Yi6WJursbKLALIC2Bb6evUsYL2PI6u7WRygasu5-gKI/edit" target="_blank" rel="noopener noreferrer">
              Become a Sponsor
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-base">
            <Link href="/downloads/ydt-partnership-deck.pdf" download>
              Download Partnership Deck
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function SponsorCard({ icon, title, description, note }: SponsorshipCardProps) {
  return (
    <Card className="group border-border/70 transition-all duration-200 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5">
      <CardHeader>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          {icon}
        </div>
        <CardTitle className="mt-4 text-xl">{title}</CardTitle>
        <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground">{note}</p>
      </CardContent>
    </Card>
  )
}

export function InKindSponsorshipsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-3xl">
          <SectionLabel>In-Kind Sponsorships</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Support with tools, space, and expertise
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Not every contribution needs to be cash. Practical support helps learners access the resources and experiences they need to grow.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {inKindSponsors.map((item) => (
            <SponsorCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TransparencyResourceCard({ title, description }: { title: string; description: string }) {
  return (
    <Card className="border-border/70 bg-background transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}

export function TransparencyTracker() {
  return (
    <section className="bg-muted/20 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-[0.95fr_1.05fr] md:px-6">
        <Card className="border-border/70">
          <CardHeader>
            <SectionLabel>Transparency & Trust</SectionLabel>
            <CardTitle className="mt-4 text-3xl">Allocation Tracker</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Show how funds are directed so supporters can quickly understand the operating model.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-border bg-background p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Program delivery</p>
                  <p className="mt-1 text-sm text-muted-foreground">Workshops, mentorship, and learner support</p>
                </div>
                <span className="text-2xl font-semibold text-primary">75%</span>
              </div>
              <Progress value={75} className="mt-4 h-3" />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                "15% community operations",
                "7% reporting & tooling",
                "3% reserve for continuity",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-border bg-background p-4 text-sm leading-relaxed text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            {transparencyCards.map((item) => (
              <TransparencyResourceCard key={item.title} {...item} />
            ))}
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="border-border/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Users className="h-5 w-5 text-primary" />
                  Donor Recognition Wall
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">A simple space to thank partners, supporters, and community members.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {donorWall.map((name) => (
                  <div key={name} className="rounded-2xl border border-border bg-muted/30 px-3 py-4 text-center text-sm font-medium text-foreground">
                    {name}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-gradient-to-br from-background to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <HeartHandshake className="h-5 w-5 text-primary" />
                  Anonymous donor note
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Some supporters prefer to give quietly. YDT welcomes anonymous donors and can recognize them privately while preserving their preference for discretion.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export function MonthlyDonorCard() {
  return (
    <section id="monthly-giving" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Card className="overflow-hidden border-border/70 bg-gradient-to-br from-primary/10 via-background to-emerald-50/70 shadow-lg shadow-primary/5">
          <div className="grid gap-8 p-6 md:grid-cols-[1fr_0.8fr] md:p-8 lg:p-10">
            <div>
              <SectionLabel>Monthly Giving</SectionLabel>
              <CardTitle className="mt-4 text-3xl">Become a Monthly Donor</CardTitle>
              <CardDescription className="mt-4 max-w-2xl text-base leading-relaxed">
                Support long-term impact through recurring contributions that help YDT plan ahead, mentor more learners, and keep programs steady throughout the year.
              </CardDescription>
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  "Predictable support for programs",
                  "Visible long-term community impact",
                  "Easy to scale over time",
                ].map((item) => (
                  <Badge key={item} variant="outline" className="border-primary/20 bg-background/80 text-foreground">{item}</Badge>
                ))}
              </div>
              <div className="mt-8">
                <Button asChild size="lg" className="text-base">
                  <Link href="#donate">Join Monthly Giving</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Monthly donor perks</p>
                  <p className="text-lg font-semibold text-foreground">Consistent, visible impact</p>
                </div>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Quarterly impact updates for supporters.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Flexible recurring giving that can evolve later.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 text-primary" />
                  <span>A clean handoff point for future billing integrations.</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

export function SupportCTASection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-primary via-primary/95 to-emerald-700 px-6 py-10 text-primary-foreground shadow-2xl shadow-primary/20 md:px-10 md:py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <SectionLabel>Call to Action</SectionLabel>
              <h2 className="mt-4 text-balance text-3xl font-semibold md:text-4xl">Every contribution helps a young builder take the next step.</h2>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-primary-foreground/80">
                Use the paths below to support learners, explore partnership options, or commit to long-term monthly giving.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <Button asChild size="lg" variant="secondary" className="text-base">
                <Link href="#donate">Donate via M-Pesa</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/25 bg-transparent text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link href="/downloads/ydt-partnership-deck.pdf" download>
                  Download Partnership Deck
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/25 bg-transparent text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link href="#monthly-giving">Become a Monthly Donor</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}