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

  app: {
    head: {
      title: 'SheshaShop | Рушники преміум якості',
      meta: [
        {
          name: 'description',
          content:
            'Інтернет-магазин рушників та текстилю SheshaShop — турецька якість, український комфорт.'
        },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' }
      ],

      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }]
    }
  },

  image: {
    dir: 'public',
    format: ['webp', 'avif'],
    densities: [1, 2],
    quality: 80
  },

  fonts: {
    families: [
      {
        name: 'Fixel Display',
        src: [
          { path: '/fonts/FixelDisplay/FixelDisplay-Regular.woff2', weight: '400' },
          { path: '/fonts/FixelDisplay/FixelDisplay-Medium.woff2', weight: '500' },
          { path: '/fonts/FixelDisplay/FixelDisplay-SemiBold.woff2', weight: '600' }
        ],
        fallback: ['sans-serif'],
        display: 'swap'
      }
    ]
  },

  vite: {
    css: {
      devSourcemap: true
    },
    build: {
      cssCodeSplit: false
    }
  },
  devtools: { enabled: true },
  nitro: {
    // 🔹 Вмикає сторінкове кешування (HTML відповіді)
    routeRules: {
      '/': { swr: true, cache: { maxAge: 60 * 60 * 6 } }, // головна кешується на 6 годин
      '/collections/**': { swr: true, cache: { maxAge: 60 * 30 } }, // колекції на 30 хв
      '/products/**': { swr: true, cache: { maxAge: 60 * 60 } }, // продукти — 1 год
      '/about': { swr: true, cache: { maxAge: 60 * 60 * 24 } } // статичні сторінки — 1 день
    },

    // 🔹 Загальні параметри кешу Nitro (серверне зберігання)
    storage: {
      cache: {
        driver: 'fs', // можеш змінити на 'memory' або 'redis'
        base: './.nitro/cache' // куди зберігати
      }
    }
  }
})