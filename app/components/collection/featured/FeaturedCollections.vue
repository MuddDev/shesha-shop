<script setup>
import { useAsyncData } from '#app'
import { useCollections } from '@/composables/useCollections'

const props = defineProps({
  handles: {
    type: Array,
    required: true
  }
})

const { data: collections, pending } = await useAsyncData('featured-collections', () =>
  useCollections(props.handles)
)
</script>

<template>
  <div
    v-if="!pending && collections?.length"
    class="featured-inner"
  >
    <div class="container--full">
      <div class="featured-inner__lists">
        <ul>
          <li
            v-for="collection in collections"
            :key="collection.id"
          >
            <NuxtLink :to="`/collections/${collection.handle}`">
              <div class="image-wrapper">
                <img
                  width="100%"
                  height="auto"
                  :src="collection.image?.url"
                  :alt="collection.title"
                  loading="eager"
                />
              </div>
              <p>{{ collection.title }}</p>
            </NuxtLink>
          </li>
          <li class="featured-inner__more">
            <NuxtLink to="/collections/all">Більше...</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div
    v-else
    class="featured-inner__skeleton container--full"
  >
    <ul>
      <li
        v-for="n in 4"
        :key="n"
        class="skeleton-card"
      ></li>
    </ul>
  </div>
</template>
