import type { Metadata } from "next"

import { Footer } from "@/components/marketing/footer"
import { Navbar } from "@/components/marketing/navbar"
import { ContactHero, ContactSection } from "@/components/marketing/contact"

export const metadata: Metadata = {
  title: "Contact | YDT Community",
  description:
    "Get in touch with Young Digital Talents Community — ask about our programs, explore partnerships, or send us a message.",
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactHero />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
