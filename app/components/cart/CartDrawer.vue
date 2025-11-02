<script setup>
import CartItem from '~/components/cart/CartItem.vue'
import { useCartStore } from '@/stores/useCartStore'

const cart = useCartStore()

defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close', 'checkout'])

const removeItem = id => cart.removeItem(id)
const updateQuantity = ({ id, change }) => cart.updateQuantity(id, change)

const handleCheckout = () => {
  // 🔥 викликаємо подію для батька
  emit('checkout')

  // (поки що просто виводимо в консоль для тесту)
  console.log('🛒 Checkout button clicked')
}
</script>

<template>
  <div
    class="cart-drawer"
    :class="{ 'cart-drawer--open': isOpen }"
  >
    <div
      class="cart-drawer__overlay"
      @click="emit('close')"
    ></div>

    <aside class="cart-drawer__panel">
      <header class="cart-drawer__header">
        <h2>Ваш кошик</h2>
        <button
          class="cart-drawer__close"
          @click="emit('close')"
        >
          <Icon
            class="cart__icon"
            name="mdi:close-thick"
            size="1.5rem"
            mode="svg"
            style="color: black"
          />
        </button>
      </header>

      <div class="cart-drawer__body">
        <template v-if="cart.items.length">
          <CartItem
            v-for="product in cart.items"
            :key="product.id"
            :item="product"
            @remove="removeItem"
            @updateQuantity="updateQuantity"
          />
        </template>

        <template v-else>
          <p class="cart-drawer__empty">Ваш кошик поки що порожній 🛍️</p>
        </template>
      </div>

      <footer
        class="cart-drawer__footer"
        v-if="cart.items.length"
      >
        <div class="cart-drawer__summary">
          <span>Всього:</span>
          <strong>{{ cart.totalPrice }} ₴</strong>
        </div>

        <button
          class="cart-drawer__checkout"
          @click="handleCheckout"
        >
          Оформити замовлення
        </button>
      </footer>
    </aside>
  </div>
</template>
