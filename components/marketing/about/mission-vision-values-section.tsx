import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { values } from "./values"

export function MissionVisionValuesSection() {
  const missionVision = values.slice(0, 2)
  const coreValues = values.slice(2)

  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-balance text-center text-3xl font-semibold text-foreground">
          What Drives Us
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {missionVision.map((item) => (
            <Card
              key={item.title}
              className="rounded-2xl border-border bg-card shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <CardHeader className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  {item.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border/70 bg-card/70 p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-foreground">Core Values</h3>
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Guiding Principles
            </span>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {coreValues.map((value) => (
              <article
                key={value.title}
                className="rounded-xl border border-border/70 bg-background/90 p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <value.icon className="h-5 w-5 text-primary" />
                </div>
                <h4 className="mt-4 text-base font-semibold text-foreground">
                  {value.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
