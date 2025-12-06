<script setup>
import { computed, ref } from 'vue'
import { useCartStore } from '@/stores/useCartStore'
import CheckoutCard from '@/components/checkout/CheckoutCard.vue'

const cart = useCartStore()
const discountCode = ref('')
const discountValue = ref(0)

const applyDiscount = () => {
  const code = discountCode.value.trim().toLowerCase()

  if (code === 'shesha10') {
    discountValue.value = cart.totalPrice * 0.1
  } else {
    discountValue.value = 0
    alert('❌ Невірний промокод')
  }
}

const totalAfterDiscount = computed(() => (cart.totalPrice - discountValue.value).toFixed(2))
</script>

<template>
  <aside class="checkout-summary">
    <!-- Header -->
    <header class="cs-header">
      <h2 class="cs-title">Ваше замовлення</h2>
      <p class="cs-subtitle">Перевірте товари перед оформленням</p>
    </header>

    <!-- Items -->
    <div class="cs-items">
      <CheckoutCard
        v-for="item in cart.items"
        :key="item.id"
        :item="item"
      />
    </div>

    <div class="cs-divider" />

    <!-- Subtotal -->
    <div class="cs-row">
      <span>Сума товарів</span>
      <strong>{{ cart.totalPrice.toFixed(2) }} ₴</strong>
    </div>

    <!-- Promo -->
    <div class="cs-promo">
      <input
        v-model="discountCode"
        type="text"
        placeholder="Промокод"
        @keyup.enter="applyDiscount"
      />
      <button
        class="cs-promo-btn"
        @click="applyDiscount"
      >
        OK
      </button>
    </div>

    <!-- Discount -->
    <div
      v-if="discountValue"
      class="cs-row cs-row--discount"
    >
      <span>Знижка</span>
      <strong>-{{ discountValue.toFixed(2) }} ₴</strong>
    </div>

    <!-- Total -->
    <div class="cs-total-block">
      <div class="cs-total-line">
        <span class="cs-total-label">До сплати</span>
        <strong class="cs-total-value">{{ totalAfterDiscount }} ₴</strong>
      </div>
      <p class="cs-total-note">Включає всі знижки</p>
    </div>
  </aside>
</template>