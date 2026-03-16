import { ForecastResponseSchema, type ForecastResponse } from '../types/weather'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

async function fetchJson(url: string) {
  const response = await fetch(url)
  const json = await response.json()

  if (!response.ok) {
    throw new Error(json?.message || 'Request failed')
  }

  return json
}

export const weatherService = {
  async fetchWeatherByCoords(lat: number, lon: number): Promise<ForecastResponse> {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`

    const json = await fetchJson(url)
    const parsed = ForecastResponseSchema.safeParse(json)

    if (!parsed.success) {
      console.error('Zod Parse Error:', parsed.error)
      throw new Error('Invalid API response structure')
    }

    return parsed.data
  }
}
