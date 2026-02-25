import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Target, Eye, Lightbulb } from "lucide-react"
import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "About | YDT Community",
  description:
    "Learn about Young Digital Talents Community — a youth-focused nonprofit initiative democratizing access to digital skills and online work pathways for African youth.",
}

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To democratize access to digital skills and online work pathways, specifically for young people in underserved and transitioning communities.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "An Africa where every young person has equal opportunity to participate in the digital economy, regardless of their background.",
  },
  {
    icon: Lightbulb,
    title: "Core Belief",
    description:
      "Digital skills are the critical enabler of economic inclusion. Access, not talent, is the barrier.",
  },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* About Hero */}
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

        {/* Who We Are */}
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

        {/* Mission, Vision, Values */}
        <section className="bg-muted py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-balance text-center text-3xl font-semibold text-foreground">
              What Drives Us
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {values.map((value) => (
                <Card
                  key={value.title}
                  className="rounded-2xl border-border bg-card shadow-md"
                >
                  <CardHeader className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground">
                      {value.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed text-muted-foreground">
                      {value.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Alignment */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
            <h2 className="text-balance text-3xl font-semibold text-foreground">
              Aligned With National Goals
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
              Our programs and approach are aligned with Kenya&apos;s national
              digital transformation agenda, including the Ajira Digital Program
              and the broader vision for youth economic empowerment through
              technology. We don&apos;t work in isolation — we work as part of an
              ecosystem.
            </p>
          </div>
        </section>

        {/* CTA Strip */}
        <section className="bg-primary py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
            <h2 className="text-balance text-3xl font-semibold text-primary-foreground">
              Ready to Make an Impact?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-primary-foreground/80">
              Whether you are a young person looking to build your skills, or an
              organization looking to create impact — there is a place for you at
              YDT.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="text-base"
              >
                <Link href="https://chat.whatsapp.com/JhEttil8lRU5axFacAnBaF">Join the Community</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground bg-transparent"
              >
                <Link href="https://docs.google.com/forms/d/e/1FAIpQLSd-nNZv5iGt0hcn7hWjAmiA4QHaoIB0BGb238NjeYxp9qL-Bw/viewform">Partner With Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
