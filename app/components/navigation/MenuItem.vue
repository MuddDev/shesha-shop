<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <li class="menu-item">
    <NuxtLink :to="item.link">
      {{ item.title }}
    </NuxtLink>
  </li>
</template>
