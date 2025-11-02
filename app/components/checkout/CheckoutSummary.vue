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
  <div class="checkout-summary">
    <h2 class="checkout-summary__title">Ваше замовлення</h2>

    <div class="checkout-summary__list">
      <CheckoutCard
        v-for="item in cart.items"
        :key="item.id"
        :item="item"
      />
    </div>

    <div class="checkout-summary__divider" />

    <div class="checkout-summary__line">
      <span>Сума товарів</span>
      <strong>{{ cart.totalPrice.toFixed(2) }} ₴</strong>
    </div>

    <div class="checkout-summary__discount">
      <input
        v-model="discountCode"
        type="text"
        placeholder="Введіть промокод"
        @keyup.enter="applyDiscount"
      />
      <button @click="applyDiscount">Застосувати</button>
    </div>

    <div
      v-if="discountValue"
      class="checkout-summary__line discount"
    >
      <span>Знижка</span>
      <strong>-{{ discountValue.toFixed(2) }} ₴</strong>
    </div>

    <div class="checkout-summary__line total">
      <span>До сплати</span>
      <strong>{{ totalAfterDiscount }} ₴</strong>
    </div>
  </div>
</template>

<style scoped lang="scss">
.checkout-summary {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: clamp(2rem, 3vw, 3rem);
  background: #f9f9f9;
  border-radius: 16px;
  border: 1px solid #eaeaea;

  &__title {
    font-size: 1.4rem;
    font-weight: 700;
    color: #111;
    margin-bottom: 0.5rem;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__divider {
    height: 1px;
    background: #e6e6e6;
    margin: 0.5rem 0;
  }

  &__line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.95rem;
    color: #333;
    line-height: 1.5;

    strong {
      font-weight: 600;
      color: #000;
    }

    &.discount {
      color: #c0392b;
      strong {
        color: #c0392b;
      }
    }

    &.total {
      margin-top: 0.5rem;
      font-size: 1.1rem;
      font-weight: 700;
      border-top: 1px solid #ddd;
      padding-top: 0.75rem;
    }
  }

  &__discount {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.75rem;

    input {
      flex: 1;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 0.65rem 1rem;
      font-size: 0.95rem;
      background: #fff;
      color: #111;
      transition:
        border 0.2s,
        box-shadow 0.2s;

      &:focus {
        outline: none;
        border-color: #000;
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
      }
    }

    button {
      background: #111;
      color: #fff;
      font-weight: 600;
      border: none;
      border-radius: 8px;
      padding: 0 1.5rem;
      cursor: pointer;
      transition:
        background 0.25s ease,
        transform 0.1s ease;

      &:hover {
        background: #000;
        transform: translateY(-1px);
      }
      &:active {
        transform: translateY(0);
      }
    }
  }
}
</style>
