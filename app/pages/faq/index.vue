<script setup>
import faq from '~/data/faq.json'
import FaqHero from '~/components/pages/faq/FaqHero.vue'
import FaqCategoryGrid from '~/components/pages/faq/FaqCategoryGrid.vue'

const pageTitle = 'Допомога та FAQ | Shesha Shop'
const pageDescription =
  'Відповіді на часті запитання: доставка, оплата, обмін, підтримка Shesha Shop.'

const ctaTitle = 'Не знайшли відповідь?'
const ctaText = 'Напишіть нам у Telegram — ми допоможемо 👋'
const ctaButton = 'Зв’язатися'
const ctaLink = '/contact'

useHead({
  title: pageTitle,
  meta: [{ name: 'description', content: pageDescription }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.categories.flatMap(c =>
          c.items.map(i => ({
            '@type': 'Question',
            name: i.q,
            acceptedAnswer: { '@type': 'Answer', text: i.a }
          }))
        )
      })
    }
  ]
})
</script>

<template>
  <div class="faq-page">
    <FaqHero />
    <FaqCategoryGrid :categories="faq.categories" />

    <section class="faq-cta container">
      <h2>{{ ctaTitle }}</h2>
      <p>{{ ctaText }}</p>
      <NuxtLink
        :to="ctaLink"
        class="faq-cta__btn"
      >
        {{ ctaButton }}
      </NuxtLink>
    </section>
  </div>
</template>
