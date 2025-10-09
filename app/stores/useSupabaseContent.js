import { defineStore } from 'pinia'

export const useContentStore = defineStore('content', {
  state: () => ({
    cache: {}
  }),

  actions: {
    async fetch(tableName, options = {}) {
      if (this.cache[tableName]) {
        return this.cache[tableName]
      }

      const { $supabase } = useNuxtApp()
      let query = $supabase.from(tableName).select('*')

      if (options.eq) {
        for (const [key, value] of Object.entries(options.eq)) {
          query = query.eq(key, value)
        }
      }

      if (options.order) {
        const { field, ascending = true } = options.order
        query = query.order(field, { ascending })
      }

      const { data, error } = await query

      if (error) {
        console.error(`❌ Error loading ${tableName}:`, error)
        return []
      }

      this.cache[tableName] = data
      return data
    },

    getAll(tableName) {
      return this.cache[tableName] || []
    },
    getOne(tableName) {
      return this.cache[tableName]?.[0] || null
    }
  }
})
