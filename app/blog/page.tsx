import type { Metadata } from "next"
import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"
import { BlogInsightsContent } from "@/components/marketing/blog"
import type { BlogPost } from "@/components/marketing/blog/types"
import { allPostsQuery, featuredPostQuery } from "@/lib/queries"
import { sanityFetch, urlFor } from "@/lib/sanity"

type SanityBlogPost = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  mainImage?: unknown
  category?: string
  publishedAt?: string
  featured?: boolean
}

const IMAGE_PLACEHOLDER = "/images/hero.jpg"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Blog | YDT Community",
  description:
    "Explore YDT insights on tech trends, digital careers, community success stories, and event recaps across the African digital ecosystem.",
}

const mapToBlogPost = (post: SanityBlogPost): BlogPost => {
  const image = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(700).fit("crop").url()
    : IMAGE_PLACEHOLDER

  return {
    id: post._id,
    slug: post.slug,
    title: post.title,
    category: post.category ?? "Uncategorized",
    image,
    excerpt: post.excerpt ?? "Read the full story on the YDT blog.",
    date: post.publishedAt ?? new Date().toISOString(),
    featured: Boolean(post.featured),
  }
}

export default async function BlogPage() {
  const [allPostsData, featuredPostData] = await Promise.all([
    sanityFetch<SanityBlogPost[]>({ query: allPostsQuery }),
    sanityFetch<SanityBlogPost | null>({ query: featuredPostQuery }),
  ])

  const mappedPosts = (allPostsData ?? []).map(mapToBlogPost)
  const featuredPost = featuredPostData ? mapToBlogPost(featuredPostData) : null

  const posts = mappedPosts.map((post) => ({
    ...post,
    featured: featuredPost ? post.id === featuredPost.id : post.featured,
  }))

  if (featuredPost && !posts.some((post) => post.id === featuredPost.id)) {
    posts.unshift({ ...featuredPost, featured: true })
  }

  return (
    <>
      <Navbar />
      <main>
        <BlogInsightsContent posts={posts} />
      </main>
      <Footer />
    </>
  )
}
