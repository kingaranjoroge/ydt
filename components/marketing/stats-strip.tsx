const stats = [
  { value: "645+", label: "Youth Engaged in Skills Learning" },
  { value: "100%", label: "Community-Led Initiatives" },
  { value: "20+", label: "Knowledge Series Sessions" },
  { value: "∞", label: "Opportunities Created" },
]

export function StatsStrip() {
  return (
    <section id="impact" className="bg-primary py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-bold text-primary-foreground md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium text-primary-foreground/80 md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
