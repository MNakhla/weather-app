import { z } from 'zod'

export const ForecastItemSchema = z.object({
  dt: z.number(),
  dt_txt: z.string(),
  main: z.object({
    temp: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
    humidity: z.number()
  }),
  weather: z
    .array(
      z.object({
        description: z.string(),
        icon: z.string()
      })
    )
    .min(1)
})

export const ForecastResponseSchema = z.object({
  list: z.array(ForecastItemSchema)
})

export type ForecastItem = z.infer<typeof ForecastItemSchema>
export type ForecastResponse = z.infer<typeof ForecastResponseSchema>

export interface HourlyForecastItem {
  time: string
  temp: number
  humidity: number
  icon: string
}

export interface DailyForecastItem {
  date: string
  high: number
  low: number
  icon: string
  comment: string
}

export interface City {
  city_id: number
  city_name: string
  state_code: string
  country_code: string
  country_full: string
  lat: number
  lon: number
}
