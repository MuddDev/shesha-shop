<script setup>
import MenuItem from '@/components/navigation/MenuItem.vue'
const menu = await useMenu()
</script>

<template>
  <div class="mobile-menu">
    <nav v-if="menu?.length">
      <ul class="mobile-menu__list">
        <MenuItem
          v-for="item in menu"
          :key="item.link"
          :item="item"
        />
      </ul>
    </nav>

    <p v-else>⚠️ Меню не знайдено або порожнє</p>
  </div>
</template>

<style scoped lang="scss">
.mobile-menu {
  position: fixed;
  inset: 0;
  background: #fff;
  z-index: 100;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
}
</style>
