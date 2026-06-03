import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/components/product-card'

interface CartItem extends Product {
  quantity: number
}

interface BeeStore {
  cart: CartItem[]
  favorites: string[] // product IDs
  isCartOpen: boolean
  
  // Cart Actions (Interest List)
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  
  // Favorite Actions
  toggleFavorite: (productId: string) => void
  isFavorite: (productId: string) => boolean
}

export const useBeeStore = create<BeeStore>()(
  persist(
    (set, get) => ({
      cart: [],
      favorites: [],
      isCartOpen: false,

      addToCart: (product) => {
        const cart = get().cart
        const existingItem = cart.find((item) => item.id === product.id)

        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          })
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] })
        }
      },

      removeFromCart: (productId) => {
        set({ cart: get().cart.filter((item) => item.id !== productId) })
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId)
          return
        }
        set({
          cart: get().cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        })
      },

      clearCart: () => set({ cart: [] }),
      toggleCart: () => set({ isCartOpen: !get().isCartOpen }),

      toggleFavorite: (productId) => {
        const favorites = get().favorites
        if (favorites.includes(productId)) {
          set({ favorites: favorites.filter((id) => id !== productId) })
        } else {
          set({ favorites: [...favorites, productId] })
        }
      },

      isFavorite: (productId) => get().favorites.includes(productId),
    }),
    {
      name: 'bee-decor-storage',
    }
  )
)
