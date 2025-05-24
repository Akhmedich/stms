// src/lib/supabase-server.ts

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Типизируй под свои нужды, если нужно!
export function createClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key: string) => cookies().get(key)?.value,
      },
    }
  );
}
