import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt="Diverse young Kenyans collaborating on laptops in a modern tech hub"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-foreground/70" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-24 text-center md:py-32">
        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-card md:text-5xl lg:text-6xl">
          Empowering the Next Generation of Digital Talent.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-card/90 md:text-xl">
          Bridging the gap between education and employability. We equip African
          youth with the skills, mentorship, and opportunities to thrive in the
          digital economy.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="text-base">
            <Link href="/#contact">Join the Community</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="text-base"
          >
            <Link href="/#contact">Partner With Us</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
