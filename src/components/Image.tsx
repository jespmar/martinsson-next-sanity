import Image from "next/image"
import { Child } from "./Child"
import { urlForImage } from "~/lib/sanity.image"

export const ImageBlock = ({image}:any) => {

return (
    <div className="w-full my-2">

          <Image
            className="mx-auto object-contain rounded-lg my-4"
            src={urlForImage(image).url()}
            height={1000}
            width={1000}
            alt=""
          />
        

    </div>
)

}