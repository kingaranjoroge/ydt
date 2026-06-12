import type { Metadata } from "next"

import { Footer } from "@/components/marketing/footer"
import { Navbar } from "@/components/marketing/navbar"
import {
  DonationCard,
  InKindSponsorshipsSection,
  MonthlyDonorCard,
  SponsorshipTable,
  SupportCTASection,
  SupportHeroSection,
  TransparencyTracker,
} from "@/components/marketing/support"

export const metadata: Metadata = {
  title: "Support | YDT Community",
  description:
    "Support YDT Community through individual donations, corporate sponsorships, in-kind contributions, and monthly giving.",
}

export default function SupportPage() {
  return (
    <>
      <Navbar />
      <main>
        <SupportHeroSection />
        <DonationCard />
        <SponsorshipTable />
        <InKindSponsorshipsSection />
        <TransparencyTracker />
        <MonthlyDonorCard />
        <SupportCTASection />
      </main>
      <Footer />
    </>
  )
}