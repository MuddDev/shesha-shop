<script setup>
import { ref, watch } from 'vue'
import ds from '~/data/delivery-selector.json'

const config = useRuntimeConfig()


const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      method: 'nova-poshta',
      city: '',
      cityRef: null,
      branch: '',
      index: '',
      address: ''
    })
  }
})

const emit = defineEmits(['update:modelValue'])
const local = ref({ ...props.modelValue })

watch(
  () => props.modelValue,
  v => {
    local.value = { ...v }
  }
)

watch(
  local,
  v => {
    emit('update:modelValue', v)
  },
  { deep: true }
)

const citySuggestions = ref([])
const branches = ref([])
const loadingCities = ref(false)
const loadingBranches = ref(false)
const error = ref(null)
let cityTimeout = null
const isSelectingCity = ref(false)

// ⭐ Вибір міста
const selectCity = item => {
  isSelectingCity.value = true

  local.value.city = item.name
  local.value.cityRef = item.ref

  citySuggestions.value = []
  branches.value = []

  loadNovaPoshtaBranches()

  setTimeout(() => {
    isSelectingCity.value = false
  }, 200)
}

// === DEBOUNCE search (єдиний правильний watch)
watch(
  () => local.value.city,
  () => {
    if (isSelectingCity.value) return

    clearTimeout(cityTimeout)
    cityTimeout = setTimeout(searchNovaPoshtaCities, 350)
  }
)

// ⭐ Пошук міст НП
const searchNovaPoshtaCities = async () => {
  const query = local.value.city.trim()
  if (query.length < 2) {
    citySuggestions.value = []
    local.value.cityRef = null
    branches.value = []
    return
  }

  loadingCities.value = true
  error.value = null

  try {
    const res = await $fetch('/api/np/cities', {
      method: 'POST',
      body: { query }
    })

    const list = res?.data?.[0]?.Addresses || []

    citySuggestions.value = list.map(a => ({
      name: a.Present,
      ref: a.DeliveryCity
    }))
  } catch (e) {
    error.value = 'Помилка завантаження міст'
  } finally {
    loadingCities.value = false
  }
}

// ⭐ Відділення НП
const loadNovaPoshtaBranches = async () => {
  if (!local.value.cityRef) return

  loadingBranches.value = true
  error.value = null

  try {
    const res = await $fetch('/api/np/warehouses', {
      method: 'POST',
      body: { cityRef: local.value.cityRef }
    })

    branches.value = res?.data?.map(w => w.Description) || []
  } catch (e) {
    error.value = 'Помилка завантаження відділень'
  } finally {
    loadingBranches.value = false
  }
}

// Watch NP method change
watch(
  () => local.value.method,
  m => {
    local.value.branch = ''
    branches.value = []

    if (m === 'nova-poshta' && local.value.cityRef) loadNovaPoshtaBranches()
  }
)

// ⭐ Укрпошта — відділення через backend API
const loadUkrposhtaBranches = async () => {
  if (!local.value.city) return

  loadingBranches.value = true
  error.value = null

  try {
    const res = await $fetch('/api/ukrposhta/branches', {
      method: 'POST',
      body: { city: local.value.city }
    })

    branches.value = res?.offices?.map(o => o.address) || []
  } catch (e) {
    console.error(e)
    error.value = 'Помилка завантаження відділень Укрпошти'
  } finally {
    loadingBranches.value = false
  }
}

watch(
  () => local.value.method,
  m => {
    local.value.branch = ''
    branches.value = []

    if (m === 'nova-poshta' && local.value.cityRef) {
      loadNovaPoshtaBranches()
    }

    if (m === 'ukrposhta' && local.value.city) {
      loadUkrposhtaBranches()
    }
  }
)
</script>
<template>
  <div class="delivery">
    <!-- СПОСІБ ДОСТАВКИ -->
    <div class="delivery__block">
      <h3 class="delivery__title">{{ ds.section.deliveryMethod }}</h3>

      <div class="delivery__options">
        <label
          class="delivery__option"
          :class="{ active: local.method === 'nova-poshta' }"
        >
          <input
            type="radio"
            value="nova-poshta"
            v-model="local.method"
          />
          <div class="delivery__icon">📦</div>
          <div class="delivery__info">
            <span>Нова Пошта</span>
            <small>Доставка у відділення</small>
          </div>
        </label>

        <label
          class="delivery__option"
          :class="{ active: local.method === 'ukrposhta' }"
        >
          <input
            type="radio"
            value="ukrposhta"
            v-model="local.method"
          />
          <div class="delivery__icon">📮</div>
          <div class="delivery__info">
            <span>Укрпошта</span>
            <small>Дешевше, але довше</small>
          </div>
        </label>

        <label
          class="delivery__option"
          :class="{ active: local.method === 'pickup' }"
        >
          <input
            type="radio"
            value="pickup"
            v-model="local.method"
          />
          <div class="delivery__icon">🏬</div>
          <div class="delivery__info">
            <span>Самовивіз</span>
            <small>Центральний склад Хмельницького</small>
          </div>
        </label>
      </div>
    </div>
    <!-- МІСТО -->
    <div class="delivery__block">
      <h3 class="delivery__title">Місто доставки</h3>

      <input
        v-model="local.city"
        type="text"
        placeholder="Почніть вводити назву міста"
        class="delivery__input"
      />

      <div
        v-if="loadingCities"
        class="delivery__loading"
      >
        Завантаження...
      </div>

      <!-- Autocomplete -->
      <ul
        v-if="citySuggestions.length"
        class="delivery__autocomplete"
      >
        <li
          v-for="item in citySuggestions"
          :key="item.ref"
          @click="selectCity(item)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>

    <!-- ВІДДІЛЕННЯ -->
    <div
      class="delivery__block"
      v-if="
        (local.method === 'nova-poshta' && local.cityRef) ||
        (local.method === 'ukrposhta' && local.city)
      "
    >
      <h3 class="delivery__title">Відділення</h3>

      <div
        v-if="loadingBranches"
        class="delivery__loading"
      >
        Завантаження відділень...
      </div>

      <select
        v-model="local.branch"
        class="delivery__input"
      >
        <option
          disabled
          value=""
        >
          Оберіть відділення
        </option>
        <option
          v-for="b in branches"
          :key="b"
          :value="b"
        >
          {{ b }}
        </option>
      </select>

      <input
        v-if="local.method === 'ukrposhta'"
        v-model="local.index"
        type="text"
        class="delivery__input"
        placeholder="Поштовий індекс"
      />
    </div>

    <!-- АДРЕСА -->
    <div class="delivery__block">
      <h3 class="delivery__title">Адреса (необовʼязково)</h3>
      <input
        v-model="local.address"
        type="text"
        class="delivery__input"
        placeholder="Вулиця, будинок, квартира"
      />
    </div>

    <p
      v-if="error"
      class="delivery__error"
    >
      {{ error }}
    </p>
  </div>
</template>