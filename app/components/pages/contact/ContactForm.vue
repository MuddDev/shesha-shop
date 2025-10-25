<script setup>
import { ref } from 'vue'
import { useTelegram } from '~/composables/useTelegram'

const { sendMessage } = useTelegram()

// поля
const name = ref('')
const email = ref('')
const message = ref('')

// стани
const honeypot = ref('')
const status = ref(null)
const loading = ref(false)
const errors = ref({})
const showPopup = ref(false)

const validateEmail = v => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v)

const validateForm = () => {
  const newErrors = {}

  if (!name.value.trim()) newErrors.name = 'Введіть ваше ім’я'
  if (!email.value.trim()) newErrors.email = 'Введіть email'
  else if (!validateEmail(email.value)) newErrors.email = 'Некоректний email'
  if (!message.value.trim()) newErrors.message = 'Напишіть повідомлення (мін. 10 символів)'
  else if (message.value.trim().length < 10) newErrors.message = 'Повідомлення закоротке'

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const submitForm = async () => {
  if (honeypot.value) return
  if (!validateForm()) return

  loading.value = true
  status.value = null

  const text = `
📩 *Нове повідомлення з форми Shesha Shop*
👤 *Ім’я:* ${name.value}
📧 *Email:* ${email.value}
💬 *Повідомлення:*
${message.value}
`

  const success = await sendMessage(text)

  if (success) {
    status.value = 'success'
    showPopup.value = true
    name.value = ''
    email.value = ''
    message.value = ''
    errors.value = {}
    setTimeout(() => (showPopup.value = false), 3000)
  } else {
    status.value = 'error'
  }

  loading.value = false
}
</script>

<template>
  <section class="contact-form container">
    <h2 class="contact-form__title">Напишіть нам</h2>

    <form
      @submit.prevent="submitForm"
      class="contact-form__body"
    >
      <div class="field">
        <input
          v-model="name"
          type="text"
          placeholder="Ваше ім’я"
          :class="{ invalid: errors.name }"
        />
        <small
          v-if="errors.name"
          class="helper"
          >{{ errors.name }}</small
        >
      </div>

      <div class="field">
        <input
          v-model="email"
          type="email"
          placeholder="Ваш Email"
          :class="{ invalid: errors.email }"
        />
        <small
          v-if="errors.email"
          class="helper"
          >{{ errors.email }}</small
        >
      </div>

      <div class="field">
        <textarea
          v-model="message"
          placeholder="Ваше повідомлення"
          rows="5"
          :class="{ invalid: errors.message }"
        ></textarea>
        <small
          v-if="errors.message"
          class="helper"
          >{{ errors.message }}</small
        >
      </div>

      <input
        v-model="honeypot"
        type="text"
        tabindex="-1"
        autocomplete="off"
        class="contact-form__honeypot"
      />

      <button
        type="submit"
        class="contact-form__btn"
        :disabled="loading"
      >
        <span v-if="loading">Відправляємо...</span>
        <span v-else>Надіслати</span>
      </button>

      <p
        v-if="status === 'error'"
        class="contact-form__status error"
      >
        ❌ Помилка при надсиланні. Спробуйте ще раз.
      </p>
    </form>

    <transition name="popup">
      <div
        v-if="showPopup"
        class="popup-success"
      >
        <Icon
          name="mdi:check-circle"
          size="2rem"
          class="popup-icon"
        />
        <p>✅ Повідомлення успішно надіслано!</p>
      </div>
    </transition>
  </section>
</template>