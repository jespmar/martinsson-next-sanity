
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishDate desc)`
export const pagesQuery = groq`*[_type == "page" && defined(slug.current)] | order(publishDate desc)`

export async function getPosts(client: SanityClient): Promise<Post[]> {
  return await client.fetch(postsQuery)
}

export async function getPages(client: SanityClient): Promise<Post[]> {
  return await client.fetch(pagesQuery)
}

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]`
export const pageBySlugQuery = groq`*[_type == "page" && slug.current == $slug][0]`

export async function getPost(
  client: SanityClient,
  slug: string,
): Promise<Post> {
  return await client.fetch(postBySlugQuery, {
    slug,
  })
}

export async function getPage(
  client: SanityClient,
  slug: string,
): Promise<Post> {
  return await client.fetch(pageBySlugQuery, {
    slug,
  })
}

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const pageSlugsQuery = groq`
*[_type == "page" && defined(slug.current)][].slug.current
`

export interface Post {
  _type: 'post'
  _id: string
  _createdAt: string
  title?: string,
  publishDate?: string
  slug: Slug
  excerpt?: string
  mainImage?: ImageAsset
  body: any
}
