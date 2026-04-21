import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"
import type { PortableTextComponents } from "@portabletext/react"
import type { TypedObject } from "@portabletext/types"
import { ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { postBySlugQuery, postSlugsQuery } from "@/lib/queries"
import { sanityFetch, urlFor } from "@/lib/sanity"

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

type SanityBlogPost = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  mainImage?: unknown
  category?: string
  publishedAt?: string
  body?: TypedObject[]
}

const IMAGE_PLACEHOLDER = "/images/hero.jpg"

export const revalidate = 60

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date))

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-foreground">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-semibold tracking-tight text-foreground">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mt-5 text-base leading-relaxed text-foreground/90">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground/90">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-6 text-base leading-relaxed text-foreground/90">{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={typeof value?.href === "string" ? value.href : undefined}
        className="font-medium text-primary underline underline-offset-4"
        target={typeof value?.href === "string" && value.href.startsWith("http") ? "_blank" : undefined}
        rel={typeof value?.href === "string" && value.href.startsWith("http") ? "noreferrer noopener" : undefined}
      >
        {children}
      </a>
    ),
  },
}

async function getPost(slug: string) {
  return sanityFetch<SanityBlogPost>({ query: postBySlugQuery, params: { slug } })
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<Array<{ slug: string }>>({ query: postSlugsQuery })
  return (slugs ?? []).map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

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
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const image = post.mainImage
    ? urlFor(post.mainImage).width(1400).height(800).fit("crop").url()
    : IMAGE_PLACEHOLDER
  const publishedDate = post.publishedAt ?? new Date().toISOString()
  const category = post.category ?? "Uncategorized"

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
              src={image}
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
                {category}
              </Badge>
              <time dateTime={publishedDate} className="text-sm text-muted-foreground">
                {formatDate(publishedDate)}
              </time>
            </div>

            <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
              {post.title}
            </h1>

            {post.excerpt ? (
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{post.excerpt}</p>
            ) : null}

            <section className="prose prose-neutral mt-8 max-w-none dark:prose-invert" aria-label="Post content">
              {Array.isArray(post.body) && post.body.length > 0 ? (
                <PortableText value={post.body} components={portableTextComponents} />
              ) : (
                <p className="text-base leading-relaxed text-muted-foreground">
                  This post has no published content yet.
                </p>
              )}
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
