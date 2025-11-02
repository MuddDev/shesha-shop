<script setup>
definePageMeta({ ssr: false })

import CheckoutForm from '@/components/checkout/CheckoutForm.vue'
import CheckoutSummary from '@/components/checkout/CheckoutSummary.vue'
import { useCartStore } from '@/stores/useCartStore'

const cart = useCartStore()

onMounted(() => {
  if (!cart.items.length) navigateTo('/')
})
</script>

<template>
  <section class="checkout container">
    <header class="checkout__header">
      <h1 class="checkout__title">Оформлення замовлення</h1>
      <p class="checkout__subtitle">
        Вкажіть свої дані та перевірте замовлення перед підтвердженням 🖤
      </p>
    </header>

    <transition name="fade">
      <template v-if="cart.items.length">
        <div class="checkout__layout">
          <div class="checkout__form">
            <CheckoutForm />
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
        Ваш кошик порожній 😔<br />
        <NuxtLink
          to="/"
          class="checkout__back"
          >Повернутися до каталогу</NuxtLink
        >
      </p>
    </transition>
  </section>
</template>

<style scoped lang="scss">
.checkout {
  padding: clamp(3rem, 6vw, 6rem) 0;
  background: #fff;
  color: #111;
  font-family: 'Inter', 'Fixel Display', sans-serif;

  &__header {
    text-align: center;
    margin-bottom: clamp(2rem, 4vw, 3.5rem);
  }

  &__title {
    font-size: clamp(2.2rem, 4vw, 3rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #000;
  }

  &__subtitle {
    margin-top: 0.5rem;
    font-size: 1rem;
    color: #666;
  }

  &__layout {
    display: grid;
    grid-template-columns: 1fr 0.9fr;
    gap: clamp(2rem, 5vw, 4rem);

    @media (max-width: 992px) {
      grid-template-columns: 1fr;
    }
  }

  &__form {
    padding: clamp(2rem, 3vw, 3rem);
    border: 1px solid #eaeaea;
    border-radius: 16px;
    background: #fcfcfc;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.05);
    }
  }

  &__summary {
    padding: clamp(2rem, 3vw, 3rem);
    border-radius: 16px;
    background: #f9f9f9;
    border: 1px solid #e5e5e5;
    position: sticky;
    top: 2rem;
    align-self: start;

    @media (max-width: 992px) {
      position: static;
    }
  }

  &__empty {
    text-align: center;
    font-size: 1.1rem;
    color: #777;
    padding: 5rem 0;

    .checkout__back {
      display: inline-block;
      margin-top: 1rem;
      font-weight: 600;
      color: #000;
      text-decoration: none;
      border-bottom: 1px solid #0000;
      transition: all 0.25s ease;

      &:hover {
        border-bottom: 1px solid #000;
      }
    }
  }

  /* Fade */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
