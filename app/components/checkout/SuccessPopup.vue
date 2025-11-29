<script setup>
import ds from '/data/success-popup.json'
defineProps({
  open: { type: Boolean, default: false }
})

defineEmits(['close'])
</script>

<template>
  <div
    class="success-popup"
    v-if="open"
  >
    <div class="success-popup__overlay"></div>

    <div class="success-popup__box">
      <h2>{{ ds.title }}</h2>
      <p>{{ ds.description }}</p>

      <div class="success-popup__actions">
        <NuxtLink
          :to="ds.actions.primary.link"
          class="sp-btn sp-btn--primary"
        >
          {{ ds.actions.primary.label }}
        </NuxtLink>

        <button
          class="sp-btn sp-btn--ghost"
          @click="$emit('close')"
        >
          {{ ds.actions.secondary.label }}
        </button>
      </div>
    </div>
  </div>
</template>
