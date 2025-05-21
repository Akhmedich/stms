'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    // TODO: implement supabase session check
    router.replace('/dashboard')
  }, [router])

  return <p className="text-center mt-10">Logging in...</p>
}
