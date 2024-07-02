import Image from 'next/image'
import { useRouter } from 'next/router'

import { urlForImage } from '~/lib/sanity.image'
import { type Post } from '~/lib/sanity.queries'
import { formatDate } from '~/utils'
import { PortableText } from './PortableText'

export default function Card({ post }: { post: Post }) {

  const router = useRouter()

  const openPost = () => {

    router.push(`/post/${post.slug.current}`)

  }
  return (
    <div className="w-full px-1 lg:px-10 py-3">
            <span className=" text-white text-sm font-mono bg-indigo-500 p-1 rounded-lg">{post.publishDate ? <span>{formatDate(post.publishDate)}</span> : <span>{formatDate(post._createdAt)}</span>}</span>
        <h3 className="text-2xl lg:text-4xl font-semibold font-serif mb-1 mt-2">
          <a href={`/post/${post.slug.current}`}>
            {post.title}
          </a>
        </h3>
      {post.mainImage ? (
        <Image
          onClick={openPost}
          className="w-full cursor-pointer rounded-lg mb-2"
          src={urlForImage(post.mainImage).size(1000, 500).url()}
          height={1000}
          width={1000}
          alt=""
        />
      ) : (
        <div className="card__cover--none" />
      )}
      <div className="py-2">
        <p className="font-light text-lg lg:text-xl italic text-indigo-950">{post.excerpt}</p>
        <hr className='my-2 border-indigo-300' />
        <div className="post__content">
            <PortableText body={post.body}/>
          </div>
      </div>
      <hr className='mt-3 border-dashed border-gray-500'/>
    </div>
  )
}
