<template>
  <div class="min-h-screen bg-linear-to-b from-blue-900 via-sky-400 via-75% to-[#EBEBEB] to-75% relative pb-8">
    <WeatherSearch v-model="selectedCity" :is-celsius="isCelsius" @toggle-celsius="isCelsius = !isCelsius" />

    <Navbar v-if="cities.length > 0" v-model="activeTabId" :cities="cities" :remove-city="removeCity" />
    
    <v-container max-width="900" class="mx-auto h-100 px-4 md:px-0 pt-0 pb-16 relative">
      <template v-if="cities.length > 0">
        <SummaryAlert v-if="!isFetching && !isPending && !errorMessage" :hourlyForecast="hourlyForecast" :dailyForecast="dailyForecast"/>
        <div class="weather-card overflow-hidden w-full">
          <v-card-text class="pa-0">
            <v-tabs-window v-model="activeTabId" class="pa-6 sm:pa-8 min-h-[400px]">
              <v-tabs-window-item v-for="city in cities" :key="city.city_id" :value="city.city_id">
                <div class="pa-0">
                  <div v-if="isPending || isFetching" class="flex items-center justify-center min-h-[400px]">
                    <v-progress-circular indeterminate size="42" />
                  </div>

                  <v-alert v-else-if="errorMessage" type="error" variant="tonal" class="mb-6">
                    {{ errorMessage }}
                  </v-alert>

                  <template v-else>
                    <HourlyForecast :forecast="hourlyForecast" />
                    <DailyForecast :forecast="dailyForecast" />
                  </template>
                </div>
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>
        </div>

        <div
          class="fixed bottom-0 left-0 w-full bg-[#106EBE] py-1 pr-4 text-right text-white text-xs opacity-90 font-medium z-10">
          Last updated on {{ lastUpdatedText || '—' }}.
        </div>
      </template>
      <template v-else>
        <Welcome />
      </template>
      </v-container>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useWeather } from '../composables/useWeather'
import SummaryAlert from './SummaryAlert.vue'
import Navbar from './Navbar.vue'
import WeatherSearch from './WeatherSearch.vue'
import HourlyForecast from './HourlyForecast.vue'
import DailyForecast from './DailyForecast.vue'
import type { City } from '../types/weather'
import { citiesKeyLS, unitKeyLS } from '@/constants/localStorage'
import Welcome from './Welcome.vue'

const citiesLocalStorage = localStorage.getItem(citiesKeyLS)

const initialCities: City[] = citiesLocalStorage == null ? [
  {
    city_id: 1796236,
    city_name: 'BEIJING',
    state_code: '22',
    country_code: 'CN',
    country_full: 'China',
    lat: 39.9075,
    lon: 116.39723
  },
  {
    city_id: 3451190,
    city_name: 'RIO DE JANEIRO',
    state_code: '21',
    country_code: 'BR',
    country_full: 'Brazil',
    lat: -22.90642,
    lon: -43.18223
  },
  {
    city_id: 5368361,
    city_name: 'LOS ANGELES',
    state_code: 'CA',
    country_code: 'US',
    country_full: 'United States',
    lat: 34.05223,
    lon: -118.24368
  }
] : JSON.parse(citiesLocalStorage)

const cities = ref<City[]>(initialCities)
const activeTabId = ref<number|null>(cities.value[0]?.city_id?? null)
const selectedCity = ref<City | null>(null)
const isCelsius = ref(localStorage.getItem(unitKeyLS) !== 'F')

watch(isCelsius, (val) => {
  localStorage.setItem(unitKeyLS, val ? 'C' : 'F')
})

const removeCity = (cityId: number) => {
  cities.value = cities.value.filter(city => city.city_id !== cityId)
  localStorage.setItem(citiesKeyLS, JSON.stringify(cities.value))
  if (activeTabId.value === cityId && cities.value[0]) {
    activeTabId.value = cities.value[0].city_id
  }
}

const activeCity = computed(
  () => cities.value.find(city => city.city_id === activeTabId.value) ?? cities.value[0]
)

const {
  isPending,
  errorMessage,
  hourlyForecast,
  dailyForecast,
  lastUpdatedText,
  isFetching,
} = useWeather(activeCity, isCelsius)

watch(selectedCity, (newCity) => {
  if (!newCity) return

  const exists = cities.value.some(city => city.city_id === newCity.city_id)

  if (!exists) {
    cities.value.push(newCity)
    localStorage.setItem(citiesKeyLS, JSON.stringify(cities.value))
  }

  activeTabId.value = newCity.city_id
  selectedCity.value = null
})
</script>

<style scoped>
:deep(.v-tabs .v-slide-group__content) {
  justify-content: center !important;
}
</style>