import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Victoria Villano Real Estate',
  description: 'Your trusted partner in real estate',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} font-sans`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
} 