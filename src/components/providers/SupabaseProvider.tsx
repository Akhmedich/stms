'use client'

import { createContext, useContext } from 'react'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

const SupabaseContext = createContext<SupabaseClient<Database> | null>(null)

export const SupabaseProvider = ({
  children,
  client,
}: {
  children: React.ReactNode
  client: SupabaseClient<Database>
}) => {
  return (
    <SupabaseContext.Provider value={client}>
      {children}
    </SupabaseContext.Provider>
  )
}

export const useSupabase = () => {
  const client = useContext(SupabaseContext)
  if (!client) throw new Error('SupabaseProvider missing in tree')
  return client
}
