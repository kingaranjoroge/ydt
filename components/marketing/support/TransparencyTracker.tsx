"use client"

import { HeartHandshake, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

import { SectionLabel } from "./SectionLabel"
import { transparencyCards, donorWall } from "./data"

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
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-[0.70fr_1.30fr] md:px-6">
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

          <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
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