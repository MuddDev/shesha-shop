<script setup>
import LogoComponent from '~/components/ui/LogoComponent.vue'
import NavigationMobileMenu from '@/components/navigation/NavigationMobileMenu.vue'
</script>
<template>
  <div class="navigation-mobile">
    <div class="navigation-inner__menu">
      <NavigationMobileMenu />
    </div>
    <div class="navigation-inner__logo">
      <LogoComponent />
    </div>
    <div class="navigation-inner__actions">
      <div class="navigation-inner__search">
        <SearchButton />
      </div>
      <div class="navigation-inner__cart-drawer">
        <CartIcon />
      </div>
    </div>
  </div>
</template>
