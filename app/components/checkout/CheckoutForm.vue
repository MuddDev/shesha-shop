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