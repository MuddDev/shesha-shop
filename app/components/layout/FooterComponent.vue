<script setup>
import siteData from '@/data/site.json'

const { site, logo, footer } = siteData
</script>

<template>
  <footer class="footer">
    <div class="container--full">
      <div class="footer__inner">

        <div class="footer__col footer__col--logo">
          <NuxtLink to="/" class="footer__logo">
            <img
                v-if="logo.image"
                :src="logo.image"
                :alt="logo.alt"
                class="footer__logo-img"
            />
            <span v-else>{{ site.name }}</span>
          </NuxtLink>
          <p v-if="site.tagline" class="footer__tagline">{{ site.tagline }}</p>
        </div>


        <div class="footer__col footer__col--links">
          <ul>
            <li><NuxtLink to="/collections/all">Магазин</NuxtLink></li>
            <li><NuxtLink to="/about">Про нас</NuxtLink></li>
            <li><NuxtLink to="/contact">Контакти</NuxtLink></li>
          </ul>
        </div>


        <div class="footer__col footer__col--contact">
          <p>{{ footer.address }}</p>
          <a :href="`mailto:${footer.email}`">{{ footer.email }}</a>
        </div>


        <div class="footer__col footer__col--socials">
          <ul>
            <li v-if="footer.socials.instagram">
              <Icon
                  class="cart__icon"
                  name="mdi:instagram"
                  size="1rem"
                  mode="svg"
                  style="color: white"
              />
              <a :href="footer.socials.instagram" target="_blank">Instagram</a>
            </li>
            <li v-if="footer.socials.facebook">
              <Icon
                  class="cart__icon"
                  name="mdi:facebook-box"
                  size="1rem"
                  mode="svg"
                  style="color: white"
              />
              <a :href="footer.socials.facebook" target="_blank">Facebook</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer__bottom">
        <p>© {{ new Date().getFullYear() }} {{ site.name }}. Всі права захищені.</p>
      </div>
    </div>
  </footer>
</template>