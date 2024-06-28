// import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'

import Container from '~/components/Container'
import { PortableText } from '~/components/PortableText'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import {
  getPost,
  type Post,
  postBySlugQuery,
  postSlugsQuery,
  pageSlugsQuery,
  pageBySlugQuery,
  getPage,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { formatDate } from '~/utils'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    post: Post
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const post = await getPage(client, params.slug)

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      post,
    },
  }
}

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [post] = useLiveQuery(props.post, pageBySlugQuery, {
    slug: props.post.slug.current,
  })

  return (
    <Container>
    <div className='w-full'>
    <section className="max-w-3xl mx-auto">
      <h3 className='text-center text-sm text-gray-600'>{post.publishDate ? <span>{formatDate(post.publishDate)}</span> : <span>{formatDate(post._createdAt)}</span>}</h3>

    <h1 className="text-5xl text-center uppercase">{post.title}</h1>
        {post.mainImage ? (
          <Image
            className="mx-auto  object-contain rounded-lg my-4"
            src={urlForImage(post.mainImage).url()}
            height={1000}
            width={1000}
            alt=""
          />
        ) : (
          <div className="post__cover--none" />
        )}
        <div className="post__container">
          <p className="text-xl my-3">{post.excerpt}</p>
          <div className="post__content">
            <PortableText body={post.body}/>
          </div>
        </div>
      </section>
    </div>
    </Container>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(pageSlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `/${slug}`) || [],
    fallback: 'blocking',
  }
}
