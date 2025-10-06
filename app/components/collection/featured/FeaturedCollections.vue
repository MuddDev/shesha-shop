<script setup>
import { ref, onMounted } from 'vue'
import { useCollections } from '@/composables/useCollections'

const props = defineProps({
  handles: {
    type: Array,
    required: true
  }
})

const collections = ref([])

onMounted(async () => {
  collections.value = await useCollections(props.handles)
})
</script>

<template>
  <div
    class="featured-inner"
    v-if="collections.length"
  >
    <div class="container--full">
      <div class="featured-inner__lists">
        <ul>
          <li
            v-for="collection in collections"
            :key="collection.id"
          >
            <NuxtLink :to="`/collections/${collection.handle}`">
              <div class="image-wrapper">
                <img
                  :src="collection.image?.url"
                  :alt="collection.title"
                />
              </div>

              <p>{{ collection.title }}</p>
            </NuxtLink>
          </li>
          <li class="featured-inner__more">
            <NuxtLink to="/collections/all">Більше...</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div
    v-else
    class="featured-inner__loading container--full"
  >
    <p>Завантаження колекцій...</p>
  </div>
</template>

<style lang="scss" scoped>
.featured-inner {
  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    text-align: center;
    background: #fafafa;
    color: #555;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    p {
      margin: 0;
      padding: 1rem 2rem;
      background: #fff;
      border: 1px solid #eee;
      border-radius: 0.5rem;
    }
  }

  &__lists {
    ul {
      padding: var(--space-4);
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
      gap: 1rem;
      list-style: none;
      margin: 0;
      align-items: start;
      justify-content: center;
    }

    li {
      text-align: center;

      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.6rem;
        text-decoration: none;
        color: #111;
      }

      .image-wrapper {
        position: relative;
        width: 100%;
        padding-top: 100%;
        background: #f8f8f8;
      }

      .image-wrapper img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        max-height: 100%;
        object-fit: cover;
      }

      p {
        font-size: 0.95rem;
        font-weight: 500;
        line-height: 1.2;
        margin: 0;
      }
    }

    .featured-inner__more {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      height: 85%;
      border: 1px solid;
      a {
        color: var(--clr-accent);
        font-weight: 600;
        text-align: center;
        line-height: 1.2;
      }
    }
  }

  @media (max-width: 1024px) {
    &__lists ul {
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 0.8rem;
      padding: 0 1.5rem;
    }

    &__lists li p {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 600px) {
    &__lists ul {
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
      gap: 0.6rem;
      padding: 0 1rem;
    }

    &__lists li p {
      font-size: 0.8rem;
    }
  }
}
</style>
