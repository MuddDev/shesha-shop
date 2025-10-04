// @ts-check
import prettier from 'eslint-config-prettier'
import pluginImport from 'eslint-plugin-import'
import pluginVue from 'eslint-plugin-vue'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
  {
    // 🧩 Плагіни
    plugins: {
      vue: pluginVue,
      import: pluginImport
    },

    // 🧠 Наслідуємо базові правила
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-recommended',
      'plugin:import/recommended',
      prettier // вимикає конфліктні правила з Prettier
    ],

    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module'
    },

    rules: {
      /* === General Rules === */
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'prefer-const': 'warn',

      /* === Import Order === */
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true }
        }
      ],

      /* === Vue Specific === */
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      'vue/require-default-prop': 'off',
      'vue/require-explicit-emits': 'off',
      'vue/html-self-closing': [
        'warn',
        {
          html: { void: 'always', normal: 'never', component: 'always' },
          svg: 'always',
          math: 'always'
        }
      ]
    }
  }
])
