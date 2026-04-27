import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { BlogPost } from "@/components/marketing/blog/types"

type BlogCardProps = {
  post: BlogPost
}

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date))

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group h-full">
      <Card className="flex h-full flex-col overflow-hidden border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/25 to-transparent" />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide">
              {post.category}
            </Badge>
            <time dateTime={post.date} className="text-xs text-muted-foreground">
              {formatDate(post.date)}
            </time>
          </div>

          <h3 className="text-xl font-semibold leading-snug text-foreground">
            {post.title}
          </h3>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>

          <Link
            href={`/blog/${post.slug}`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            aria-label={`Read more: ${post.title}`}
          >
            Read More
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Card>
    </article>
  )
}
