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

<style scoped lang="scss">
.payment {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.payment__title {
  font-size: var(--fs-lg);
  font-weight: 600;
  margin-bottom: var(--space-3);
}

/* grid */
.payment__options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-3);
}

/* option */
.payment__option {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--clr-white);
  border: 1px solid var(--clr-border-light);
  cursor: pointer;
  transition:
    border 0.2s,
    background 0.2s,
    box-shadow 0.2s;

  input {
    display: none;
  }

  &:hover {
    border-color: var(--clr-accent);
    background: var(--clr-white-85);
  }

  &.active {
    border-color: var(--clr-accent);
    background: var(--clr-white);
    box-shadow: 0 0 0 3px var(--clr-accent-glow);
  }
}

/* icon */
.payment__icon {
  width: 42px;
  height: 42px;
  border-radius: var(--radius-md);
  background: var(--clr-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}

/* info */
.payment__info {
  display: flex;
  flex-direction: column;
  gap: 3px;

  span {
    font-weight: 600;
    font-size: var(--fs-base);
  }

  small {
    font-size: var(--fs-xs);
    color: var(--clr-text-subtle);
  }
}
</style>
