<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/useCartStore'
import CartDrawer from '~/components/cart/CartDrawer.vue'

const cart = useCartStore()
const isOpen = ref(false)
const toggleCart = () => (isOpen.value = !isOpen.value)

const itemCount = computed(() => cart.totalItems || 0)
</script>

<template>
  <div class="cart">
    <button
      class="cart__button"
      @click="toggleCart"
      aria-label="Відкрити кошик"
    >
      <Icon
        class="cart__icon"
        name="mdi:basket"
        size="2rem"
        mode="svg"
        style="color: white"
      />
      <span class="cart__badge">{{ itemCount }}</span>
    </button>

    <CartDrawer
      v-if="isOpen"
      :is-open="isOpen"
      @close="toggleCart"
    />
  </div>
</template>
