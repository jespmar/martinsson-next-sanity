
import { useWindowScroll } from "@uidotdev/usehooks";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { AiOutlinePlus } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { GrGithub } from "react-icons/gr";

import { readToken } from "~/lib/sanity.api";
import { getClient } from "~/lib/sanity.client";
import { getPages, getPosts,pagesQuery,Post } from "~/lib/sanity.queries";
import { SharedPageProps } from "~/pages/_app";




export const Navbar = () => {

    const router = useRouter()

    const isActive = (route:string) => {

        if (router.asPath === `/${route}`) return "underline"
    }

    
    useEffect(() => {
        const client = getClient(false ? { token: readToken } : undefined)
        getPages(client).then((pages) => {

            const links = []

            for (let page of pages) {

                links.push({title: page.title, route: page.slug.current})
            }

            setNavLinks(links)

        })
    },[])

    const [navbarColor, setNavbarColor] = useState("dark:bg-gray-950 bg-white text-slate-950 dark:text-white")
    const [navBarLight, setNavbarLight] = useState(false)
    const [navLinks, setNavLinks]:any = useState()
    const [{ x, y }, scrollTo] = useWindowScroll();
    const [navRot, setNavRot] = useState(false)

   const checkNav = () => {

    if (y > 100 && !navRot) {
        if (!navBarLight) {
            setNavbarColor("dark:bg-gray-900 bg-white text-slate-950 bg-opacity-80 dark:bg-opacity-60 shadow-2xl backdrop-blur-xl dark:text-white")
            setNavbarLight(true)
        }
    }

    if (y < 50 && !navRot) {
        if (navBarLight) {
            setNavbarColor("dark:bg-gray-950 bg-white text-slate-950 dark:text-white")
            setNavbarLight(false)
        }
    }

    if (navRot) {
        if (navBarLight) {
            setNavbarColor("dark:bg-gray-950 bg-white text-slate-950 dark:text-white")
            setNavbarLight(false)
        }
    }

   }

   checkNav()

   const rot = () => {
    if (navRot) return "rotate-45"
    else return "rotate-0"
   }

   const nav = () => {
    if (navRot) return "h-screen"
    else return "h-16"
   }



return (
    <div style={{
        transition: "all .5s ease",
        WebkitTransition: "all .5s ease",
        MozTransition: "all .5s ease"}} className={`w-full fixed top-0 px-4 flex flex-col overflow-hidden ${navbarColor} ${nav()}`}>
        <div className="flex gap-10 justify-between lg:justify-start w-full max-w-7xl mx-auto self-center mt-2">
            <Link href={"/"} className="font-mono text-3xl self-center cursor-pointer">martinsson<span className="text-indigo-500">.</span>io</Link>
            <div className="flex justify-between w-full">
            <div className="hidden font-mono gap-5 lg:flex text-lg self-center ">
                <Link href={"/"} className={`hover:text-indigo-500 underline-offset-8 ${isActive("")}`}>Blog</Link>
                <Link href={"/archive"} className={`hover:text-indigo-500 underline-offset-8 ${isActive("archive")}`}>Archive</Link>
                {navLinks && navLinks.map((link:any, index:number) => {
                    return (
                        <Link key={index} href={`/${link.route}`} className={`hover:text-indigo-500 underline-offset-8 ${isActive(link.route)}`}>{link.title}</Link>
                    )
                })}
            </div>
            <div className="hidden font-mono lg:flex text-lg self-center h-full gap-5">
            <a target="blank" title="linkedin" className="self-center" href="https://www.linkedin.com/in/jesper-martinsson-372007131">
            <FaLinkedin className="h-6 w-6 self-center hover:text-indigo-700 cursor-pointer" />
            </a>
            <a target="blank" title="github" className="self-center" href="https://github.com/jespmar">
            <GrGithub className="h-6 w-6 self-center hover:text-indigo-700 cursor-pointer" />
            </a>
            </div>
            </div>
            <div className="flex font-mono gap-5 lg:hidden text-base self-center ">
            <AiOutlinePlus style={{
        transition: "all .5s ease",
        WebkitTransition: "all .5s ease",
        MozTransition: "all .5s ease"}} onClick={() => setNavRot(!navRot)} className={`h-10 w-10 ${rot()}`} />
            </div>
            
        </div>
        <div  style={{
        transition: "all .9s ease",
        WebkitTransition: "all .9s ease",
        MozTransition: "all .9s ease"}} className={`flex flex-col ${nav()} h-screen gap-20`}>
            <div className="font-mono gap-5 flex flex-col text-2xl mt-10 self-center w-full text-center">
                  <Link onClick={() => setNavRot(!navRot)} href={"/"} className={`hover:text-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-900 w-full py-3 rounded-lg ${isActive("")}`}>Blog</Link>  

                  <Link onClick={() => setNavRot(!navRot)} href={"/archive"} className={`hover:text-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-900 w-full py-3 rounded-lg ${isActive("archive")}`}>Archive</Link>  


                {navLinks && navLinks.map((link:any, index:number) => {
                    return (
                        
                  <Link key={index} onClick={() => setNavRot(!navRot)} href={`/${link.route}`} className={`hover:text-indigo-500 dark:hover:bg-indigo-900 hover:bg-indigo-100 w-full py-3 rounded-lg ${isActive(link.route)}`}>{link.title}</Link>  
                
                    )
                })}

            </div>
            <div className="font-mono flex text-lg mb-10 mx-auto gap-20 ">
                <a target="blank" title="linkedin" className="cursor-pointer" href="https://www.linkedin.com/in/jesper-martinsson-372007131">
                <FaLinkedin  className="h-6 w-6  hover:text-indigo-700 cursor-pointer" />
                </a>
                <a target="blank" title="github" className="self-center" href="https://github.com/jespmar">
                <GrGithub className="h-6 w-6  hover:text-indigo-700 cursor-pointer" />            </a>
            </div>

        </div>
    </div>
)

}