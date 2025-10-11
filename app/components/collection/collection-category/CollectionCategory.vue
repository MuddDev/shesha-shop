<script setup>
import categoryData from '@/data/collection-category.json'

const props = defineProps({
  data: {
    type: Object,
    default: () => categoryData
  }
})
</script>

<template>
  <section class="collection-category">
    <div class="container--full">
      <div class="collection-category__inner">
        <h2 class="collection-category__title">{{ props.data.title }}</h2>

        <ul class="collection-category__list">
          <li
            v-for="(item, i) in props.data.items"
            :key="i"
          >
            <div class="collection-category__box">
              <div class="collection-category__text">
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
                <a
                  :href="item.link"
                  class="btn"
                  >{{ item.cta }}</a
                >
              </div>
              <div class="collection-category__image">
                <img
                  :src="item.image"
                  :alt="item.title"
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
