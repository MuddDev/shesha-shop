<script setup>
import MenuItem from '@/components/navigation/MenuItem.vue'

const { default: menu } = await useMenu()
</script>

<template>
  <nav class="main-nav">
    <ul class="menu-list">
      <MenuItem
        v-for="item in menu"
        :key="item.link"
        :item="item"
      />
    </ul>
  </nav>
</template>
