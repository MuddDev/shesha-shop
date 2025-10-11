<script setup>
import collectionsData from '@/data/collections.json'
import { useRequestURL } from '#app'

/* === SEO META === */
const url = useRequestURL()
const baseUrl = url.origin || 'https://shesha-shop.pages.dev'
const fullUrl = `${baseUrl}/collections`

const TITLE = collectionsData.seo.title
const DESCRIPTION =
  collectionsData.seo.description ||
  'Перегляньте колекції рушників, халатів, постільної білизни та кухонного текстилю. Натуральні матеріали, стиль і комфорт від SheshaShop.'

useHead({
  title: TITLE,
  meta: [
    { name: 'description', content: DESCRIPTION },
    { property: 'og:title', content: TITLE },
    { property: 'og:description', content: DESCRIPTION },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: fullUrl },
    { property: 'og:image', content: '/images/collections-banner.webp' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: TITLE },
    { name: 'twitter:description', content: DESCRIPTION },
    { name: 'robots', content: 'index, follow, max-image-preview:large' }
  ],
  link: [{ rel: 'canonical', href: fullUrl }]
})
</script>

<template>
  <section class="collections-list">
    <div class="container--full">
      <header class="collections-list__header">
        <h1>{{ collectionsData.title }}</h1>
        <p>{{ collectionsData.subtitle }}</p>
      </header>

      <transition-group
        name="fade-slide"
        tag="ul"
        class="collections-list__grid"
      >
        <li
          v-for="(col, i) in collectionsData.collections"
          :key="col.handle"
          class="collections-list__item"
        >
          <NuxtLink
            :to="`/collections/${col.handle}`"
            class="collections-list__link"
          >
            <div class="collections-list__image">
              <img
                :src="col.image"
                :alt="col.title"
                loading="lazy"
              />
              <div class="collections-list__overlay">
                <span class="collections-list__cta">Переглянути</span>
              </div>
            </div>
            <div class="collections-list__content">
              <h3>{{ col.title }}</h3>
              <p>{{ col.text }}</p>
            </div>
          </NuxtLink>
        </li>
      </transition-group>
    </div>
  </section>
</template>
