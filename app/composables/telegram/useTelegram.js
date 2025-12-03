export const useTelegram = () => {
  const config = useRuntimeConfig()

  const sendMessage = async text => {
    try {
      const token = config.public.telegramBotToken
      const chatId = config.public.telegramChatId

      if (!token || !chatId) {
        console.error('❌ Missing Telegram token or chatId in config')
        return false
      }

      // Виклик відбувається через SSR (CORS не чіпляється)
      await $fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          chat_id: chatId,
          text,
        },
        server: true // 👈 це головне — змушує Nuxt зробити запит сервером, не браузером
      })

      console.log('✅ Telegram відправлено успішно')
      return true
    } catch (e) {
      console.error('❌ Telegram Error:', e)
      return false
    }
  }

  return { sendMessage }
}