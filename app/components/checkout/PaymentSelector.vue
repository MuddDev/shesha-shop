<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: 'mono'
  },

  descriptions: {
    type: Object,
    default: () => ({
      mono: 'Оплатити онлайн через monobank.',
      wayforpay: 'Оплата банківською карткою через WayForPay.',
      cod: 'Готівкою або карткою при отриманні.',
      invoice: 'Оплата за рахунком-фактурою.'
    })
  }
})

const emit = defineEmits(['update:modelValue'])

const local = ref(props.modelValue)

watch(
  () => props.modelValue,
  v => (local.value = v)
)

watch(local, newVal => {
  emit('update:modelValue', newVal)
})
</script>

<template>
  <div class="payment">
    <h3 class="payment__title">Спосіб оплати</h3>

    <div class="payment__options">
      <label
        class="payment__option"
        :class="{ active: local === 'mono' }"
      >
        <input
          type="radio"
          value="mono"
          v-model="local"
        />
        <div class="payment__icon">💳</div>
        <div class="payment__info">
          <span>Monobank</span>
          <small>{{ descriptions.mono }}</small>
        </div>
      </label>

      <label
        class="payment__option"
        :class="{ active: local === 'wayforpay' }"
      >
        <input
          type="radio"
          value="wayforpay"
          v-model="local"
        />
        <div class="payment__icon">💳</div>
        <div class="payment__info">
          <span>WayForPay</span>
          <small>{{ descriptions.wayforpay }}</small>
        </div>
      </label>

      <label
        class="payment__option"
        :class="{ active: local === 'cod' }"
      >
        <input
          type="radio"
          value="cod"
          v-model="local"
        />
        <div class="payment__icon">💵</div>
        <div class="payment__info">
          <span>При отриманні</span>
          <small>{{ descriptions.cod }}</small>
        </div>
      </label>

      <label
        class="payment__option"
        :class="{ active: local === 'invoice' }"
      >
        <input
          type="radio"
          value="invoice"
          v-model="local"
        />
        <div class="payment__icon">📄</div>
        <div class="payment__info">
          <span>Рахунок-фактура</span>
          <small>{{ descriptions.invoice }}</small>
        </div>
      </label>
    </div>
  </div>
</template>