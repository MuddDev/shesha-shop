<script setup>
import aboutData from '@/data/about.json'

import AboutHero from '@/components/pages/about/AboutHero.vue'
import AboutValues from '@/components/pages/about/AboutValues.vue'
import AboutStory from '@/components/pages/about/AboutStory.vue'
import AboutCTA from '@/components/pages/about/AboutCTA.vue'

useHead({
  title: aboutData.seo.title,
  meta: [{ name: 'description', content: aboutData.seo.description }]
})
</script>

<template>
  <main class="about-page">
    <AboutHero :data="aboutData.hero" />

    <AboutValues :data="aboutData.values" />

    <AboutStory :data="aboutData.story" />

    <AboutCTA :data="aboutData.cta" />
  </main>
</template>
