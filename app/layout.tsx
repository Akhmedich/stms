import './globals.css'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { SupabaseProvider } from '@/components/providers/SupabaseProvider'

export const metadata: Metadata = {
  title: 'Supreme TMS',
  description: 'OTR trucking system',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <SupabaseProvider>
          {children}
        </SupabaseProvider>
      </body>
    </html>
  )
}
