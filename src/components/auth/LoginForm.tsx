'use client'

import { useState } from 'react'
import { useSupabase } from '@/components/providers/SupabaseProvider'

export default function LoginForm() {
  const supabase = useSupabase()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (!error) setSent(true)
    else alert(error.message)
  }

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-2xl mb-4">Sign in</h1>
      {sent ? (
        <p>📧 Magic link sent! Check your email.</p>
      ) : (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-2 w-full mb-3"
            placeholder="your@email.com"
          />
          <button
            onClick={handleLogin}
            className="bg-black text-white px-4 py-2 w-full"
          >
            Send Magic Link
          </button>
        </>
      )}
    </div>
  )
}
