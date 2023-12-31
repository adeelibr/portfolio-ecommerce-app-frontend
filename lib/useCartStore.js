import { useEffect, useState } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartZustandStore = create(
  persist(
    (set) => ({
      cartProducts: [],
      addProduct: (productId) => set((state) => ({ cartProducts: [...state.cartProducts, productId] })),
      removeProduct: (productId) =>
        set((state) => {
          const indexToRemove = state.cartProducts.lastIndexOf(productId)
          if (indexToRemove !== -1) {
            const updatedCart = [...state.cartProducts]
            updatedCart.splice(indexToRemove, 1)
            return {
              cartProducts: updatedCart,
            }
          }
          // Product not found, return the current state
          return state
        }),
      clearCart: () => set({ cartProducts: [] }),
    }),
    {
      name: 'cart-store',
    },
  ),
)

const useCartStore = () => {
  const [isLocalStorageAvailable, setIsLocalStorageAvailable] = useState(false);
  
  useEffect(() => {
    setIsLocalStorageAvailable(typeof window !== 'undefined' && !!window.localStorage);
  }, []);

  const {
    cartProducts,
    addProduct,
    removeProduct,
    clearCart
  } = useCartZustandStore();

  const noop = () => {};

  if (!isLocalStorageAvailable) {
    return {
      cartProducts: [],
      addProduct: noop,
      removeProduct: noop,
      clearCart: noop,
    };
  }

  return {
    cartProducts,
    addProduct,
    removeProduct,
    clearCart,
  };
};

export default useCartStore
