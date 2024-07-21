import '~/styles/global.css'

import { Analytics } from "@vercel/analytics/react"
import type { AppProps } from 'next/app'
import { Dosis, IBM_Plex_Serif, Inter, Open_Sans, PT_Mono,PT_Serif } from 'next/font/google'
import { lazy } from 'react'

import { Navbar } from '~/components/Navbar'

export interface SharedPageProps {
  draftMode: boolean
  token: string
}

const PreviewProvider = lazy(() => import('~/components/PreviewProvider'))

const mono = PT_Mono({
  variable: '--font-family-mono',
  subsets: ['latin'],
  weight: ['400'],
})

const sans = Dosis({
  variable: '--font-family-sans',
  subsets: ['latin'],
  weight: ["200","300", "400", "500", "600", "700", "800"],
})

const serif = IBM_Plex_Serif({
  variable: '--font-family-serif',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ["100","200","300","400", "700"],
})

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-family-sans: ${sans.style.fontFamily};
            --font-family-serif: ${serif.style.fontFamily};
            --font-family-mono: ${mono.style.fontFamily};
          }
        `}
      </style>
      <Analytics />
      <Navbar />
      {draftMode ? (
        <PreviewProvider token={token}>
          <Component {...pageProps} />
        </PreviewProvider>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  )
}
