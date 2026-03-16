import type { City } from '../types/weather'

export async function parseCitiesCsv(): Promise<City[]> {
  try {
    const response = await fetch('/cities_20000.csv')
    if (!response.ok) throw new Error('Failed to fetch cities CSV')

    const text = await response.text()
    const lines = text.split('\n')

    const cities: City[] = []

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      const parts = line.split(',')
      if (parts.length < 7) continue

      cities.push({
        city_id: parseInt(parts[0]),
        city_name: parts[1],
        state_code: parts[2],
        country_code: parts[3],
        country_full: parts[4],
        lat: parseFloat(parts[5]),
        lon: parseFloat(parts[6])
      })
    }

    return cities
  } catch (error) {
    console.error('CSV Parsing Error:', error)
    return []
  }
}
