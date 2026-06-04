import { Button } from "@/components/ui/button"

export function VolunteerFinalCTA() {
  return (
    <section className="bg-primary py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
        <h3 className="text-balance text-3xl font-semibold text-primary-foreground">Ready to Make an Impact?</h3>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-primary-foreground/80">
          Join a team of volunteers helping young people access digital
          opportunities — your time can make a lasting difference.
        </p>
        <div className="mt-10">
          <Button asChild size="lg" variant="secondary">
            <a
              href="https://docs.google.com/forms/d/1RNwNdcowqyKiln4SFFcTkXkldni2YBfyAmrnkPCodbI/edit"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Apply to volunteer (opens in new tab)"
            >
              Apply to Volunteer
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default VolunteerFinalCTA
