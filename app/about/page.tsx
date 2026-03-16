import type { Metadata } from "next"
import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import {
  AboutHeroSection,
  AlignmentSection,
  BottomCTASection,
  FounderHeroSection,
  FounderVideoSection,
  GrowthTimelineSection,
  MissionVisionValuesSection,
  OndisHubConnectionSection,
  OrgProfileDownloadSection,
  StrategicEcosystemSection,
  StorytellingSection,
  WhoWeAreSection,
} from "@/components/marketing/about"

export const metadata: Metadata = {
  title: "About | YDT Community",
  description:
    "Learn about Young Digital Talents Community — a youth-focused nonprofit initiative democratizing access to digital skills and online work pathways for African youth.",
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <FounderHeroSection />
        <AboutHeroSection />
        <StorytellingSection />
        <WhoWeAreSection />
        <StrategicEcosystemSection />
        <MissionVisionValuesSection />
        <OndisHubConnectionSection />
        <AlignmentSection />
        <GrowthTimelineSection />
        <FounderVideoSection />
        <OrgProfileDownloadSection />
        <BottomCTASection />
      </main>
      <Footer />
    </>
  )
}
