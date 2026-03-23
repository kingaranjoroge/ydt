export type BlogCategory =
  | "All"
  | "Career Tips"
  | "Tech Trends"
  | "Member Spotlight"
  | "Event Recaps"

export type BlogPost = {
  id: string
  slug: string
  title: string
  category: Exclude<BlogCategory, "All">
  image: string
  excerpt: string
  date: string
  featured: boolean
}
