import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mini Waitlist',
  description: 'Created with ❤️ by Rek3000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
