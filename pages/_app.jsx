import { SessionProvider } from 'next-auth/react'
import { Roboto } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import '@/styles/globals.css'
import Header from '@/components/Header'

import { CartContextProvider } from '@/lib/CartContext'

const font = Roboto({ subsets: ['latin'], weight: '400' })

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <CartContextProvider>
        <main className={`${font.className} min-h-screen px-4 bg-slate-50 text-accent`}>
          <Header />
          <Component {...pageProps} />
        </main>
        <Toaster position="top-center" reverseOrder={false} />
      </CartContextProvider>
    </SessionProvider>
  )
}
