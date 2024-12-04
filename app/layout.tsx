'use client'
import './globals.css'
import Navbar from './components/navbar'
import Footer from './components/footer'
import { inter, interRegular } from './fonts/fonts'
import { usePathname } from 'next/navigation'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  const isDashboardRoute = pathname?.startsWith('/dashboard')

  return (
    <html lang="ru">
      <body
        className={`${inter.variable} ${interRegular.variable} antialiased w-full text-base overflow-x-hidden`}
      >
        {!isDashboardRoute && <Navbar />}
        {children}
        {!isDashboardRoute && <Footer />}
      </body>
    </html>
  )
}
