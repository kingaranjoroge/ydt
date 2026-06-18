"use client"

import Link from "next/link"
import { Check, Package } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"

import { SectionLabel } from "./SectionLabel"

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