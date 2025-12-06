<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/useCartStore'
const cart = useCartStore()

const props = defineProps({
  item: { type: Object, required: true }
})

// 🧩 Дії
const increase = () => cart.updateQuantity(props.item.id, +1)
const decrease = () => cart.updateQuantity(props.item.id, -1)
const remove = () => cart.removeItem(props.item.id)

// 💸 Знижка
const hasDiscount = computed(
  () => props.item.compareAtPrice && props.item.compareAtPrice > props.item.price
)
const discountPercent = computed(() =>
  hasDiscount.value
    ? Math.round(((props.item.compareAtPrice - props.item.price) / props.item.compareAtPrice) * 100)
    : 0
)
</script>

<template>
  <div class="checkout-card">
    <!-- 🖼 Фото -->
    <NuxtImg
      :src="item.image"
      :alt="item.title"
      width="100"
      height="120"
      class="checkout-card__image"
      loading="lazy"
    />

    <!-- 🧾 Інформація -->
    <div class="checkout-card__info">
      <h3 class="checkout-card__title">{{ item.title }}</h3>

      <ul
        v-if="item.variantOptions?.length"
        class="checkout-card__variant-list"
      >
        <li
          v-for="(opt, i) in item.variantOptions"
          :key="i"
          class="checkout-card__variant"
        >
          <span class="opt-name">{{ opt.name }}:</span>
          <span class="opt-value">{{ opt.value }}</span>
        </li>
      </ul>

      <div class="checkout-card__actions">
        <div class="checkout-card__qty">
          <button
            class="btn"
            @click="decrease"
            :disabled="item.quantity <= 1"
          >
            −
          </button>
          <span>{{ item.quantity }}</span>
          <button
            class="btn"
            @click="increase"
          >
            +
          </button>
        </div>

        <button
          class="checkout-card__remove"
          @click="remove"
        >
          <Icon
            name="mdi:delete-outline"
            size="1rem"
          />
          Видалити
        </button>
      </div>
    </div>

    <!-- 💰 Ціни -->
    <div class="checkout-card__price">
      <div class="price-group">
        <span class="current">{{ item.price.toFixed(2) }} ₴</span>

        <span
          v-if="item.compareAtPrice"
          class="compare"
        >
          {{ item.compareAtPrice.toFixed(2) }} ₴
        </span>

        <span
          v-if="discountPercent"
          class="discount"
        >
          -{{ discountPercent }}%
        </span>
      </div>
    </div>
  </div>
</template>