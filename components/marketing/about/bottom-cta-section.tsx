import Link from "next/link"
import { Button } from "@/components/ui/button"

export function BottomCTASection() {
  return (
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
  )
}
