<template>
  <div class="bg-[#106EBE] px-4 pt-4 pb-3 shadow-md w-full">
    <v-container max-width="900" class="mx-auto px-0 py-0">
      <v-row no-gutters>
        <v-col cols="6" class="flex text-left items-center">
          <h1 class="text-[26px] font-medium tracking-wide text-white">Simple Weather</h1>
        </v-col>
        <v-col cols="6" class="flex justify-end items-center pr-2 gap-2">
          <v-btn
            icon="mdi-refresh"
            variant="text"
            color="white"
            density="comfortable"
            @click="handleRefresh"
            title="Refresh Weather"
          ></v-btn>
          <v-autocomplete
            v-model="internalSelection"
            v-model:search="searchInternal"
            :items="filteredCities"
            item-title="city_name"
            item-value="city_id"
            append-inner-icon="mdi-magnify"
            menu-icon=""
            placeholder="Search City ..."
            variant="underlined"
            bg-color="transparent"
            color="white"
            base-color="white"
            hide-details
            density="compact"
            class="custom-search"
            :loading="loading"
            return-object
            @click:append-inner="handleSearch"
            @keyup.enter="handleSearch"
            :menu-props="{ maxHeight: 300, contentClass: 'city-dropdown-menu' }"
          >
            <template v-slot:no-data>
              <div v-if="searchInternal && searchInternal.length < 3" class="v-autocomplete__no-data">
                Type 3 or more characters...
              </div>
              <div v-else-if="searchInternal" class="v-autocomplete__no-data">
                No results found
              </div>
            </template>
            <template v-slot:item="{ props, item }">
              <v-list-item
                v-bind="props"
                :title="(item as City).city_name"
                :subtitle="`${(item as City).country_full} (${(item as City).country_code})`"
              ></v-list-item>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useQueryClient } from '@tanstack/vue-query'
import { parseCitiesCsv } from '../utils/csvParser'
import type { City } from '../types/weather'

const props = defineProps<{
  modelValue: City | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: City | null): void
}>()

const cities = ref<City[]>([])
const loading = ref(false)
const searchInternal = ref('')
const internalSelection = ref<City | null>(null)

const queryClient = useQueryClient()

const handleRefresh = async () => {
  await queryClient.invalidateQueries({ queryKey: ['weather'] })
}

const filteredCities = computed(() => {
  const query = searchInternal.value?.toLowerCase()
  if (!query || query.length < 3) return []
  
  const filtered = []
  for (const city of cities.value) {
    if (city.city_name.toLowerCase().startsWith(query)) {
      filtered.push(city)
      if (filtered.length >= 100) break
    }
  }
  return filtered
})

onMounted(async () => {
  loading.value = true
  cities.value = await parseCitiesCsv()
  loading.value = false
})

watch(() => props.modelValue, (newVal) => {
  if (newVal === null) {
    internalSelection.value = null
    searchInternal.value = ''
  }
})

const handleSearch = () => {
  const cityToSelect = internalSelection.value || (filteredCities.value.length > 0 ? filteredCities.value[0] : null)
  
  if (cityToSelect) {
    emit('update:modelValue', cityToSelect)
    
    internalSelection.value = null
    searchInternal.value = ''
  }
}
</script>

<style scoped>
:deep(.v-autocomplete .v-field__input) {
  padding-left: 0;
  padding-right: 0;
  color: white !important;
  min-height: auto;
}

:deep(.v-field__append-inner) {
  padding-right: 0;
}

:deep(.v-field__append-inner .v-icon) {
  color: #FFFFFF !important;
  opacity: 1 !important;
  filter: none !important;
}

:deep(.v-field__placeholder) {
  color: rgba(255, 255, 255, 0.7) !important;
}
</style>

<style>
.city-dropdown-menu {
  background-color: white !important;
  color: #333 !important;
  border-radius: 4px;
}

.city-dropdown-menu .v-list-item-title {
  color: #000 !important;
  font-weight: 500;
}

.city-dropdown-menu .v-list-item-subtitle {
  color: #666 !important;
}

.city-dropdown-menu .v-autocomplete__no-data {
  color: #666 !important;
  padding: 8px 16px;
  font-size: 0.875rem;
}

.v-field__field {
  align-items: center;
}
</style>
