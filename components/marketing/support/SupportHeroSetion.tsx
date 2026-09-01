"use client"

import Link from "next/link"
import { Banknote, Check, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { SectionLabel } from "./SectionLabel"

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
              Community-powered impact
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Secure M-Pesa giving
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5">
              <HeartHandshake className="h-4 w-4 text-primary" />
              Transparent fund allocation
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