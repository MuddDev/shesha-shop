// stores/useCartStore.js
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

const STORAGE_KEY = 'shesha_cart'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const isOpen = ref(false)

  // 🧩 1. Ініціалізація з localStorage (одразу при запуску на клієнті)
  if (process.client) {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        items.value = JSON.parse(saved)
      } catch (e) {
        console.error('❌ Неможливо розпарсити localStorage для кошика', e)
      }
    }
  }

  // 🧩 2. Зберігати в localStorage при кожній зміні
  watch(
    items,
    newItems => {
      if (process.client) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems))
      }
    },
    { deep: true }
  )

  // 🧮 Обчислення
  const totalItems = computed(() => items.value.reduce((sum, i) => sum + i.quantity, 0))
  const totalPrice = computed(() => items.value.reduce((sum, i) => sum + i.price * i.quantity, 0))

  // 🛠 Дії
  const addItem = product => {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) existing.quantity += product.quantity || 1
    else items.value.push({ ...product, quantity: product.quantity || 1 })
    isOpen.value = true
  }

  const removeItem = id => {
    items.value = items.value.filter(i => i.id !== id)
  }

  const updateQuantity = (id, change) => {
    const item = items.value.find(i => i.id === id)
    if (!item) return
    item.quantity += change
    if (item.quantity <= 0) removeItem(id)
  }

  const clear = () => {
    items.value = []
    if (process.client) localStorage.removeItem(STORAGE_KEY)
  }

  const toggleCart = () => (isOpen.value = !isOpen.value)
  const openCart = () => (isOpen.value = true)
  const closeCart = () => (isOpen.value = false)

  return {
    items,
    isOpen,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    toggleCart,
    openCart,
    closeCart
  }
})
