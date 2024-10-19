import Image from "next/image"
import { Child } from "./Child"
import { urlForImage } from "~/lib/sanity.image"
import { useState } from "react"

export const ImageBlock = ({image}:any) => {

  const [expanded, setExpanded] = useState(false)

  if (!expanded) {

    return (
      <div className="w-full my-2 cursor-pointer" onClick={() => {setExpanded(!expanded)}}>
            <Image
              className="object-contain rounded-lg my-4"
              src={urlForImage(image).size(1000,1000).url()}
              height={1000}
              width={1000}
              alt=""
            />
      </div>
  )


  } else {
    return (
      <div className="fixed w-screen h-screen bg-black top-0 left-0 bg-opacity-90 z-10  overflow-scroll cursor-pointer" onClick={() => {setExpanded(!expanded)}}>
        <div className="flex max-w-7xl mx-auto overflow-scroll">
          <div className="flex h-screen justify-center p-10 flex-col" onClick={() => {setExpanded(!expanded)}}>
          <Image
              className="h-full object-contain"
              src={urlForImage(image).url()}
              height={1000}
              width={1000}
              alt=""
            />
            <div className="text-center p-2"></div>
          </div>
        </div>
        
      </div>
    )
  }



}