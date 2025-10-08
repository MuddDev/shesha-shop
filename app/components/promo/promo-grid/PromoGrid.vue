<script setup>
import defaultPromo from '@/data/promo-home.json'
import { ref } from 'vue'

const props = defineProps({
  content: {
    type: Object,
    default: () => defaultPromo
  }
})

const copiedStates = ref({})

const copyCode = (code, key = 'center') => {
  navigator.clipboard.writeText(code)
  copiedStates.value[key] = true

  setTimeout(() => {
    copiedStates.value[key] = false
  }, 1500)
}
</script>

<template>
  <section class="promo-grid">
    <div class="container--full">
      <div class="promo-grid__inner">
        <div class="promo-grid__left">
          <ul>
            <li
              v-for="(item, i) in content.left"
              :key="i"
            >
              <NuxtLink
                :to="item.ctaLink"
                class="promo-grid__link"
              >
                <div class="promo-grid__left--image">
                  <img
                    :src="item.image"
                    :alt="item.title"
                  />
                </div>

                <div class="promo-grid__left--title">
                  <div class="promo-grid__left--title_text">
                    <p>{{ item.subtitle }}</p>
                    <h2>{{ item.title }}</h2>
                  </div>

                  <div
                    v-if="item.discount"
                    class="promo-grid__left--title-promo"
                  >
                    <span>{{ item.discount }}</span>
                  </div>
                </div>

                <div
                  v-if="item.ctaText"
                  class="promo-grid__left--btn"
                >
                  <NuxtLink :to="item.ctaLink">{{ item.ctaText }}</NuxtLink>
                </div>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div
          class="promo-grid__center"
          v-if="content.center"
        >
          <ul>
            <li>
              <NuxtLink
                :to="content.center.ctaLink"
                class="promo-grid__link"
              >
                <div class="promo-grid__center--image">
                  <img
                    :src="content.center.image"
                    :alt="content.center.title"
                  />
                </div>

                <div class="promo-grid__center--title">
                  <div class="promo-grid__center--title_text">
                    <p>{{ content.center.subtitle }}</p>
                    <h2>{{ content.center.title }}</h2>
                  </div>

                  <div
                    v-if="content.center.discount"
                    class="promo-grid__center--title-promo"
                  >
                    <span>{{ content.center.discount }}</span>
                  </div>
                </div>

                <div class="promo-grid__center--extras">
                  <div
                    class="promo-grid__center--code"
                    v-if="content.center.promoCode"
                  >
                    <p>{{ content.center.promoText }}</p>
                    <div class="promo-grid__center--code_box">
                      <p>{{ content.center.promoCode }}</p>
                      <button @click.prevent="copyCode(content.center.promoCode)">
                        <Icon
                          class="cart__icon"
                          name="mdi:content-copy"
                          size="1rem"
                          mode="svg"
                          style="color: white"
                        />
                        Скопіювати
                      </button>
                    </div>
                    <span
                      v-if="copiedStates.center"
                      class="copied-toast copied-toast--active"
                    >
                      Скопійовано!
                    </span>
                  </div>

                  <div class="promo-grid__center--btn">
                    <NuxtLink :to="content.center.ctaLink">
                      {{ content.center.ctaText }}
                    </NuxtLink>
                  </div>
                </div>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="promo-grid__right">
          <ul>
            <li
              v-for="(item, i) in content.right"
              :key="i"
            >
              <NuxtLink
                :to="item.ctaLink"
                class="promo-grid__link"
              >
                <div class="promo-grid__right--image">
                  <img
                    :src="item.image"
                    :alt="item.title"
                  />
                </div>

                <div class="promo-grid__right--title">
                  <div class="promo-grid__right--title_text">
                    <p>{{ item.subtitle }}</p>
                    <h2>{{ item.title }}</h2>
                  </div>

                  <div
                    v-if="item.discount"
                    class="promo-grid__right--title-promo"
                  >
                    <span>{{ item.discount }}</span>
                  </div>
                  <div
                    v-if="item.ctaText"
                    class="promo-grid__left--btn"
                  >
                    <NuxtLink :to="item.ctaLink">{{ item.ctaText }}</NuxtLink>
                  </div>
                </div>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
