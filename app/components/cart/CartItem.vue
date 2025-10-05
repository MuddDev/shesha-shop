<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['remove', 'updateQuantity'])
</script>

<template>
  <div class="cart-item">
    <div class="cart-item__image">
      <NuxtImg
        :src="item.image"
        :alt="item.title"
        width="80"
        height="100"
        loading="lazy"
      />
    </div>

    <div class="cart-item__details">
      <h4 class="cart-item__title">{{ item.title }}</h4>
      <p
        class="cart-item__variant"
        v-if="item.variant"
      >
        {{ item.variant }}
      </p>

      <div class="cart-item__price-qty">
        <div class="cart-item__qty">
          <button
            class="cart-item__qty-btn"
            @click="emit('updateQuantity', { id: item.id, change: -1 })"
          >
            –
          </button>
          <span>{{ item.quantity }}</span>
          <button
            class="cart-item__qty-btn"
            @click="emit('updateQuantity', { id: item.id, change: 1 })"
          >
            +
          </button>
        </div>

        <span class="cart-item__price">{{ item.price }} ₴</span>
      </div>
    </div>

    <button
      class="cart-item__remove"
      @click="emit('remove', item.id)"
      aria-label="Видалити товар"
    >
      <span class="material-icons">close</span>
    </button>
  </div>
</template>
