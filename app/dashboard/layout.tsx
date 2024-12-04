'use client'
import DashboardNavbar from '../components/dashboardnavbar'
import Sidebar from '../components/sidebar'
import { inter, interRegular } from '../fonts/fonts'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const handleFilterChange = (value: string) => {
    console.log(`Filter changed to: ${value}`)
  }

  return (
    <div
      className={`${inter.variable} ${interRegular.variable} antialiased w-full text-base flex`}
    >
      <Sidebar />
      <main className="flex-1 ml-16">
        <DashboardNavbar onFilterChange={handleFilterChange} />
        {children}
      </main>
    </div>
  )
}
