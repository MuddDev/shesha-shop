<script setup>
import { ref } from 'vue'
import { useShopifyMenu } from '@/composables/useShopifyMenu'
import { useNormalizeShopifyUrl } from '@/utils/normalizeShopifyUrl.js'

const { normalizeUrl } = useNormalizeShopifyUrl()
const items = await useShopifyMenu('shesha-menu')

const isOpen = ref(false)
const toggleMenu = () => (isOpen.value = !isOpen.value)

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
  <div class="mobile-nav">
    <!-- Бургер -->
    <button
      class="mobile-nav__toggle"
      @click="toggleMenu"
      aria-label="Toggle menu"
    >
      <span></span><span></span><span></span>
    </button>

    <!-- Затемнення -->
    <div
      class="mobile-nav__overlay"
      :class="{ 'mobile-nav__overlay--visible': isOpen }"
      @click="toggleMenu"
    ></div>

    <!-- Сайдбар -->
    <aside
      class="mobile-nav__drawer"
      :class="{ 'mobile-nav__drawer--open': isOpen }"
    >
      <div class="mobile-nav__header">
        <h3 class="mobile-nav__title">Меню</h3>
        <button
          class="mobile-nav__close"
          @click="toggleMenu"
          aria-label="Close menu"
        >
          ×
        </button>
      </div>

      <ul class="mobile-nav__list">
        <li
          v-for="item in items"
          :key="item.id"
          class="mobile-nav__item"
        >
          <NuxtLink
            :to="normalizeUrl(item.url)"
            class="mobile-nav__link"
            @click="toggleMenu"
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
            class="mobile-submenu"
          >
            <li
              v-for="child in item.items"
              :key="child.id"
              class="mobile-submenu__item"
            >
              <NuxtLink
                :to="normalizeUrl(child.url)"
                class="mobile-submenu__link"
                @click="toggleMenu"
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
    </aside>
  </div>
</template>
