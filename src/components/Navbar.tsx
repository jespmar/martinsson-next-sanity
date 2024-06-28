"use client"
import { useWindowScroll } from "@uidotdev/usehooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"



export const Navbar = () => {

    const [navbarColor, setNavbarColor] = useState("bg-white text-slate-950")
    const [navBarLight, setNavbarLight] = useState(false)
    const [{ x, y }, scrollTo] = useWindowScroll();

    const router = useRouter()

    console.log(router.asPath)

   const checkNav = () => {

    if (y > 100) {
        if (!navBarLight) {
            setNavbarColor("bg-white text-slate-950 bg-opacity-20 shadow-2xl backdrop-blur-xl")
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


return (
    <div style={{
        
        transition: "all .9s ease",
        WebkitTransition: "all .9s ease",
        MozTransition: "all .9s ease"}} className={`w-full fixed top-0 px-20 py-5 flex ${navbarColor}`}>
        <div className="flex gap-10 w-full max-w-7xl mx-auto">
            <h1 className="font-mono text-2xl">martinsson<span className="text-indigo-500">.</span>io</h1>
            <div className="flex font-mono gap-5 text-base self-center ">
                <Link href={"/"} className="hover:text-indigo-500 underline underline-offset-8">Home</Link>
                <Link href={"/"} className="hover:text-indigo-500">Blog</Link>
                <Link href={"/"} className="hover:text-indigo-500">About</Link>
            </div>
        </div>

    </div>
)

}