import { createContext, useEffect, useState } from 'react'

export const CartContext = createContext({})

export function CartContextProvider({ children }) {
  const ls = typeof window !== 'undefined' ? window.localStorage : null

  const [cartProducts, setCartProducts] = useState([])

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem('cart', JSON.stringify(cartProducts))
    }
  }, [ls, cartProducts])

  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')))
    }
  }, [ls])

  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId])
  }

  function removeProduct(productId) {
    setCartProducts((prev) => {
      const position = prev.indexOf(productId)
      if (position !== -1) {
        return prev.filter((value, index) => index !== position)
      }
      return prev
    })
  }

  function clearCart() {
    // Clear local storage
    if (ls) {
      ls.removeItem('cart')
    }
    // Clear the state
    setCartProducts([])
  }

  return (
    <CartContext.Provider value={{ cartProducts, addProduct, removeProduct, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
