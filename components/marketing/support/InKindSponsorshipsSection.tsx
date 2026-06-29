"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { SectionLabel } from "./SectionLabel"
import { inKindSponsors, type SponsorshipCardProps } from "./data"

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