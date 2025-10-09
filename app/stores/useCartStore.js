import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    isOpen: false
  }),

  getters: {
    totalItems: state => state.items.reduce((sum, i) => sum + i.quantity, 0),
    totalPrice: state => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  },

  actions: {
    addItem(product) {
      const existing = this.items.find(i => i.id === product.id)
      if (existing) {
        existing.quantity += product.quantity || 1
      } else {
        this.items.push({ ...product, quantity: product.quantity || 1 })
      }
      this.openCart()
    },

    removeItem(id) {
      this.items = this.items.filter(i => i.id !== id)
    },

    updateQuantity(id, change) {
      const item = this.items.find(i => i.id === id)
      if (!item) return
      item.quantity += change
      if (item.quantity <= 0) this.removeItem(id)
    },

    clearCart() {
      this.items = []
    },

    toggleCart() {
      this.isOpen = !this.isOpen
    },

    openCart() {
      this.isOpen = true
    },

    closeCart() {
      this.isOpen = false
    }
  }
})
