<template>
  <v-tabs
    v-model="activeTabId"
    bg-color="#f5f5f5"
    color="#000000"
    align-tabs="center"
    show-arrows
    class="nav-tabs text-body-2 font-weight-bold mb-2"
  >
    <v-tab
      v-for="city in cities"
      :key="city.city_id"
      :value="city.city_id"
      class="text-subtitle-1 font-weight-medium px-6 text-gray-500 transition-all font-inter"
      selected-class="text-black font-weight-bold underline-offset-4 !border-b-red-500 !border-b-2"
    >
    <span>{{ city.city_name }}</span>
    <v-icon icon="mdi-close" color="red" @click.stop="removeCity(city.city_id)" />
    </v-tab>
  </v-tabs>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { City } from '../types/weather'

interface Props {
  cities: City[]|null
  modelValue: number|null
  removeCity: (cityId: number) => void
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'remove-city'])

const activeTabId = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>
