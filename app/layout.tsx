import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/ui/globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Conversions',
  description: 'Unit conversion application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='flex h-full min-h-screen'>{children}</div>
      </body>
    </html>
  )
}
