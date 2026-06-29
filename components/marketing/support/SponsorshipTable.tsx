"use client"

import Link from "next/link"
import { BadgeCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { SectionLabel } from "./SectionLabel"
import { sponsorshipRows, type SponsorshipCardProps } from "./data"

// function SponsorshipCard({ icon, title, description, note }: SponsorshipCardProps) {
//   return (
//     <Card className="group border-border/70 transition-all duration-200 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5">
//       <CardHeader>
//         <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
//           {icon}
//         </div>
//         <CardTitle className="mt-4 text-xl">{title}</CardTitle>
//         <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <p className="text-sm leading-relaxed text-muted-foreground">{note}</p>
//       </CardContent>
//     </Card>
//   )
// }

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