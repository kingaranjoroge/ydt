export function GrowthTimelineSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-4 md:px-6">
        <h2 className="text-balance text-center text-3xl font-semibold text-foreground">
          YDT Growth Timeline
        </h2>
        <div className="mt-12 space-y-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-sm font-semibold">1</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Founding</h3>
              <p className="text-muted-foreground">YDT Community was established under ONDIS Hub.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-sm font-semibold">2</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">First 2k members</h3>
              <p className="text-muted-foreground">Reached 2000 community members.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-sm font-semibold">3</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Partnership with GDG</h3>
              <p className="text-muted-foreground">Collaborated with Google Developer Groups.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-sm font-semibold">4</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Present Day</h3>
              <p className="text-muted-foreground">Continuing to grow and impact the community.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
