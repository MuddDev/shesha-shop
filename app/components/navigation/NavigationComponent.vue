<script setup>
import LogoComponent from '~/components/ui/LogoComponent.vue'
import MainMenu from '~/components/navigation/MainMenu.vue'
</script>
<template>
  <div class="navigation-inner__box">
    <div class="navigation-inner__logo">
      <LogoComponent />
    </div>
    <div class="navigation-inner__menu">
      <MainMenu />
    </div>
    <div class="navigation-inner__contact"></div>
    <div class="navigation-inner__cart-drawer"></div>
  </div>
</template>
