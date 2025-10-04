import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    data: null,
    loading: false
  }),

  actions: {
    async fetchSettings() {
      if (this.data || this.loading) return

      this.loading = true
      try {
        const json = await $fetch('/content/settings.json')
        this.data = json
      } catch (e) {
        console.error('❌ Settings fetch error:', e)
      } finally {
        this.loading = false
      }
    }
  },

  getters: {
    site: state => state.data?.site ?? { name: '', tagline: '' },
    logo: state => state.data?.logo ?? { image: '', alt: '' },
    announcement: state => state.data?.announcement ?? null
  }
})
