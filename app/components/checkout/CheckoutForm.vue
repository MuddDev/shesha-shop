<script setup>
import { ref, watch,onMounted } from 'vue'
import { useCartStore } from '@/stores/useCartStore'
import { useTelegram } from '@/composables/telegram/useTelegram'

import DeliverySelector from '@/components/checkout/DeliverySelector.vue'
import PaymentSelector from '@/components/checkout/PaymentSelector.vue'

const cart = useCartStore()
const { sendMessage } = useTelegram()
const emit = defineEmits(['success'])

// Клієнт
const name = ref('')
const email = ref('')
const phone = ref('')
const comment = ref('')

// Завантаження із localStorage
onMounted(() => {
  name.value = localStorage.getItem('cf_name') || ''
  phone.value = localStorage.getItem('cf_phone') || ''
  email.value = localStorage.getItem('cf_email') || ''
  comment.value = localStorage.getItem('cf_comment') || ''
})

// Автозбереження
watch(name, v => localStorage.setItem('cf_name', v))
watch(phone, v => localStorage.setItem('cf_phone', v))
watch(email, v => localStorage.setItem('cf_email', v))
watch(comment, v => localStorage.setItem('cf_comment', v))

// Доставка (через DeliverySelector.vue)
const delivery = ref({
  method: 'nova-poshta',
  city: '',
  cityRef: null,
  branch: '',
  index: '',
  address: ''
})

// Оплата (через PaymentSelector.vue)
const paymentMethod = ref('mono')

const paymentDescriptions = {
  mono: 'Оплатити онлайн через monobank.',
  wayforpay: 'Оплата банківською карткою через WayForPay.',
  cod: 'Готівкою або карткою при отриманні.',
  invoice: 'Оплата за рахунком-фактурою.'
}

// SUBMIT ORDER + TELEGRAM
const submitOrder = async () => {
  if (!name.value || !phone.value) {
    alert('⚠️ Заповніть обовʼязкові поля')
    return
  }

  const totalPrice = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const orderData = {
    customer: {
      name: name.value,
      email: email.value,
      phone: phone.value
    },
    delivery: delivery.value,
    payment: {
      method: paymentMethod.value,
      details: paymentDescriptions[paymentMethod.value]
    },
    comment: comment.value,
    cart: cart.items,
    total: totalPrice
  }

  const text = `
🆕 *Нове замовлення*

👤 *Клієнт*
• ${orderData.customer.name}
• ${orderData.customer.phone}
• ${orderData.customer.email || '-'}

🚚 *Доставка:* ${orderData.delivery.method}
🏙 *Місто:* ${orderData.delivery.city || '-'}
🏤 *Відділення:* ${orderData.delivery.branch || '-'}
📮 *Індекс:* ${orderData.delivery.index || '-'}
🏠 *Адреса:* ${orderData.delivery.address || '-'}

💳 *Оплата:* ${orderData.payment.method}
${orderData.payment.details}

🛒 *Товари:*
${orderData.cart.map(i => `• ${i.title} x${i.quantity} — ${i.price * i.quantity}₴`).join('\n')}

💰 *Загальна сума:* **${orderData.total}₴**

💬 *Коментар:*
${orderData.comment || '-'}
  `.trim()

  const sent = await sendMessage(text)
  if (!sent) {
    alert('❌ Telegram не прийняв замовлення')
    return
  }

  cart.clear()
  emit('success')
}
</script>

<template>
  <div class="checkout-form">
    <h2 class="checkout-form__title">Дані для оформлення</h2>

    <form
      @submit.prevent="submitOrder"
      class="checkout-form__body"
      autocomplete="on"
    >
      <!-- ОСОБИСТІ ДАНІ -->
      <div class="cf-section">
        <h3>Особисті дані</h3>

        <div class="cf-grid">
          <input
            v-model="name"
            name="name"
            type="text"
            placeholder="Ім’я та прізвище *"
            autocomplete="name"
            required
          />
          <input
            v-model="phone"
            name="phone"
            type="tel"
            placeholder="Телефон *"
            autocomplete="tel"
            required
          />
          <input
            v-model="email"
            name="email"
            type="email"
            placeholder="Email (необовʼязково)"
            autocomplete="email"
          />
        </div>
      </div>

      <!-- Доставка -->
      <DeliverySelector v-model="delivery" />

      <!-- Оплата -->
      <div class="cf-section">
        <PaymentSelector
          v-model="paymentMethod"
          :descriptions="paymentDescriptions"
        />
      </div>

      <!-- Коментар -->
      <textarea
        v-model="comment"
        placeholder="Коментар"
      ></textarea>

      <button
        class="checkout-form__btn"
        type="submit"
      >
        Підтвердити замовлення
      </button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.checkout-form {
  background: var(--clr-bg-soft);
  padding: var(--space-6);
  border-radius: var(--radius-xl);
  border: 1px solid var(--clr-border);
  box-shadow: var(--shadow-md);

  @media (max-width: 768px) {
    padding: var(--space-4);
    border-radius: var(--radius-lg);
  }

  &__title {
    font-size: var(--fs-xl);
    font-weight: 600;
    margin-bottom: var(--space-6);
  }
}

input,
select,
textarea {
  width: 100%;
  padding: var(--space-3);
  border-radius: var(--radius-lg);
  font-size: var(--fs-base);
  background: var(--clr-white);
  border: 1px solid var(--clr-border-light);

  &:focus {
    border-color: var(--clr-accent);
    box-shadow: 0 0 0 3px var(--clr-accent-glow);
    outline: none;
  }
}

textarea {
  resize: none;
  min-height: 110px;
}

.cf-section {
  margin-bottom: var(--space-6);
  padding: var(--space-5);
  border-radius: var(--radius-lg);
  background: var(--clr-white-85);
  border: 1px solid var(--clr-border-light);
  box-shadow: var(--shadow-soft);
  margin-top: var(--space-6);

  h3 {
    font-size: var(--fs-lg);
    font-weight: 600;
    margin-bottom: var(--space-4);
  }
}

.cf-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.checkout-form__btn {
  margin-top: var(--space-6);
  width: 100%;
  padding: var(--space-4);
  background: var(--clr-accent);
  color: #fff;
  font-size: var(--fs-lg);
  font-weight: 600;
  border: none;
  border-radius: var(--radius-lg);

  &:hover {
    background: var(--clr-accent-hover);
  }
}
</style>