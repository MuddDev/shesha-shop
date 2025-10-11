<script setup>
import siteData from '@/data/site.json'

const site = siteData.site
const logo = siteData.logo
const hasImage = logo.image && logo.image.trim().length > 0
</script>

<template>
  <NuxtLink
    to="/"
    class="logo"
    aria-label="Go to homepage"
  >
    <div class="logo-inner">
      <template v-if="hasImage">
        <img
          :src="logo.image"
          :alt="logo.alt || site.name"
          width="180"
          height="auto"
          loading="eager"
          decoding="async"
        />
      </template>

      <template v-else>
        <h2 class="logo-text">{{ site.name }}</h2>
        <span class="logo-tagline">{{ site.tagline }}</span>
      </template>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.logo {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.logo-inner {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  font-family: var(--font-primary);
  font-size: var(--fs-lg);
  font-weight: 600;
  color: var(--clr-bg);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

img {
  display: block;
  max-height: 48px;
  width: auto;
  object-fit: contain;
}
</style>
