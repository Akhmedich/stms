'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSupabase } from '@/components/providers/SupabaseProvider'

export function useTripsQuery(initialData) {
  const supabase = useSupabase()
  const qc = useQueryClient()

  useQuery({
    queryKey: ['trips'],
    queryFn: async () =>
      (await supabase.from('trips').select('*').limit(5000)).data,
    initialData,
  })

  // realtime
  supabase
    .channel('trips')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'trips' },
      payload => {
        qc.setQueryData(['trips'], old =>
          old?.map(t => (t.trip_id === payload.new.trip_id ? payload.new : t))
        )
      }
    )
    .subscribe()

  return useQuery({ queryKey: ['trips'] })
}
