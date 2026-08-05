import { SectionLabel } from "../support/SectionLabel"

export function ContactHero() {
  return (
    <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
      <div className="pointer-events-none absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-24 text-center md:py-28 md:px-6">
        <div className="flex justify-center">
          <SectionLabel>Get in Touch</SectionLabel>
        </div>
        <h1 className="mt-4 text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
          We&apos;d Love to Hear From You
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          Have a question about our programs, want to partner with us, or just
          want to say hello? Send us a message and our team will get back to
          you soon.
        </p>
      </div>
    </section>
  )
}

export default ContactHero
