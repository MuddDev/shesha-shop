<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import NavigationDescComponent from '~/components/navigation/NavigationDescComponent.vue'
import NavigationMobileComponent from '~/components/navigation/NavigationMobileComponent.vue'

const isMobile = ref(false)

function checkViewport() {
  isMobile.value = window.innerWidth <= 1024
}

onMounted(() => {
  checkViewport()
  window.addEventListener('resize', checkViewport)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkViewport)
})
</script>

<template>
  <div class="navigation-inner__box">
    <component :is="isMobile ? NavigationMobileComponent : NavigationDescComponent" />
  </div>
</template>
