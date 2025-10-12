<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  images: { type: Array, default: () => [] },
  featured: { type: Object, default: () => null }
})

const activeIndex = ref(0)

const currentImage = computed(() => {
  if (props.images?.[activeIndex.value]) return props.images[activeIndex.value]
  return props.featured || null
})
</script>
<template>
  <div class="gallery">
    <div class="gallery-thumbs">
      <img
        v-for="(img, i) in images"
        :key="i"
        :src="img.url"
        :alt="img.altText || 'Product image'"
        :class="{ active: activeIndex === i }"
        @click="activeIndex = i"
      />
    </div>

    <div class="gallery-main">
      <transition
        name="fade"
        mode="out-in"
      >
        <img
          v-if="currentImage"
          :key="currentImage.url"
          :src="currentImage.url"
          :alt="currentImage.altText || 'Product image'"
          class="main-image"
        />
      </transition>
    </div>
  </div>
</template>
