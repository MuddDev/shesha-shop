<script setup>
import contactsData from '~/data/contacts.json'
const contacts = contactsData.contacts
</script>

<template>
  <section class="contact-grid container">
    <div class="contact-grid__list">
      <div
        v-for="(item, i) in contacts"
        :key="i"
        class="contact-card"
      >
        <Icon
          :name="item.icon"
          size="2rem"
          mode="svg"
          class="contact-card__icon"
        />
        <div class="contact-card__content">
          <h3 class="contact-card__title">{{ item.title }}</h3>
          <a
            v-if="item.link"
            :href="item.link"
            target="_blank"
            rel="noopener"
            class="contact-card__value"
          >
            {{ item.value }}
          </a>
          <span
            v-else
            class="contact-card__value"
            >{{ item.value }}</span
          >
        </div>
      </div>
    </div>
  </section>
</template>
