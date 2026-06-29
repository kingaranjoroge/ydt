"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

import { SectionLabel } from "./SectionLabel"

export function SupportCTASection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="rounded-3xl bg-primary px-6 py-10 text-primary-foreground shadow-2xl shadow-primary/20 md:px-10 md:py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              {/* <SectionLabel>Call to Action</SectionLabel> */}
              <h2 className="mt-4 text-balance text-3xl font-semibold md:text-4xl">Every contribution helps a young builder take the next step.</h2>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-primary-foreground/80">
                Use the paths below to support learners, explore partnership options, or commit to long-term monthly giving.
              </p>
            </div>
            <div className="grid gap-3">
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