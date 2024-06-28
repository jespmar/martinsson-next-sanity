"use client"
import { useWindowScroll } from "@uidotdev/usehooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { AiOutlinePlus } from "react-icons/ai";



export const Navbar = () => {

    const [navbarColor, setNavbarColor] = useState("bg-white text-slate-950")
    const [navBarLight, setNavbarLight] = useState(false)
    const [{ x, y }, scrollTo] = useWindowScroll();
    const [navRot, setNavRot] = useState(false)

    const router = useRouter()

    console.log(router.asPath)

   const checkNav = () => {

    if (y > 100) {
        if (!navBarLight) {
            setNavbarColor("navbar-bg text-slate-950 bg-opacity-20 shadow-2xl backdrop-blur-xl")
            setNavbarLight(true)
        }
    }

    if (y < 50) {
        if (navBarLight) {
            setNavbarColor("bg-white text-slate-950")
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
    else return "h-0"
   }


return (
    <div style={{
        transition: "all .9s ease",
        WebkitTransition: "all .9s ease",
        MozTransition: "all .9s ease"}} className={`w-full fixed top-0 px-4 py-5 ${navbarColor}`}>
        <div className="flex gap-10 justify-between lg:justify-start w-full max-w-7xl mx-auto">
            <h1 className="font-mono text-3xl">martinsson<span className="text-indigo-500">.</span>io</h1>
            <div className="hidden font-mono gap-5 lg:flex text-lg self-center ">
                <Link href={"/"} className="hover:text-indigo-500 underline underline-offset-8">Home</Link>
                <Link href={"/"} className="hover:text-indigo-500">Blog</Link>
                <Link href={"/"} className="hover:text-indigo-500">About</Link>
            </div>
            <div className="flex font-mono gap-5 lg:hidden text-base self-center ">
            <AiOutlinePlus style={{
        transition: "all .5s ease",
        WebkitTransition: "all .5s ease",
        MozTransition: "all .5s ease"}} onClick={() => setNavRot(!navRot)} className={`h-10 w-10 ${rot()}`} />
            </div>
            
        </div>
        <div style={{
        transition: "all .9s ease",
        WebkitTransition: "all .9s ease",
        MozTransition: "all .9s ease"}} className={`bg-white overflow-hidden flex flex-col ${nav()}`}>
            <div className="font-mono gap-5 flex flex-col text-2xl mt-10 self-center w-full text-center">
                <div className="hover:bg-indigo-100 w-full py-3 rounded-lg">
                  <Link onClick={() => setNavRot(!navRot)} href={"/"} className="hover:text-indigo-500 underline underline-offset-8">Home</Link>  
                </div>
                <div className="hover:bg-indigo-100 w-full py-3 rounded-lg">
                  <Link onClick={() => setNavRot(!navRot)} href={"/blog"} className="hover:text-indigo-500">Blog</Link>  
                </div>
                <div className="hover:bg-indigo-100 w-full py-3 rounded-lg">
                  <Link onClick={() => setNavRot(!navRot)} href={"/about"} className="hover:text-indigo-500">About</Link>  
                </div>

            </div>

        </div>
    </div>
)

}