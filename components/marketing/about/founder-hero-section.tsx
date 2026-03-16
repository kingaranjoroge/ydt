import Image from "next/image"

export function FounderHeroSection() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Beyond Code: Empowering the Architects of Africa's Digital Future.
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
              A journey from ONDIS Hub's CSR roots to a national community driving youth employability through structured digital mentorship.
            </p>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
            <Image
              src="/images/founder.jpg"
              alt="Founder portrait"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
