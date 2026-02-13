import { Laptop, BookOpen, Users } from "lucide-react"
import Link from "next/link"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const programs = [
  {
    icon: Laptop,
    title: "Digital Skills Training",
    description:
      "Practical sessions on freelancing, marketing, and content creation.",
  },
  {
    icon: BookOpen,
    title: "High School Literacy",
    description:
      "Early exposure to responsible technology and future careers.",
  },
  {
    icon: Users,
    title: "Mentorship",
    description:
      "Connecting learners with industry pros and peer guidance.",
  },
]

export function ProgramsGrid() {
  return (
    <section id="programs" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-balance text-center text-3xl font-semibold text-foreground">
          How We Create Change
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {programs.map((program) => (
            <Card
              key={program.title}
              className="rounded-2xl border-border bg-card shadow-md transition-transform hover:scale-[1.02]"
            >
              <CardHeader className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <program.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {program.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  {program.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        {/* <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/#programs">View All Programs</Link>
          </Button>
        </div> */}
      </div>
    </section>
  )
}
