<script setup>
import ContactHero from '~/components/pages/contact/ContactHero.vue'
import ContactGrid from '~/components/pages/contact/ContactGrid.vue'
import ContactForm from '~/components/pages/contact/ContactForm.vue'

useHead({
  title: 'Контакти | Shesha Shop',
  meta: [
    {
      name: 'description',
      content: 'Зв’яжіться з Shesha Shop — Telegram, Email, телефон або форма зворотного зв’язку.'
    }
  ]
})
</script>

<template>
  <div class="contact-page">
    <ContactHero />
    <ContactGrid />
    <ContactForm />
  </div>
</template>
