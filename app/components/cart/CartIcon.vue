<script setup>
import { useCartStore } from '@/stores/useCartStore'
import CartDrawer from '~/components/cart/CartDrawer.vue'

const cart = useCartStore()
</script>

<template>
  <div class="cart">
    <button
      class="cart__button"
      @click="cart.toggleCart"
      aria-label="Відкрити кошик"
    >
      <Icon
        class="cart__icon"
        name="mdi:basket"
        size="2rem"
        mode="svg"
        style="color: white"
      />
      <span class="cart__badge">{{ cart.totalItems }}</span>
    </button>

    <CartDrawer
      v-show="cart.isOpen"
      :is-open="cart.isOpen"
      @close="cart.closeCart"
    />
  </div>
</template>
