import { ref } from 'vue'
import { useTelegram } from '~/composables/telegram/useTelegram'

export const useContactForm = () => {
  const { sendMessage } = useTelegram()

  const name = ref('')
  const email = ref('')
  const message = ref('')
  const honeypot = ref('')
  const status = ref(null)
  const loading = ref(false)
  const showPopup = ref(false)
  const errors = ref({ name: '', email: '', message: '' })

  const validateEmail = v => /\S+@\S+\.\S+/.test(v)

  const validateForm = () => {
    errors.value = { name: '', email: '', message: '' }

    if (!name.value.trim()) errors.value.name = 'Введіть ім’я'
    if (!email.value.trim()) errors.value.email = 'Введіть email'
    else if (!validateEmail(email.value)) errors.value.email = 'Невірний формат email'
    if (!message.value.trim()) errors.value.message = 'Введіть повідомлення'

    const hasErrors = Object.values(errors.value).some(Boolean)
    status.value = hasErrors ? 'invalid' : null
    return !hasErrors
  }

  const resetForm = () => {
    name.value = ''
    email.value = ''
    message.value = ''
    errors.value = { name: '', email: '', message: '' }
  }

  const submitForm = async () => {
    if (honeypot.value) return // антиспам
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
      resetForm()
      setTimeout(() => (showPopup.value = false), 3000)
    } else {
      status.value = 'error'
    }

    loading.value = false
  }

  return {
    name,
    email,
    message,
    honeypot,
    status,
    loading,
    showPopup,
    errors,
    submitForm
  }
}
