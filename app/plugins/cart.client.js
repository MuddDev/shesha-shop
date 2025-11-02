import { useCartStore } from '@/stores/useCartStore'

export default defineNuxtPlugin(() => {
  const cart = useCartStore()
  // ⚡️ loadFromStorage більше не потрібно
  // тепер Pinia сам ініціалізує items із localStorage
  console.log('🛒 Cart plugin initialized with', cart.items.length, 'items')
})
