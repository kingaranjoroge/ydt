import Image from "next/image"

export function OndisHubConnectionSection() {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-balance text-3xl font-semibold text-foreground">
              Anchored by ONDIS Hub
            </h2>
            <p className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground">
              ONDIS Hub is the parent entity providing technical governance, industry linkages, strategic oversight, mentorship and infrastructure.
            </p>
            <div className="mt-6 rounded-2xl bg-primary/10 p-4">
              <p className="text-sm text-primary">
                A strong partnership driving community impact.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/about-hero.jpg"
              alt="ONDIS Hub logo or image"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
