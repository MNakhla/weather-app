<template>
  <v-card class="bg-white max-h-90 md:max-h-110 flex flex-col" elevation="2">
    <v-card-title
      class="text-h5 font-weight-regular text-black px-6 pt-6 pb-2 border-b border-gray-100 shrink-0"
    >
      Next 5 days
    </v-card-title>

    <v-card-text class="pa-0 grow overflow-y-auto">
      <div class="flex flex-col mb-4 divide-y divide-gray-100">
        <div
          v-for="day in forecast"
          :key="day.date"
          class="flex items-center justify-between py-5 px-6"
        >
          <div class="w-1/4 flex justify-start">
            <img :src="day.icon" alt="" class="w-[56px] h-[56px]" />
          </div>

          <div class="flex flex-col items-center justify-center w-2/4">
            <span class="text-lg font-bold text-black">{{ day.date }}</span>
            <span class="text-sm text-gray-400 mt-1 text-center">
              {{ day.comment }}
            </span>
          </div>

          <div class="flex items-center justify-end gap-3 w-1/4">
            <span class="text-xl font-bold text-black">{{ day.high }}°</span>
            <span class="text-xl font-medium text-black">{{ day.low }}°</span>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { DailyForecastItem } from '../types/weather'

defineProps<{
  forecast: DailyForecastItem[]
}>()
</script>

<style scoped>
.overflow-y-auto::-webkit-scrollbar {
  display: none;
}
</style>
