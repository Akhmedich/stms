'use client'

import { createContext, useContext } from 'react'
import { createClient } from '@/lib/supabase-client'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

const SupabaseContext = createContext<SupabaseClient<Database> | null>(null)

export const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient() // клиент создаём прямо тут
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  )
}

export const useSupabase = () => {
  const client = useContext(SupabaseContext)
  if (!client) throw new Error('SupabaseProvider missing in tree')
  return client
}
