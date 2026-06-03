import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const tracks = [
  {
    title: "Program Coordinators",
    desc: "Manage events and logistics",
    icon: "🗂️",
    color: "from-primary/5 to-primary/3",
  },
  { title: "Mentors", desc: "Guide students and provide career support", icon: "👩‍🏫", color: "from-amber/5 to-amber/3" },
  { title: "Marketing & Media", desc: "Content and social media growth", icon: "📣", color: "from-pink/5 to-pink/3" },
  { title: "Technical Team", desc: "Platform development and maintenance", icon: "💻", color: "from-sky/5 to-sky/3" },
  { title: "Campus Leads", desc: "University outreach and growth", icon: "🎓", color: "from-emerald/5 to-emerald/3" },
  { title: "Partnerships Team", desc: "Sponsor and partner outreach", icon: "🤝", color: "from-violet/5 to-violet/3" },
  { title: "Community Moderators", desc: "Manage and engage community spaces", icon: "💬", color: "from-lime/5 to-lime/3" },
]

export function VolunteerTracks() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="text-balance text-3xl font-semibold">Volunteer Tracks</h3>
          <p className="mx-auto mt-2 max-w-xl text-pretty text-sm text-muted-foreground/90">
            Choose a track that matches your skills and interests.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tracks.map((t) => (
            <Card
              key={t.title}
              className="transform overflow-hidden rounded-lg transition-all hover:-translate-y-2 hover:shadow-2xl"
              aria-hidden={false}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-white/40 to-white/10 ring-1 ring-border">
                    <span className="text-2xl" aria-hidden>
                      {t.icon}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold leading-snug">{t.title}</h4>
                    <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default VolunteerTracks
