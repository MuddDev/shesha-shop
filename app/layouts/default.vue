<script setup>
import HeaderComponent from '~/components/layout/HeaderComponent.vue'
import FooterComponent from '~/components/layout/FooterComponent.vue'
</script>

<template>
  <div class="layout-wrapper">
    <div class="layouts-header">
      <HeaderComponent />
    </div>


    <main class="main">
      <slot />
    </main>

    <FooterComponent />
  </div>
</template>