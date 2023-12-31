import { useRouter } from 'next/router'
import { useContext } from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

import useCartStore from '@/lib/useCartStore'

const Header = () => {
  const { pathname } = useRouter()
  const { data: session } = useSession()

  const { cartProducts } = useCartStore()

  const active = 'text-primary transition hover:text-secondary font-bold'
  const inactive = 'text-gray-500 transition hover:text-gray-500/75'

  const logo = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
      />
    </svg>
  )

  const cart = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
      />
    </svg>
  )

  return (
    <header className="bg-white shadow-lg sticky top-0 z-10">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link href="/" className="text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-10"
          >
            {logo}
          </svg>
        </Link>

        <nav className="flex item-center justify-center space-x-4">
          <ul className="flex items-center gap-4">
            <li>
              <Link className={pathname === '/' ? active : inactive} href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className={pathname === '/products' ? active : inactive} href="/products">
                All Products
              </Link>
            </li>
          </ul>

          <div className="flex items-center space-x-4">
            {session ? (
              <button
                onClick={signOut}
                className="rounded-md bg-transparent text-text px-5 py-2.5 text-sm font-medium shadow"
              >
                Logout, {session?.user?.name.split(' ')?.[0]}
              </button>
            ) : (
              <Link className="rounded-md bg-transparent text-text px-5 py-2.5 text-sm font-medium shadow" href="/cart">
                Login
              </Link>
            )}

            <Link href="/cart" className="relative group">
              {cart}
              {cartProducts.length > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white rounded-full w-4 h-4 text-xs flex items-center justify-center transform translate-x-1/2 -translate-y-1/2 group-hover:scale-100 transition-transform ease-in-out duration-300">
                  {cartProducts.length}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
