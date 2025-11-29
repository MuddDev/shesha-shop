export default defineNuxtConfig({
  css: ['@/assets/scss/main.scss'],

  modules: ['@pinia/nuxt', '@nuxt/image', '@nuxt/fonts', '@nuxt/scripts', '@nuxt/icon'],

  icon: {
    mode: 'css',
    cssLayer: 'base'
  },

  ssr: true,
  pages: true,

  runtimeConfig: {
    public: {
      shopifyToken: process.env.NUXT_PUBLIC_SHOPIFY_TOKEN,
      shopifyDomain: process.env.NUXT_PUBLIC_SHOPIFY_DOMAIN,
      shopifyApiVersion: process.env.NUXT_PUBLIC_SHOPIFY_API_VERSION || '2025-04',
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
      telegramBotToken: process.env.NUXT_PUBLIC_TELEGRAM_BOT_TOKEN,
      telegramChatId: process.env.NUXT_PUBLIC_TELEGRAM_CHAT_ID,
      NP_API_KEY: process.env.NUXT_PUBLIC_NP_API_KEY
    }
  },

  vite: {
    css: { devSourcemap: true },

    // >>> ВИРІШЕННЯ ПОМИЛКИ @vueuse/core
    optimizeDeps: {
      include: ['@vueuse/core']
    },

    // >>> Rollup ES module compatibility
    build: {
      target: 'esnext'
    }
  },

  devtools: { enabled: true },

  nitro: {
    preset: 'cloudflare_pages',
    esbuild: { options: { target: 'esnext' } },
    moduleSideEffects: ['@vueuse/core'],

    routeRules: {
      '/': { swr: true, cache: { maxAge: 60 * 60 * 6 } },
      '/collections/**': { swr: true, cache: { maxAge: 60 * 30 } },
      '/products/**': { swr: true, cache: { maxAge: 60 * 60 } },
      '/about': { swr: true, cache: { maxAge: 60 * 60 * 24 } }
    },

    storage: {
      cache: {
        driver: 'fs',
        base: './.nitro/cache'
      }
    }
  }
})