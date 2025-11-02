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

<style scoped lang="scss">
.checkout-card {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.75rem;
  padding: 1.75rem;
  border: 1px solid #ebebeb;
  border-radius: 20px;
  background: #fff;
  transition:
    box-shadow 0.25s ease,
    transform 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  }

  &__image {
    width: 110px;
    height: 130px;
    object-fit: cover;
    border-radius: 14px;
    background: #f4f4f4;
    border: 1px solid #e0e0e0;
    flex-shrink: 0;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.03);
    }
  }

  &__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  &__title {
    font-size: 1rem;
    font-weight: 600;
    color: #111;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.2s;

    &:hover {
      color: #000;
    }
  }

  &__variant-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    font-size: 0.85rem;
    color: #666;

    .opt-name {
      font-weight: 500;
      color: #555;
    }

    .opt-value {
      font-weight: 600;
      color: #111;
    }
  }

  &__actions {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__qty {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    background: #fafafa;

    .btn {
      background: transparent;
      border: none;
      width: 32px;
      height: 32px;
      font-size: 1.1rem;
      cursor: pointer;
      color: #111;
      font-weight: 500;
      transition: all 0.2s ease;

      &:hover:not(:disabled) {
        background: #000;
        color: #fff;
      }

      &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }

    span {
      display: block;
      width: 32px;
      text-align: center;
      font-weight: 600;
      color: #111;
      font-size: 0.95rem;
    }
  }

  &__remove {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    border: none;
    background: transparent;
    color: #b30000;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: color 0.25s;

    &:hover {
      color: #e60000;
    }
  }

  &__price {
    min-width: 100px;
    text-align: right;

    .price-group {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.2rem;
    }

    .current {
      font-size: 1.05rem;
      font-weight: 700;
      color: #000;
    }

    .compare {
      font-size: 0.9rem;
      color: #999;
      text-decoration: line-through;
    }

    .discount {
      font-size: 0.8rem;
      font-weight: 700;
      color: #c1272d;
      background: rgba(193, 39, 45, 0.08);
      padding: 2px 6px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }
  }
}
</style>
