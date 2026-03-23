import type { Metadata } from "next"
import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { BlogInsightsContent } from "@/components/marketing/blog"

export const metadata: Metadata = {
  title: "Blog | YDT Community",
  description:
    "Explore YDT insights on tech trends, digital careers, community success stories, and event recaps across the African digital ecosystem.",
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        <BlogInsightsContent />
      </main>
      <Footer />
    </>
  )
}
