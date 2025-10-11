<script setup>
import benefitsData from '@/data/benefits.json'

const props = defineProps({
  data: {
    type: Object,
    default: () => benefitsData
  }
})
</script>

<template>
  <section class="benefits">
    <div class="container--full">
      <div class="benefits-inner">
        <h2 class="benefits-inner__title">{{ props.data.title }}</h2>

        <ul class="benefits-inner__list">
          <li
            v-for="(item, i) in props.data.items"
            :key="i"
            class="benefits-inner__item"
          >
            <div class="benefits-inner__box">
              <span class="benefits-inner__badge">{{ item.badge }}</span>
              <h3 class="benefits-inner__heading">{{ item.title }}</h3>
              <p class="benefits-inner__text">{{ item.text }}</p>
              <a
                :href="item.link"
                class="benefits-inner__link"
              >
                {{ item.linkText }}
                <Icon
                  name="mdi:chevron-right"
                  size="1.2rem"
                />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
