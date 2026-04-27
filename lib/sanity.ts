import { createClient } from "next-sanity"
import { createImageUrlBuilder, type ImageUrlBuilder, type SanityImageSource } from "@sanity/image-url"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01"
const useCdn = process.env.NEXT_PUBLIC_SANITY_USE_CDN === "true" || process.env.NODE_ENV === "production"

export const isSanityConfigured = Boolean(projectId && dataset)

export const sanityClient = createClient({
  projectId: projectId ?? "missing-project-id",
  dataset: dataset ?? "missing-dataset",
  apiVersion,
  useCdn,
})

const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource): ImageUrlBuilder {
  return builder.image(source)
}

type SanityFetchParams = Record<string, unknown>

type SanityFetchOptions = {
  query: string
  params?: SanityFetchParams
}

export async function sanityFetch<T>({ query, params = {} }: SanityFetchOptions): Promise<T | null> {
  if (!isSanityConfigured) {
    return null
  }

  return sanityClient.fetch<T>(query, params)
}
