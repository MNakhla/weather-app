<template>
  <v-card class="bg-white mb-6" elevation="2">
    <v-card-title
      class="text-h5 font-weight-regular text-black px-6 pt-6 pb-4 border-b border-gray-100 mb-6"
    >
      Next hours
    </v-card-title>

    <v-card-text class="pa-0">
      <div
        class="hourly-scroll flex overflow-x-auto px-4 pb-6 w-full snap-x divide-x divide-gray-100"
      >
        <div
          v-for="hour in forecast"
          :key="hour.time"
          class="flex flex-col items-center min-w-[90px] snap-center py-2"
        >
          <div class="text-xl font-medium text-black mb-2">{{ hour.temp }}°</div>
          <div class="text-sm text-cyan-500 font-medium mb-3">{{ hour.humidity }}%</div>
          <img :src="hour.icon" :alt="hour.time" class="w-12 h-12 mb-3" />
          <div class="text-sm font-medium text-gray-500">{{ hour.time }}</div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { HourlyForecastItem } from '../types/weather'

defineProps<{
  forecast: HourlyForecastItem[]
}>()
</script>

<style scoped>
.overflow-x-auto::-webkit-scrollbar {
  display: none;
}
</style>
