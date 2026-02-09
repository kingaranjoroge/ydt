import Image from "next/image"
import Link from "next/link"

export function FounderSpotlight() {
  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl shadow-md">
            <Image
              src="/images/founder.jpg"
              alt="Mungai Peter Ngethe, Founder of YDT Community"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-balance text-3xl font-semibold text-foreground">
              Leadership Rooted in Experience.
            </h2>
            <p className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground">
              Led by Mungai Peter Ngethe — an alumnus of the Ajira Digital
              Program and PDTP Cohort 6 — our vision is aligned with national
              digital transformation goals. His experience in the digital
              ecosystem drives our commitment to creating scalable impact for
              African youth.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Read the Founder&apos;s Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
