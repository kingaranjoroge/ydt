import type { ReactNode } from "react"
import {
  Building2,
  GraduationCap,
  LaptopMinimal,
} from "lucide-react"

export type DonationTier = {
  amount: number
  label: string
}

export type SponsorshipRow = {
  label: string
  bronze: string
  silver: string
  gold: string
}

export type SponsorshipCardProps = {
  icon: ReactNode
  title: string
  description: string
  note: string
}

export const donationTiers: DonationTier[] = [
  { amount: 500, label: "Internet for a Student" },
  { amount: 2500, label: "Workshop Support" },
  { amount: 10000, label: "Campus Lead Grant" },
]

export const sponsorshipRows: SponsorshipRow[] = [
  {
    label: "Visibility",
    bronze: "Logo on the support page and supporter acknowledgements",
    silver: "Logo in campaign materials and event mentions",
    gold: "Premium logo placement, partner spotlight, and co-branded moments",
  },
  {
    label: "Access",
    bronze: "Quarterly impact notes",
    silver: "Bi-monthly check-ins with the program team",
    gold: "Priority access to talent introductions and planning sessions",
  },
  {
    label: "Engagement",
    bronze: "Support a workshop or cohort",
    silver: "Engage with learners during program activations",
    gold: "Host a signature partnership activation or co-created initiative",
  },
  {
    label: "Investment",
    bronze: "KES 50,000+",
    silver: "KES 150,000+",
    gold: "KES 500,000+",
  },
]

export const inKindSponsors: SponsorshipCardProps[] = [
  {
    icon: <LaptopMinimal className="h-5 w-5" />,
    title: "Tool & Software Sponsors",
    description: "Provide licenses, platforms, and digital tools that improve learning and collaboration.",
    note: "Examples: productivity suites, design tools, cloud credits, AI tools.",
  },
  {
    icon: <Building2 className="h-5 w-5" />,
    title: "Infrastructure Sponsors",
    description: "Support sessions with devices, connectivity, venue access, and event operations.",
    note: "Examples: laptops, internet, rooms, displays, logistics.",
  },
  {
    icon: <GraduationCap className="h-5 w-5" />,
    title: "Knowledge Sponsors",
    description: "Contribute mentoring, workshops, advisory time, and guest facilitation.",
    note: "Examples: office hours, talks, masterclasses, curriculum input.",
  },
]

export const transparencyCards = [
  {
    title: "Financial transparency",
    description: "A simple summary showing how support is allocated across delivery and operations.",
  },
  {
    title: "Program updates",
    description: "Quarterly notes on cohorts, workshops, and other community milestones.",
  },
  {
    title: "Governance overview",
    description: "A compact trust resource that can expand into a full reporting pack later.",
  },
]

export const donorWall = [
  "TechBridge Africa",
  "Nairobi Community Circle",
  "Amina K.",
  "Kisumu Alumni Network",
  "Bright Future Partners",
  "Anonymous Supporter",
]