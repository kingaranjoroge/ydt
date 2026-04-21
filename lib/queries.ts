import { groq } from "next-sanity"

export const allPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    "category": coalesce(category->title, category, "Uncategorized"),
    publishedAt,
    featured,
    body
  }
`

export const featuredPostQuery = groq`
  *[_type == "post" && defined(slug.current) && featured == true] | order(publishedAt desc) [0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    "category": coalesce(category->title, category, "Uncategorized"),
    publishedAt,
    featured,
    body
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    "category": coalesce(category->title, category, "Uncategorized"),
    publishedAt,
    featured,
    body
  }
`

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current
  }
`
