import type { Metadata } from 'next'
import { Navbar } from '@/components/marketing/navbar'
import { Footer } from '@/components/marketing/footer'
import {
  VolunteerHero,
  VolunteerAbout,
  VolunteerTracks,
  VolunteerWho,
  VolunteerFinalCTA,
} from '@/components/marketing/volunteer'

export const metadata: Metadata = {
  title: 'Volunteer | YDT Community',
  description: 'Volunteer with Young Digital Talents — apply to join our community of changemakers.',
}

export default function VolunteerPage() {
  return (
    <>
      <Navbar />
      <main>
        <VolunteerHero />
        <VolunteerAbout />
        <VolunteerTracks />
        <VolunteerWho />
        <VolunteerFinalCTA />
      </main>
      <Footer />
    </>
  )
}
