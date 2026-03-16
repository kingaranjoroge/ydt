import Image from "next/image"

export function WhoWeAreSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2 md:px-6">
        <div>
          <h2 className="text-balance text-3xl font-semibold text-foreground">
            Who We Are
          </h2>
          <p className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground">
            YDT Community was born from a simple observation: millions of
            young Africans have the talent and drive to succeed, but lack
            access to the skills and networks that open doors in the digital
            economy. We exist to close that gap.
          </p>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Operating under ONDIS Hub, we bring together community leaders,
            educators, and industry professionals to create structured,
            impactful learning experiences. From high school literacy
            programs to advanced digital skills workshops, our work is
            designed to meet youth where they are and take them where they
            want to go.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src="/images/intro.jpg"
            alt="Community learning session with young African students"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
