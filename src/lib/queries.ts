import { createClient } from '@/lib/supabase-client'

// Тип записи (совпадает с columns.ts)
export type TripRow = {
  trip_id: number
  start: string
  origin: string
  direction: string
  ez_number: string
  team_id: number | null
  status: string
}

const MOCK_CACHE: TripRow[] = Array.from({ length: 50 }, (_, i) => ({
  trip_id: i + 1,
  start: '2025-05-21',
  origin: 'DAL',
  direction: 'ATL',
  ez_number: `00${1234 + i}`.slice(-6), // 6-цифровой
  team_id: null,
  status: 'Planned',
}))


export async function fetchTripsSSR({
  limit = 100,
} = {}): Promise<TripRow[]> {
  // локальный тумблер
  if (process.env.NEXT_PUBLIC_USE_MOCK === 'true') return MOCK_CACHE

  const sb = createClient()
// src/lib/queries.ts
const { data, error } = await sb
  .from('trips')
  .select('*')      // ← без .order() и без alias
  .limit(limit)


  if (error) {
    console.error('Supabase fetch error:', error)
    return []
  }
  return (data as TripRow[]) ?? []
}
