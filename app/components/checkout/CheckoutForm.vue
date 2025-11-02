<script setup>
import { useCartStore } from '@/stores/useCartStore'
const cart = useCartStore()

const name = ref('')
const email = ref('')
const phone = ref('')
const address = ref('')
const comment = ref('')

const submitOrder = () => {
  if (!name.value || !email.value || !phone.value || !address.value) {
    alert('⚠️ Заповніть усі обов’язкові поля')
    return
  }

  console.log('🧾 Замовлення оформлено:', {
    name: name.value,
    email: email.value,
    phone: phone.value,
    address: address.value,
    comment: comment.value,
    cart: cart.items
  })

  alert('✅ Дякуємо! Замовлення оформлено. Ми звʼяжемося з вами найближчим часом.')
  cart.clearCart()
  navigateTo('/')
}
</script>

<template>
  <div class="checkout-form">
    <h2 class="checkout-form__title">Дані для доставки</h2>

    <form
      @submit.prevent="submitOrder"
      class="checkout-form__body"
    >
      <input
        v-model="name"
        type="text"
        placeholder="Ім’я та прізвище"
        required
      />
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        required
      />
      <input
        v-model="phone"
        type="tel"
        placeholder="Телефон"
        required
      />
      <input
        v-model="address"
        type="text"
        placeholder="Адреса доставки"
        required
      />
      <textarea
        v-model="comment"
        placeholder="Коментар до замовлення"
      ></textarea>

      <button
        type="submit"
        class="checkout-form__btn"
      >
        Підтвердити замовлення
      </button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.checkout-form {
  background: var(--clr-bg);
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  border: 1px solid var(--clr-border);

  &__title {
    font-size: var(--fs-lg);
    font-weight: 600;
    margin-bottom: var(--space-5);
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);

    input,
    textarea {
      border: 1px solid var(--clr-border-light);
      border-radius: var(--radius-md);
      padding: var(--space-3);
      font-size: var(--fs-sm);
    }

    textarea {
      min-height: 80px;
      resize: none;
    }
  }

  &__btn {
    margin-top: var(--space-4);
    background: var(--clr-accent);
    color: white;
    font-weight: 600;
    padding: var(--space-3);
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: var(--clr-accent-hover);
    }
  }
}
</style>
