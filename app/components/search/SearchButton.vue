<script setup>
import { ref } from 'vue'
import SearchDrawer from '~/components/search/SearchDrawer.vue'

const isSearchOpen = ref(false)
</script>

<template>
  <div class="search">
    <button
      class="search__button"
      @click="isSearchOpen = true"
      aria-label="Відкрити пошук"
    >
      <Icon
        class="cart__icon"
        name="mdi:magnify"
        size="2rem"
        mode="svg"
        style="color: white"
      />
    </button>

    <SearchDrawer
      v-if="isSearchOpen"
      :class="{ 'search-drawer--open': isSearchOpen }"
      @close="isSearchOpen = false"
    />
  </div>
</template>
