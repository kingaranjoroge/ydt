import { Eye, Lightbulb, ShieldCheck, Target, Users, type LucideIcon } from "lucide-react"

export type ValueItem = {
  icon: LucideIcon
  title: string
  description: string
}

export const values: ValueItem[] = [
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
