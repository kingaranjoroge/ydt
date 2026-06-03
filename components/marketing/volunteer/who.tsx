import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { GraduationCap, Code, Users } from 'lucide-react'
import Link from 'next/link'

const whoItems = [
  {
    title: 'Students',
    desc: 'Looking to gain practical experience and mentorship.',
    badge: 'Student',
    icon: GraduationCap,
  },
  {
    title: 'Developers, Designers, Marketers',
    desc: 'Bring your skills to projects and help build solutions.',
    badge: 'Professional',
    icon: Code,
  },
  {
    title: 'Community-driven Individuals',
    desc: 'Passionate about supporting and growing communities.',
    badge: 'Community',
    icon: Users,
  },
]

export function VolunteerWho() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h4 className="text-balance text-xl font-semibold">Who Should Apply</h4>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Volunteers come from diverse backgrounds — students, early-career
            professionals, and community champions are all welcome.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {whoItems.map((w) => {
            const Icon = w.icon
            const formUrl = `https://docs.google.com/forms/d/1RNwNdcowqyKiln4SFFcTkXkldni2YBfyAmrnkPCodbI/edit?usp=pp_url&entry.0=${encodeURIComponent(
              w.title,
            )}`
            return (
              <Card key={w.title} className="flex items-center gap-4 p-4 hover:shadow-lg transition-shadow">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/5 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h5 className="text-sm font-semibold">{w.title}</h5>
                    <Badge variant="outline" className="ml-auto">{w.badge}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{w.desc}</p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <Button asChild size="sm" variant="outline">
                    <Link href={formUrl} target="_blank" rel="noopener noreferrer">
                      Apply
                    </Link>
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default VolunteerWho
