import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Target, Eye, Lightbulb, Users, ShieldCheck, Building, Award } from "lucide-react"
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
      "To build Africa's most structured, transparent, and opportunity-driven youth digital empowerment ecosystem.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To equip young people with digital skills, mentorship, and access to digital work opportunities through structured programs and strategic partnerships.",
  },
  {
    icon: Users,
    title: "Inclusivity",
    description:
      "From high schools to campus labs.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Learning by doing through ODS and the Knowledge Series.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "Transparent reporting of community impact.",
  },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Founder Hero */}
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

        {/* Storytelling */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-balance text-center text-3xl font-semibold text-foreground">
              The Spark: Why YDT?
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <div>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10">
                    <Target className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="text-xl font-semibold">The Problem</h3>
                </div>
                <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
                  In the heart of Kenya's burgeoning Silicon Savannah, a gap remained: the distance between possessing a degree and possessing industry-ready mastery.
                </p>
              </div>
              <div>
                <div className="rounded-2xl bg-primary/10 p-6">
                  <h3 className="text-xl font-semibold text-primary">The Solution</h3>
                  <p className="mt-4 text-pretty text-base leading-relaxed text-primary/80">
                    YDT was born out of ONDIS Hub as a response to this divide. We realized that digital transformation isn't just about infrastructure; it's about the people who navigate it.
                  </p>
                </div>
              </div>
            </div>
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

        {/* Strategic Ecosystem */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-balance text-center text-3xl font-semibold text-foreground">
              A Catalyst for National Transformation
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <Card
                key="ajira"
                className="rounded-2xl border-border bg-card shadow-md hover:shadow-lg transition-shadow"
              >
                <CardHeader className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    Ajira Digital Program
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    last-mile mentorship for digital workers.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card
                key="kepsa"
                className="rounded-2xl border-border bg-card shadow-md hover:shadow-lg transition-shadow"
              >
                <CardHeader className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    KEPSA
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    aligning youth digital skills with private sector demand.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card
                key="pdtp"
                className="rounded-2xl border-border bg-card shadow-md hover:shadow-lg transition-shadow"
              >
                <CardHeader className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    Presidential Digital Talent Programme (PDTP)
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    building a pipeline of vetted digital talent.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="bg-muted py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-balance text-center text-3xl font-semibold text-foreground">
              What Drives Us
            </h2>
            <div className="mt-12 flex flex-wrap justify-center gap-8">
              {values.map((value) => (
                <Card
                  key={value.title}
                  className="w-full md:w-[calc((100%-4rem)/3)] rounded-2xl border-border bg-card shadow-md"
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

        {/* ONDIS Hub Connection */}
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

        {/* YDT Growth Timeline */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-2xl px-4 md:px-6">
            <h2 className="text-balance text-center text-3xl font-semibold text-foreground">
              YDT Growth Timeline
            </h2>
            <div className="mt-12 space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-sm font-semibold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Founding</h3>
                  <p className="text-muted-foreground">YDT Community was established under ONDIS Hub.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-sm font-semibold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">First 2k members</h3>
                  <p className="text-muted-foreground">Reached 2000 community members.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-sm font-semibold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Partnership with GDG</h3>
                  <p className="text-muted-foreground">Collaborated with Google Developer Groups.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-sm font-semibold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Present Day</h3>
                  <p className="text-muted-foreground">Continuing to grow and impact the community.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Video Message */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <h2 className="text-balance text-center text-3xl font-semibold text-foreground">
              Message From the Founder
            </h2>
            <p className="mt-4 text-center text-muted-foreground">
              Hear directly from our founder about the vision and impact of YDT.
            </p>
            <div className="mt-12 aspect-video overflow-hidden rounded-2xl">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Founder Message"
                className="h-full w-full"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>

        {/* Downloadable Organization Profile */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-2xl px-4 text-center md:px-6">
            <h2 className="text-balance text-3xl font-semibold text-foreground">
              Download Our Organization Profile
            </h2>
            <p className="mt-4 text-muted-foreground">
              Learn more about YDT Community in our detailed organization profile.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/downloads/ydt-profile.pdf">Download YDT Organization Profile</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Strip */}
        <section className="bg-primary py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
            <h2 className="text-balance text-3xl font-semibold text-primary-foreground">
              Join the Movement
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-primary-foreground/80">
              Be part of the change. Join YDT Community today.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <Button
                asChild
                size="lg"
                variant="secondary"
              >
                <Link href="/impact">View Our Impact</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground bg-transparent"
              >
                <Link href="/partner">Partner With Us</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground bg-transparent"
              >
                <Link href="/volunteer">Join the Team</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
