import './globals.css'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { SupabaseProvider } from '@/components/providers/SupabaseProvider'
import Sidebar from '@/components/layout/Sidebar' // добавь импорт

export const metadata: Metadata = {
  title: 'Supreme TMS',
  description: 'OTR trucking system',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <SupabaseProvider>
          <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1">{children}</main>
          </div>
        </SupabaseProvider>
      </body>
    </html>
  )
}
