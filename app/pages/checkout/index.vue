<script setup>
definePageMeta({ ssr: false })

import CheckoutForm from '@/components/checkout/CheckoutForm.vue'
import CheckoutSummary from '@/components/checkout/CheckoutSummary.vue'
import SuccessPopup from '@/components/checkout/SuccessPopup.vue'
import { useCartStore } from '@/stores/useCartStore'
import { ref, onMounted } from 'vue'
import ds from '~/data/checkout.json'

const cart = useCartStore()
const successPopup = ref(false)

onMounted(() => {
  if (!cart.items.length) navigateTo('/')
})
const handleSuccess = () => {
  cart.clear()
  successPopup.value = true
}
</script>

<template>
  <section class="checkout container">
    <header class="checkout__header">
      <h1 class="checkout__title">{{ ds.header.title }}</h1>
      <p class="checkout__subtitle">
        {{ ds.header.subtitle }}
      </p>
    </header>

    <transition name="fade">
      <template v-if="cart.items.length">
        <div class="checkout__layout">
          <div class="checkout__form">
            <CheckoutForm @success="handleSuccess" />
          </div>

          <aside class="checkout__summary">
            <CheckoutSummary />
          </aside>
        </div>
      </template>

      <p
        v-else
        class="checkout__empty"
      >
        {{ ds.empty.message }}<br />
        <NuxtLink
          to="/"
          class="checkout__back"
          >{{ ds.empty.backButton }}</NuxtLink
        >
      </p>
    </transition>
  </section>
  <SuccessPopup
    :open="successPopup"
    @close="successPopup = false"
  />
</template>
