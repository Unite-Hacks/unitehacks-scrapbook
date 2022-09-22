import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react";
import Navbar from '../components/Navbar'


function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <SessionProvider>
    <Navbar />
  <Component {...pageProps} />
  </SessionProvider>
  )
}

export default MyApp
