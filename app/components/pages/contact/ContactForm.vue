<script setup>
import { useContactForm } from '~/composables/forms/useContactForm'

const { name, email, message, honeypot, status, loading, showPopup, errors, submitForm } =
  useContactForm()
</script>

<template>
  <section class="contact-form container">
    <h2 class="contact-form__title">Напишіть нам</h2>

    <form
      @submit.prevent="submitForm"
      class="contact-form__body"
    >
      <div class="field">
        <input
          v-model="name"
          type="text"
          placeholder="Ваше ім’я"
          :class="{ invalid: errors.name }"
        />
        <small
          v-if="errors.name"
          class="helper"
          >{{ errors.name }}</small
        >
      </div>

      <div class="field">
        <input
          v-model="email"
          type="email"
          placeholder="Ваш Email"
          :class="{ invalid: errors.email }"
        />
        <small
          v-if="errors.email"
          class="helper"
          >{{ errors.email }}</small
        >
      </div>

      <div class="field">
        <textarea
          v-model="message"
          placeholder="Ваше повідомлення"
          rows="5"
          :class="{ invalid: errors.message }"
        ></textarea>
        <small
          v-if="errors.message"
          class="helper"
          >{{ errors.message }}</small
        >
      </div>

      <input
        v-model="honeypot"
        type="text"
        tabindex="-1"
        autocomplete="off"
        class="contact-form__honeypot"
      />

      <button
        type="submit"
        class="contact-form__btn"
        :disabled="loading"
      >
        <span v-if="loading">Відправляємо...</span>
        <span v-else>Надіслати</span>
      </button>

      <p
        v-if="status === 'error'"
        class="contact-form__status error"
      >
        ❌ Помилка при надсиланні. Спробуйте ще раз.
      </p>
    </form>

    <transition name="popup">
      <div
        v-if="showPopup"
        class="popup-success"
      >
        <Icon
          name="mdi:check-circle"
          size="2rem"
          class="popup-icon"
        />
        <p>✅ Повідомлення успішно надіслано!</p>
      </div>
    </transition>
  </section>
</template>
