import Link from "next/link"
import { Button } from "@/components/ui/button"

export function VolunteerHero() {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/95" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-24 text-center md:py-32 md:px-6">
        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
          Join YDT. Build Impact. Grow Your Career.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          Volunteer with Young Digital Talents to gain real-world experience,
          build your network, and contribute to digital opportunities for
          young people.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="text-base">
            <a
              href="https://docs.google.com/forms/d/1RNwNdcowqyKiln4SFFcTkXkldni2YBfyAmrnkPCodbI/edit"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Apply to volunteer (opens in new tab)"
            >
              Apply to Volunteer
            </a>
          </Button>
          <Button asChild size="lg" variant="secondary" className="text-base">
            <Link href="/about">Learn more about YDT</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default VolunteerHero
