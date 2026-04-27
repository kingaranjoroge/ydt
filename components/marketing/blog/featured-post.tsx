import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/components/marketing/blog/types"

type FeaturedPostProps = {
  post: BlogPost
}

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date))

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-primary/15 bg-card shadow-sm">
      <div className="grid items-stretch md:grid-cols-2">
        <div className="relative min-h-[280px]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-foreground/25 via-transparent to-primary/20" />
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
          <div className="flex items-center gap-3">
            <Badge className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide">
              Featured
            </Badge>
            <Badge variant="outline" className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide">
              {post.category}
            </Badge>
          </div>

          <h2 className="mt-5 text-2xl font-bold leading-tight text-foreground sm:text-3xl">
            {post.title}
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <time dateTime={post.date} className="text-sm text-muted-foreground">
              {formatDate(post.date)}
            </time>
            <Button asChild>
              <Link href={`/blog/${post.slug}`} aria-label={`Read featured post: ${post.title}`}>
                Read More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
