<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  endDate: {
    type: String,
    default: '2025-12-31T23:59:59'
  },
  title: {
    type: String,
    default: 'Final Call! Sale Ending Soon'
  },
  buttonText: {
    type: String,
    default: 'Shop Now'
  },
  buttonLink: {
    type: String,
    default: '/collections/all'
  },
  backgroundImage: {
    type: String,
    default: '/images/countdown-bg.webp'
  }
})

const timeLeft = ref({ days: '00', hours: '00', minutes: '00', seconds: '00' })
let timer = null

const updateCountdown = () => {
  const now = new Date().getTime()
  const target = new Date(props.endDate).getTime()
  const distance = target - now

  if (distance <= 0) {
    clearInterval(timer)
    timeLeft.value = { days: '00', hours: '00', minutes: '00', seconds: '00' }
    return
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)

  timeLeft.value = {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0')
  }
}

onMounted(() => {
  updateCountdown()
  timer = setInterval(updateCountdown, 1000)
})
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <div class="countdown">
    <div class="container--full">
      <div
        class="countdown-inner"
        :style="{ backgroundImage: `url(${backgroundImage})` }"
      >
        <div class="countdown-left">
          <h2 class="countdown-title">{{ title }}</h2>
          <NuxtLink
            :to="buttonLink"
            class="countdown-btn"
          >
            {{ buttonText }}
          </NuxtLink>
        </div>

        <div class="countdown-timer">
          <div
            v-for="(val, key) in timeLeft"
            :key="key"
            class="timer-block"
          >
            <span class="timer-value">{{ val }}</span>
            <span class="timer-label">{{ key }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
