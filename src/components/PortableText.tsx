import { Block } from "./Block"
import { ImageBlock } from "./Image"

export const PortableText = ({body}:any) => {
    return (
        <div>
            {body?.length > 0 && body.map((block:any, index:number) => {
                if (block._type === "block") return <Block key={index} block={block}/>
                if (block._type === "Image") return <ImageBlock key={index} image={block}/>
            })}
            </div>
    )

}