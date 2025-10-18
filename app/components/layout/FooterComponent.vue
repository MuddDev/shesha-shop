<script setup>
import LogoComponent from '~/components/ui/LogoComponent.vue'

const content = useContentStore()

await content.fetch('footer_content', { eq: { active: true }, limit: 1 })
const footer = content.getOne('footer_content')
</script>

<template>
  <footer
    v-if="footer"
    class="footer"
  >
    <div class="container--full">
      <div class="footer__inner">
        <div class="footer__col footer__col--logo">
          <LogoComponent />
          <p
            v-if="footer.tagline"
            class="footer__tagline"
          >
            {{ footer.tagline }}
          </p>
        </div>

        <div class="footer__col footer__col--links">
          <ul>
            <li><NuxtLink to="/">Магазин</NuxtLink></li>
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
            <li v-if="footer.instagram">
              <Icon
                name="mdi:instagram"
                size="1rem"
                style="color: white"
              />
              <a
                :href="footer.instagram"
                target="_blank"
                >Instagram</a
              >
            </li>
            <li v-if="footer.facebook">
              <Icon
                name="mdi:facebook-box"
                size="1rem"
                style="color: white"
              />
              <a
                :href="footer.facebook"
                target="_blank"
                >Facebook</a
              >
            </li>
          </ul>
        </div>
      </div>

      <div class="footer__bottom">
        <p>© {{ new Date().getFullYear() }} {{ footer.site_name }}. Всі права захищені.</p>
      </div>
    </div>
  </footer>
</template>
