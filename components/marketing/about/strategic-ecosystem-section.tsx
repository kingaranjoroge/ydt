import { Award, Building, Target } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const ecosystemPrograms = [
  {
    key: "ajira",
    icon: Target,
    title: "Ajira Digital Program",
    description: "last-mile mentorship for digital workers.",
    badge: "National Program",
    accent: "from-primary/20 via-primary/10 to-transparent",
  },
  {
    key: "kepsa",
    icon: Award,
    title: "KEPSA",
    description: "aligning youth digital skills with private sector demand.",
    badge: "Private Sector",
    accent: "from-amber-500/20 via-amber-500/10 to-transparent",
  },
  {
    key: "pdtp",
    icon: Building,
    title: "Presidential Digital Talent Programme (PDTP)",
    description: "building a pipeline of vetted digital talent.",
    badge: "Government Pathway",
    accent: "from-emerald-500/20 via-emerald-500/10 to-transparent",
  },
]

export function StrategicEcosystemSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-balance text-center text-3xl font-semibold text-foreground">
          A Catalyst for National Transformation
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          YDT works with high-impact ecosystem partners to translate policy and
          strategy into practical youth outcomes.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {ecosystemPrograms.map((program) => (
            <Card
              key={program.key}
              className="group relative overflow-hidden rounded-2xl border-border bg-card/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${program.accent}`}
              />
              <CardHeader className="relative space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/15">
                    <program.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="rounded-full border border-border/80 bg-background/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    {program.badge}
                  </span>
                </div>
                <CardTitle className="text-xl font-semibold leading-tight text-foreground">
                  {program.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  {program.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
