import { useCartStore } from '@/stores/useCartStore'
import { watch } from 'vue'

export default defineNuxtPlugin(nuxtApp => {
  // Виконується лише на клієнті (бо *.client.js)
  const cart = useCartStore()

  // 🧩 Завантажуємо з localStorage при старті
  const saved = localStorage.getItem('cart-items')
  if (saved) {
    try {
      cart.items = JSON.parse(saved)
    } catch (e) {
      console.error('❌ Failed to parse cart-items from localStorage:', e)
    }
  }

  // 🧠 Відстежуємо зміни кошика
  watch(
    () => cart.items,
    val => {
      localStorage.setItem('cart-items', JSON.stringify(val))
    },
    { deep: true }
  )

  // 🔁 Синхронізація між вкладками
  window.addEventListener('storage', e => {
    if (e.key === 'cart-items') {
      cart.items = JSON.parse(e.newValue || '[]')
    }
  })
})
