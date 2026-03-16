import Image from "next/image"

export function AboutHeroSection() {
  return (
    <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden">
      <Image
        src="/images/about-hero.jpg"
        alt="Young African students collaborating around laptops"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-foreground/70" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 text-center md:py-28">
        <h1 className="text-balance text-4xl font-bold tracking-tight text-card md:text-5xl">
          A Catalyst for Digital Inclusion.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-card/90">
          Young Digital Talents (YDT) Community is a youth-focused nonprofit
          initiative under ONDIS Hub, founded to democratize access to
          digital skills and online work pathways for young people in
          underserved and transitioning communities.
        </p>
      </div>
    </section>
  )
}
