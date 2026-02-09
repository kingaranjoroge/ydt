import { Navbar } from "@/components/marketing/navbar"
import { Hero } from "@/components/marketing/hero"
import { Introduction } from "@/components/marketing/introduction"
import { StatsStrip } from "@/components/marketing/stats-strip"
import { ProgramsGrid } from "@/components/marketing/programs-grid"
import { FounderSpotlight } from "@/components/marketing/founder-spotlight"
import { Footer } from "@/components/marketing/footer"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Introduction />
        <StatsStrip />
        <ProgramsGrid />
        <FounderSpotlight />
      </main>
      <Footer />
    </>
  )
}
