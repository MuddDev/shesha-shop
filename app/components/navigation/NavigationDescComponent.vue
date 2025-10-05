<script setup lang="ts">
import LogoComponent from '~/components/ui/LogoComponent.vue'
import NavigationMainMenu from '~/components/navigation/NavigationMainMenu.vue'
</script>
<template>
  <div class="navigation-desc">
    <div class="navigation-inner__logo">
      <LogoComponent />
    </div>
    <div class="navigation-inner__menu">
      <NavigationMainMenu />
    </div>
    <div class="navigation-inner__contact"></div>
    <div class="navigation-inner__cart-drawer"></div>
  </div>
</template>
