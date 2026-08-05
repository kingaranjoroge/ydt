export const enquiryOptions = [
  { value: "donate", label: "Donate / Support Us" },
  { value: "volunteer", label: "Volunteer" },
  { value: "membership", label: "Membership" },
  { value: "collaboration", label: "Collaboration" },
  { value: "strategic-partnership", label: "Strategic Partnership" },
  { value: "media", label: "Media & Press" },
  { value: "general", label: "General Inquiry" },
  { value: "other", label: "Other" },
] as const

export type EnquiryType = (typeof enquiryOptions)[number]["value"]

export const enquiryValues = enquiryOptions.map((option) => option.value) as [EnquiryType, ...EnquiryType[]]

export function getEnquiryLabel(value: string) {
  return enquiryOptions.find((option) => option.value === value)?.label ?? value
}
