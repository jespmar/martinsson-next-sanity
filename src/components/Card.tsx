import Image from 'next/image'
import { useRouter } from 'next/router'

import { urlForImage } from '~/lib/sanity.image'
import { type Post } from '~/lib/sanity.queries'
import { formatDate } from '~/utils'

export default function Card({ post }: { post: Post }) {

  const router = useRouter()

  const openPost = () => {

    router.push(`/post/${post.slug.current}`)

  }
  return (
    <div className="w-full px-1 lg:px-10 py-3">
      {post.mainImage ? (
        <Image
          onClick={openPost}
          className="w-full cursor-pointer rounded-lg"
          src={urlForImage(post.mainImage).width(500).height(300).url()}
          height={300}
          width={500}
          alt=""
        />
      ) : (
        <div className="card__cover--none" />
      )}
      <div className="py-2">
      <p className="text-xs text-indigo-700 font-light">{post.publishDate ? <span>{formatDate(post.publishDate)}</span> : <span>{formatDate(post._createdAt)}</span>}</p>
        <h3 className="text-2xl uppercase mb-1">
          <a href={`/post/${post.slug.current}`}>
            {post.title}
          </a>
        </h3>
        <p className="font-thin">{post.excerpt}</p>
      </div>
      <hr className='mt-3'/>
    </div>
  )
}
