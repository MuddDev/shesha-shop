<script setup>
import { computed, ref } from 'vue'
import { useCartStore } from '@/stores/useCartStore'
import CheckoutCard from '@/components/checkout/CheckoutCard.vue'

const cart = useCartStore()
const discountCode = ref('')
const discountValue = ref(0)

const applyDiscount = () => {
  const code = discountCode.value.trim().toLowerCase()

  if (code === 'shesha10') {
    discountValue.value = cart.totalPrice * 0.1
  } else {
    discountValue.value = 0
    alert('❌ Невірний промокод')
  }
}

const totalAfterDiscount = computed(() => (cart.totalPrice - discountValue.value).toFixed(2))
</script>

<template>
  <aside class="checkout-summary">
    <!-- Header -->
    <header class="cs-header">
      <h2 class="cs-title">Ваше замовлення</h2>
      <p class="cs-subtitle">Перевірте товари перед оформленням</p>
    </header>

    <!-- Items -->
    <div class="cs-items">
      <CheckoutCard
        v-for="item in cart.items"
        :key="item.id"
        :item="item"
      />
    </div>

    <div class="cs-divider" />

    <!-- Subtotal -->
    <div class="cs-row">
      <span>Сума товарів</span>
      <strong>{{ cart.totalPrice.toFixed(2) }} ₴</strong>
    </div>

    <!-- Promo -->
    <div class="cs-promo">
      <input
        v-model="discountCode"
        type="text"
        placeholder="Промокод"
        @keyup.enter="applyDiscount"
      />
      <button
        class="cs-promo-btn"
        @click="applyDiscount"
      >
        OK
      </button>
    </div>

    <!-- Discount -->
    <div
      v-if="discountValue"
      class="cs-row cs-row--discount"
    >
      <span>Знижка</span>
      <strong>-{{ discountValue.toFixed(2) }} ₴</strong>
    </div>

    <!-- Total -->
    <div class="cs-total-block">
      <div class="cs-total-line">
        <span class="cs-total-label">До сплати</span>
        <strong class="cs-total-value">{{ totalAfterDiscount }} ₴</strong>
      </div>
      <p class="cs-total-note">Включає всі знижки</p>
    </div>
  </aside>
</template>

<style scoped lang="scss">
.checkout-summary {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-6);
  background: var(--clr-bg-soft);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--clr-border-light);

  @media (max-width: 768px) {
    padding: var(--space-4);
    border-radius: var(--radius-md);
  }
}

/* Header */
.cs-header {
  margin-bottom: var(--space-2);
}

.cs-title {
  font-size: var(--fs-lg);
  font-weight: 600;
  color: var(--clr-text-deep);
  margin-bottom: 0.25rem;
}

.cs-subtitle {
  font-size: var(--fs-xs);
  color: var(--clr-text-subtle);
}

/* Items wrapper */
.cs-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

/* Checkout Card Layout */
.checkout-card {
  display: flex;
  gap: var(--space-3);
  align-items: flex-start;
}

/* Квадратна мініатюра */
.checkout-card__thumb {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-md);
  overflow: hidden;
  flex-shrink: 0;
  background: #f0f0f0;
  border: 1px solid var(--clr-border-light);

  img,
  picture,
  .nuxt-picture,
  .nuxt-img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* критично */
    display: block;
  }
}

/* Info */
.checkout-card__info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.checkout-card__title {
  font-size: var(--fs-sm);
  font-weight: 600;
  color: var(--clr-text-strong);
  line-height: 1.3;
}

.checkout-card__meta {
  font-size: var(--fs-xs);
  color: var(--clr-text-subtle);
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.checkout-card__price {
  margin-left: auto;
  font-size: var(--fs-sm);
  font-weight: 600;
  color: var(--clr-text-deep);
}

/* Divider */
.cs-divider {
  height: 1px;
  background: var(--clr-line);
  margin: var(--space-2) 0;
}

/* Basic row */
.cs-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--fs-sm);
  padding: var(--space-1) 0;

  strong {
    font-weight: 600;
    color: var(--clr-text-strong);
  }
}

.cs-row--discount {
  color: var(--clr-danger-light);

  strong {
    color: var(--clr-danger-light);
  }
}

/* Promo code */
.cs-promo {
  display: flex;
  gap: var(--space-2);
  padding-top: var(--space-1);

  input {
    flex: 1;
    padding: 0.6rem 1rem;
    border-radius: var(--radius-md);
    background: var(--clr-white);
    border: 1px solid var(--clr-border-light);
    font-size: var(--fs-sm);
    transition:
      border var(--transition-fast),
      box-shadow var(--transition-fast);

    &:focus {
      outline: none;
      border-color: var(--clr-accent);
      box-shadow: 0 0 0 3px var(--clr-accent-glow);
    }
  }
}

.cs-promo-btn {
  padding: 0 1.25rem;
  border-radius: var(--radius-md);
  background: var(--clr-accent);
  color: #fff;
  border: none;
  font-weight: 600;
  cursor: pointer;

  /* ВАЖЛИВО: без transform */
  &:hover {
    background: var(--clr-accent-hover);
  }
}

/* Total block */
.cs-total-block {
  margin-top: var(--space-3);
  padding: var(--space-3);
  background: var(--clr-white-85);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: var(--shadow-soft);
}

.cs-total-line {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.cs-total-label {
  font-size: var(--fs-sm);
  font-weight: 500;
  color: var(--clr-text-deep);
}

.cs-total-value {
  font-size: var(--fs-lg);
  font-weight: 700;
  color: var(--clr-text-deep);
}

.cs-total-note {
  margin-top: 0.25rem;
  font-size: var(--fs-xs);
  color: var(--clr-text-light);
}
</style>
