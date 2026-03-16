import { computed, type Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { weatherService } from '../services/weatherService'
import type { HourlyForecastItem, DailyForecastItem, City } from '../types/weather'

function formatHour(unix: number) {
  return new Date(unix * 1000)
    .toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true
    })
    .toLowerCase()
}

function formatDay(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })
}

function formatUpdated(date: Date) {
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

export function useWeather(city: Ref<City | null>) {
  const weatherQuery = useQuery({
    queryKey: computed(() => ['weather', city.value?.lat, city.value?.lon]),
    queryFn: () => {
      if (!city.value) throw new Error('No city selected')
      return weatherService.fetchWeatherByCoords(city.value.lat, city.value.lon)
    },
    enabled: computed(() => !!city.value),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    retry: 1
  })

  const hourlyForecast = computed((): HourlyForecastItem[] => {
    const data = weatherQuery.data.value
    if (!data) return []

    return data.list.slice(0, 12).map((item) => ({
      time: formatHour(item.dt),
      temp: Math.round(item.main.temp),
      humidity: item.main.humidity,
      icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
    }))
  })

  const dailyForecast = computed((): DailyForecastItem[] => {
    const data = weatherQuery.data.value
    if (!data) return []

    const grouped = new Map<
      string,
      {
        temps: number[]
        icon: string
        comment: string
        middayDiff: number
      }
    >()

    for (const item of data.list) {
      const dateKey = item.dt_txt.split(' ')[0]
      const hour = Number(item.dt_txt.split(' ')[1].split(':')[0])
      const diffFromMidday = Math.abs(hour - 12)

      if (!grouped.has(dateKey)) {
        grouped.set(dateKey, {
          temps: [item.main.temp],
          icon: item.weather[0].icon,
          comment: item.weather[0].description,
          middayDiff: diffFromMidday
        })
        continue
      }

      const existing = grouped.get(dateKey)!
      existing.temps.push(item.main.temp)

      if (diffFromMidday < existing.middayDiff) {
        existing.icon = item.weather[0].icon
        existing.comment = item.weather[0].description
        existing.middayDiff = diffFromMidday
      }
    }

    return Array.from(grouped.entries())
      .slice(0, 5)
      .map(([date, value]) => ({
        date: formatDay(date),
        high: Math.round(Math.max(...value.temps)),
        low: Math.round(Math.min(...value.temps)),
        icon: `https://openweathermap.org/img/wn/${value.icon}@2x.png`,
        comment: value.comment
      }))
  })

  const lastUpdatedText = computed(() => {
    const updatedAt = weatherQuery.dataUpdatedAt.value
    return updatedAt ? formatUpdated(new Date(updatedAt)) : ''
  })

  return {
    isFetching: weatherQuery.isFetching,
    isPending: weatherQuery.isPending,
    errorMessage: computed(() => {
      const err = weatherQuery.error.value
      return err instanceof Error ? err.message : ''
    }),
    hourlyForecast,
    dailyForecast,
    lastUpdatedText
  }
}
