export type BlogCategory = "All" | string

export type BlogPost = {
  id: string
  slug: string
  title: string
  category: string
  image: string
  excerpt: string
  date: string
  featured: boolean
}
