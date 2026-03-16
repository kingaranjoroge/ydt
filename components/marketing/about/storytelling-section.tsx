import { Target } from "lucide-react"

export function StorytellingSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-balance text-center text-3xl font-semibold text-foreground">
          The Spark: Why YDT?
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10">
                <Target className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold">The Problem</h3>
            </div>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
              In the heart of Kenya's burgeoning Silicon Savannah, a gap remained: the distance between possessing a degree and possessing industry-ready mastery.
            </p>
          </div>
          <div>
            <div className="rounded-2xl bg-primary/10 p-6">
              <h3 className="text-xl font-semibold text-primary">The Solution</h3>
              <p className="mt-4 text-pretty text-base leading-relaxed text-primary/80">
                YDT was born out of ONDIS Hub as a response to this divide. We realized that digital transformation isn't just about infrastructure; it's about the people who navigate it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
