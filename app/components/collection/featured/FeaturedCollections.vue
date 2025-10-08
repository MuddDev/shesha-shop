<script setup>
import { ref, onMounted } from 'vue'
import { useCollections } from '@/composables/useCollections'

const props = defineProps({
  handles: {
    type: Array,
    required: true
  }
})

const collections = ref([])

onMounted(async () => {
  collections.value = await useCollections(props.handles)
})
</script>

<template>
  <div
    class="featured-inner"
    v-if="collections.length"
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
                  :src="collection.image?.url"
                  :alt="collection.title"
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
    class="featured-inner__loading container--full"
  >
    <p>Завантаження колекцій...</p>
  </div>
</template>
