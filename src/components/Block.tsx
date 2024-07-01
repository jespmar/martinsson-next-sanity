import { Child } from "./Child"

export const Block = ({block}:any) => {

if (block.style === "h1") return (
    <h1 className="text-3xl lg:text-3xl font-serif font-bold">{block.children.map((child:any, index:number) => {
        return (<Child key={index} child={child}/>)
    })}</h1>
)

if (block.style === "h2") return (
    <h1 className="text-2xl lg:text-3xl font-bold font-serif">{block.children.map((child:any, index:number) => {
        return (<Child key={index} child={child}/>)
    })}</h1>
)

if (block.style === "h3") return (
    <h1 className="text-2xl font-serif">{block.children.map((child:any, index:number) => {
        return (<Child key={index} child={child}/>)
    })}</h1>
)

if (block.style === "normal") return (
    <p className="text-lg lg:text-xl font-serif my-4">{block.children.map((child:any, index:number) => {
        return (<Child key={index} child={child}/>)
    })}</p>
)

}