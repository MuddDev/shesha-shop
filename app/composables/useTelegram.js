export const useTelegram = () => {
  const config = useRuntimeConfig()
  const token = config.public.telegramBotToken
  const chatId = config.public.telegramChatId

  if (!token || !chatId) {
    console.warn('⚠️ Telegram config missing in runtimeConfig')
  }

  const sendMessage = async text => {
    try {
      const url = `https://api.telegram.org/bot${token}/sendMessage`
      const body = {
        chat_id: chatId,
        text,
        parse_mode: 'Markdown'
      }

      const res = await $fetch(url, { method: 'POST', body })
      return !!(res.ok || res.result)
    } catch (e) {
      console.error('❌ Telegram Error:', e)
      return false
    }
  }

  return { sendMessage }
}
