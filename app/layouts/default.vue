<script setup>
import HeaderComponent from '~/components/layout/HeaderComponent.vue'
import FooterComponent from '~/components/layout/FooterComponent.vue'
import AnnouncementBarComponent from '~/components/announcement-bar/AnnouncementBarComponent.vue'
</script>

<template>
  <div class="layout-wrapper">
    <div class="layouts-announcement">
      <AnnouncementBarComponent />
    </div>

    <div class="layouts-header">
      <HeaderComponent />
    </div>

    <main class="main">
      <slot />
    </main>

    <div class="layouts-footer">
      <FooterComponent />
    </div>
  </div>
</template>
