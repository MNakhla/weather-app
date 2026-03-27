<template>
  <div class="bg-amber-300 absolute top-0 left-0 z-50 w-full">
    <v-alert v-model="alert" border="start" close-label="Close Alert" color="blue-darken-3" border-color="white"
      title="Weather Summary!" variant="tonal" closable>
      Warmest day: {{ warmestDay.date }} ({{ warmestDay.high }} °{{ unitLocalStorage }})
    </v-alert>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { DailyForecastItem, HourlyForecastItem } from '@/types/weather';
import { unitKeyLS } from '@/constants/localStorage';

// const rainNext12Hrs = ref<boolean>(false)

const props = defineProps<{
  hourlyForecast: HourlyForecastItem[]
  dailyForecast: DailyForecastItem[]
}>()

const warmestDay = computed(() =>
  props.dailyForecast.reduce((max, item) =>
    item.high > max.high ? item : max
    , props.dailyForecast[0])
)

// watch(()=>props.hourlyForecast, (newVal) => {
//   rainNext12Hrs.value = newVal.slice(0, 5).some((hr) =>
//     hr.humidity > 70)
// })

const unitLocalStorage = localStorage.getItem(unitKeyLS)

const alert = ref<boolean>(true)
</script>
