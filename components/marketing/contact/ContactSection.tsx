import { ContactDetails } from "./ContactDetails"
import { ContactForm } from "./ContactForm"

export function ContactSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-[1.1fr_0.9fr] md:px-6">
        <ContactForm />
        <ContactDetails />
      </div>
    </section>
  )
}

export default ContactSection
