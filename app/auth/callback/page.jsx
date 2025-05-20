'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // обмен токена на сессию и редирект
    supabase.auth
      .exchangeCodeForSession({})
      .finally(() => router.replace('/dashboard'));
  }, []);

  return <p className="p-4 text-center">Signing you in…</p>;
}
