<script setup>
import { ref } from 'vue'

const emit = defineEmits(['close'])
const query = ref('')

// подія пошуку
const handleSearch = () => {
  if (!query.value.trim()) return
  console.log('🔍 Searching for:', query.value)
  // тут потім додамо логіку запиту до Shopify Search API
  emit('close')
}
</script>

<template>
  <div class="search-drawer">
    <div
      class="search-drawer__overlay"
      @click="emit('close')"
    ></div>

    <aside class="search-drawer__panel">
      <header class="search-drawer__header">
        <h2 class="search-drawer__title">Пошук</h2>
        <button
          class="search-drawer__close"
          @click="emit('close')"
        >
          <Icon
            class="cart__icon"
            name="mdi:close-thick"
            size="1.5rem"
            mode="svg"
            style="color: black"
          />
        </button>
      </header>

      <div class="search-drawer__body">
        <form
          @submit.prevent="handleSearch"
          class="search-drawer__form"
        >
          <input
            v-model="query"
            type="text"
            class="search-drawer__input"
            placeholder="Введіть назву товару..."
          />
          <button
            class="search-drawer__button"
            type="submit"
          >
            <Icon
              class="cart__icon"
              name="mdi:magnify"
              size="2rem"
              mode="svg"
              style="color: white"
            />
          </button>
        </form>
      </div>
    </aside>
  </div>
</template>
