import Image from "next/image"

export function Introduction() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2 md:px-6">
        <div>
          <h2 className="text-balance text-3xl font-semibold text-foreground">
            The Digital Gap is Real. So is the Potential.
          </h2>
          <p className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground">
            Across Kenya and beyond, millions of young people face unemployment
            not because they lack potential, but because they lack access to
            relevant skills and exposure. YDT Community creates structured
            learning pathways — from high school to early career — combining
            community-led learning with industry-relevant training.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src="/images/intro.jpg"
            alt="Young African students learning digital skills in a classroom"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
