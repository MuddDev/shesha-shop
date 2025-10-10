<script setup>
import promoData from '@/data/promo-showcase.json'

const data = promoData
</script>

<template>
  <section class="promo-showcase">
    <div class="container--full">
      <div class="promo-showcase__grid">
        <div class="promo-showcase__item promo-showcase__item--large">
          <img
            :src="data.left.image"
            :alt="data.left.alt"
          />
          <div class="promo-showcase__overlay">
            <div
              v-if="data.left.badge"
              class="promo-showcase__badge"
            >
              {{ data.left.badge }}
            </div>
            <div class="promo-showcase__content">
              <h2>{{ data.left.title }}</h2>
              <p>{{ data.left.text }}</p>
              <a
                :href="data.left.link"
                class="promo-showcase__btn"
                >{{ data.left.cta }}</a
              >
            </div>
          </div>
        </div>

        <div class="promo-showcase__col">
          <div class="promo-showcase__item promo-showcase__item--medium">
            <img
              :src="data.centerLarge.image"
              :alt="data.centerLarge.title"
            />
            <div class="promo-showcase__overlay">
              <div
                v-if="data.centerLarge.badge"
                class="promo-showcase__badge"
              >
                {{ data.centerLarge.badge }}
              </div>
              <div
                v-if="data.centerLarge.tag"
                class="promo-showcase__tag"
              >
                {{ data.centerLarge.tag }}
              </div>
              <div class="promo-showcase__content">
                <h2>{{ data.centerLarge.title }}</h2>
                <a
                  :href="data.centerLarge.link"
                  class="promo-showcase__btn"
                  >{{ data.centerLarge.cta }}</a
                >
              </div>
            </div>
          </div>

          <div class="promo-showcase__small-grid">
            <div
              v-for="(item, i) in data.centerSmall"
              :key="'centerSmall-' + i"
              class="promo-showcase__item promo-showcase__item--small"
            >
              <img
                :src="item.image"
                :alt="item.title"
              />
              <div class="promo-showcase__overlay">
                <div class="promo-showcase__content">
                  <h3>{{ item.title }}</h3>
                  <a
                    :href="item.link"
                    class="promo-showcase__btn"
                    >{{ item.cta }}</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="promo-showcase__col">
          <div class="promo-showcase__small-grid">
            <div
              v-for="(item, i) in data.rightSmall"
              :key="'rightSmall-' + i"
              class="promo-showcase__item promo-showcase__item--small"
            >
              <img
                :src="item.image"
                :alt="item.title"
              />
              <div class="promo-showcase__overlay">
                <div class="promo-showcase__content">
                  <h3>{{ item.title }}</h3>
                  <a
                    :href="item.link"
                    class="promo-showcase__btn"
                    >{{ item.cta }}</a
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="promo-showcase__item promo-showcase__item--medium">
            <img
              :src="data.rightLarge.image"
              :alt="data.rightLarge.title"
            />
            <div class="promo-showcase__overlay">
              <div
                v-if="data.rightLarge.badge"
                class="promo-showcase__badge"
              >
                {{ data.rightLarge.badge }}
              </div>
              <div
                v-if="data.rightLarge.tag"
                class="promo-showcase__tag"
              >
                {{ data.rightLarge.tag }}
              </div>
              <div class="promo-showcase__content">
                <h2>{{ data.rightLarge.title }}</h2>
                <a
                  :href="data.rightLarge.link"
                  class="promo-showcase__btn"
                  >{{ data.rightLarge.cta }}</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
