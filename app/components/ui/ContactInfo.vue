<script setup>
const phone = '+38(066) 25-43-796'
</script>

<template>
  <div class="contact-info">
    <a
      :href="`tel:${phone.replace(/\s+/g, '')}`"
      class="contact-info__phone"
    >
      <Icon
        name="mdi:phone"
        size="1.2rem"
        mode="svg"
        style="color: white"
      />
      {{ phone }}
    </a>
  </div>
</template>
