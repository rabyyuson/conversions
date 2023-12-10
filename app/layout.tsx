import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/ui/globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Unit Conversion Application',
  description: 'Temperature and Volumes unit converter',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='flex h-screen'>{children}</div>
      </body>
    </html>
  )
}
