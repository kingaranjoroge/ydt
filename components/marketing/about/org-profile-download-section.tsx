import Link from "next/link"
import { Button } from "@/components/ui/button"

export function OrgProfileDownloadSection() {
  return (
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
  )
}
