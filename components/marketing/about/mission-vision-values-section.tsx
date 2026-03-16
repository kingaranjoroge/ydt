import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { values } from "./values"

export function MissionVisionValuesSection() {
  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-balance text-center text-3xl font-semibold text-foreground">
          What Drives Us
        </h2>
        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {values.map((value) => (
            <Card
              key={value.title}
              className="w-full md:w-[calc((100%-4rem)/3)] rounded-2xl border-border bg-card shadow-md"
            >
              <CardHeader className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {value.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  {value.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
