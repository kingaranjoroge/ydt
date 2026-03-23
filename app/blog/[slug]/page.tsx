import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { posts } from "@/components/marketing/blog"

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date))

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((item) => item.slug === slug)

  if (!post) {
    return {
      title: "Post Not Found | YDT Community",
      description: "The requested YDT insight post could not be found.",
    }
  }

  return {
    title: `${post.title} | YDT Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = posts.find((item) => item.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        <Button asChild variant="ghost" className="mb-8 pl-0 text-primary hover:bg-transparent hover:text-primary/80">
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4" />
            Back to Insights
          </Link>
        </Button>

        <article className="overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm">
          <div className="relative h-72 w-full sm:h-96">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(min-width: 1024px) 896px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/35 via-transparent to-transparent" />
          </div>

          <div className="p-6 sm:p-8 md:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide">
                {post.category}
              </Badge>
              <time dateTime={post.date} className="text-sm text-muted-foreground">
                {formatDate(post.date)}
              </time>
            </div>

            <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
              {post.title}
            </h1>

            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {post.excerpt}
            </p>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground/90">
              <p>
                This article page is intentionally scaffolded as a CMS-ready template. Replace this placeholder body with rich content from your preferred data source, such as a headless CMS, markdown files, or a database-backed API.
              </p>
              <p>
                The route already supports static generation through <strong>generateStaticParams</strong>, and metadata is generated per post for stronger discoverability. As your content volume grows, this structure can be connected to real author profiles, tags, and related-post recommendations.
              </p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
