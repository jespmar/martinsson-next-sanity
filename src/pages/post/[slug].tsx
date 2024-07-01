// import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'

import Container from '~/components/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import {
  getPost,
  type Post,
  postBySlugQuery,
  postSlugsQuery,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { formatDate } from '~/utils'
import { PortableText } from '~/components/PortableText'

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
  const post = await getPost(client, params.slug)

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
  const [post] = useLiveQuery(props.post, postBySlugQuery, {
    slug: props.post.slug.current,
  })

  return (
    <Container>
    <div className='w-full'>
    <section className="max-w-3xl mx-auto">

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
              <div className="py-2">
      <span className=" text-white text-sm font-mono bg-indigo-500 p-1 rounded-lg">{post.publishDate ? <span>{formatDate(post.publishDate)}</span> : <span>{formatDate(post._createdAt)}</span>}</span>
        <h3 className="text-2xl lg:text-4xl font-semibold font-serif mb-1 mt-2">
          <a href={`/post/${post.slug.current}`}>
            {post.title}
          </a>
        </h3>
        <p className="font-light text-xl italic text-indigo-950">{post.excerpt}</p>
        <hr className='my-2 border-indigo-300' />
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
  const slugs = await client.fetch(postSlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `/post/${slug}`) || [],
    fallback: 'blocking',
  }
}
