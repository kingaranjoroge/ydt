export function FounderVideoSection() {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <h2 className="text-balance text-center text-3xl font-semibold text-foreground">
          Message From the Founder
        </h2>
        <p className="mt-4 text-center text-muted-foreground">
          Hear directly from our founder about the vision and impact of YDT.
        </p>
        <div className="mt-12 aspect-video overflow-hidden rounded-2xl">
          <iframe
            src="https://www.youtube.com/embed/WtzYW1reRF0"
            title="Founder Message"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            className="h-full w-full border-0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  )
}
