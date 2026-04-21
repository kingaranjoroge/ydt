"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { BlogCard } from "@/components/marketing/blog/blog-card"
import { CategoryFilter } from "@/components/marketing/blog/category-filter"
import { FeaturedPost } from "@/components/marketing/blog/featured-post"
import { NewsletterSection } from "@/components/marketing/blog/newsletter-section"
import type { BlogCategory, BlogPost } from "@/components/marketing/blog/types"

const POSTS_PER_PAGE = 6

type BlogInsightsContentProps = {
  posts: BlogPost[]
}

export function BlogInsightsContent({ posts }: BlogInsightsContentProps) {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("All")
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)

  const categories = useMemo<BlogCategory[]>(() => {
    const dynamicCategories = [...new Set(posts.map((post) => post.category).filter(Boolean))]
    return ["All", ...dynamicCategories]
  }, [posts])

  const featuredPost = useMemo(() => posts.find((post) => post.featured) ?? posts[0], [posts])

  useEffect(() => {
    if (!categories.includes(activeCategory)) {
      setActiveCategory("All")
      setVisibleCount(POSTS_PER_PAGE)
    }
  }, [activeCategory, categories])

  const filteredPosts = useMemo(() => {
    if (!featuredPost) {
      return []
    }

    const nonFeaturedPosts = posts.filter((post) => post.id !== featuredPost.id)

    if (activeCategory === "All") {
      return nonFeaturedPosts
    }

    return nonFeaturedPosts.filter((post) => post.category === activeCategory)
  }, [posts, activeCategory, featuredPost])

  const visiblePosts = filteredPosts.slice(0, visibleCount)
  const hasMore = visibleCount < filteredPosts.length

  const handleCategoryChange = (category: BlogCategory) => {
    setActiveCategory(category)
    setVisibleCount(POSTS_PER_PAGE)
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + POSTS_PER_PAGE)
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/70 bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="pointer-events-none absolute -top-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-[15%] h-40 w-40 rounded-full bg-secondary/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center md:px-6 md:py-20">
          <p className="animate-fade-in-up text-sm font-semibold uppercase tracking-[0.16em] text-primary" style={{ animationDelay: "0.05s" }}>
            YDT Insights
          </p>
          <h1 className="animate-fade-in-up mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl" style={{ animationDelay: "0.12s" }}>
            Insights from the Digital Frontier
          </h1>
          <p className="animate-fade-in-up mx-auto mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg" style={{ animationDelay: "0.2s" }}>
            From technical tutorials to career advice and community success stories, stay updated with the latest in the African digital ecosystem.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-6xl px-4 md:px-6" aria-labelledby="featured-post-heading">
        <h2 id="featured-post-heading" className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Featured Story
        </h2>
        {featuredPost ? (
          <FeaturedPost post={featuredPost} />
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-10 text-center text-muted-foreground">
            No featured story is available yet.
          </div>
        )}
      </section>

      <section className="mx-auto mt-12 max-w-6xl px-4 md:px-6" aria-labelledby="category-filter-heading">
        <h2 id="category-filter-heading" className="sr-only">
          Filter Blog Posts By Category
        </h2>
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </section>

      <section className="mx-auto mt-10 max-w-6xl px-4 pb-12 md:px-6" aria-labelledby="latest-posts-heading">
        <div className="mb-7 flex items-baseline justify-between gap-4">
          <h2 id="latest-posts-heading" className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Latest Articles
          </h2>
          <p className="text-sm text-muted-foreground">
            Showing {Math.min(visiblePosts.length, filteredPosts.length)} of {filteredPosts.length}
          </p>
        </div>

        {visiblePosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visiblePosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-10 text-center text-muted-foreground">
            No posts in this category yet. Please check back soon.
          </div>
        )}

        {hasMore ? (
          <div className="mt-10 flex justify-center">
            <Button size="lg" variant="outline" onClick={handleLoadMore} className="rounded-full border-primary/30 bg-card px-8 hover:border-primary/50 hover:text-primary">
              Load More
            </Button>
          </div>
        ) : null}
      </section>

      <section className="mx-auto mb-16 max-w-6xl px-4 md:px-6">
        <NewsletterSection />
      </section>
    </>
  )
}
