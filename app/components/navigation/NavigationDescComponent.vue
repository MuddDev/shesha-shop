<script setup lang="ts">
import LogoComponent from '~/components/ui/LogoComponent.vue'
import NavigationMainMenu from '~/components/navigation/NavigationMainMenu.vue'
import ContactInfo from '~/components/ui/ContactInfo.vue'
import CartIcon from '~/components/cart/CartIcon.vue'
</script>
<template>
  <div class="navigation-desc">
    <div class="navigation-inner__logo">
      <LogoComponent />
    </div>
    <div class="navigation-inner__menu">
      <NavigationMainMenu />
    </div>
    <div class="navigation-inner__contact">
      <ContactInfo />
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
