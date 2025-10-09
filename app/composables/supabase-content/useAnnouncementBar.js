export const useAnnouncementBar = async () => {
  const { $supabase } = useNuxtApp()

  // Отримуємо лише активний запис
  const { data, error } = await $supabase
    .from('announcement_bar')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false })
    .limit(1)

  if (error) {
    console.error('❌ Announcement Bar error:', error)
    return null
  }

  const row = data?.[0]
  if (!row) {
    console.warn('⚠️ No active announcement bar found.')
    return null
  }

  return {
    title: row.title,
    message: row.message,
    button: row.cta_text
      ? {
          text: row.cta_text,
          link: row.cta_link || '#'
        }
      : null
  }
}
