<script setup>
import { useShopifyMenu } from '@/composables/useShopifyMenu'
import { useNormalizeShopifyUrl } from '@/utils/normalizeShopifyUrl.js'

const items = await useShopifyMenu('shesha-menu')

const { normalizeUrl } = useNormalizeShopifyUrl()

const getBadgeType = url => {
  if (!url) return null
  const match = url.match(/\/collections\/([\w-]+)/)
  if (!match) return null
  const handle = match[1]
  const badgeMap = {
    sale: 'sale',
    'sale-50': 'sale',
    new: 'new',
    'rushniki-banni': 'new',
    hot: 'hot',
    'best-sellers': 'bestseller',
    limited: 'limited'
  }
  return badgeMap[handle] || null
}
</script>

<template>
  <nav class="main-nav">
    <ul class="main-nav__list">
      <li
        v-for="item in items"
        :key="item.id"
        class="main-nav__item"
      >
        <NuxtLink
          :to="normalizeUrl(item.url)"
          class="main-nav__link"
        >
          {{ item.title }}
          <span
            v-if="getBadgeType(item.url)"
            class="badge"
            :data-type="getBadgeType(item.url)"
          >
            {{ getBadgeType(item.url).toUpperCase() }}
          </span>
        </NuxtLink>

        <ul
          v-if="item.items?.length"
          class="dropdown"
        >
          <li
            v-for="child in item.items"
            :key="child.id"
            class="dropdown__item"
          >
            <NuxtLink
              :to="normalizeUrl(child.url)"
              class="dropdown__link"
            >
              {{ child.title }}
              <span
                v-if="getBadgeType(child.url)"
                class="badge"
                :data-type="getBadgeType(child.url)"
              >
                {{ getBadgeType(child.url).toUpperCase() }}
              </span>
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
