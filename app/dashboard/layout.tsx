'use client'

import { createContext, useState, useEffect, ReactNode } from 'react'
import DashboardNavbar from '../components/dashboardnavbar'
import Sidebar from '../components/sidebar'
import { inter, interRegular } from '../fonts/fonts'
import { TableRow } from '../lib/validation'

export const TableDataContext = createContext<TableRow[]>([])

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [tableData, setTableData] = useState<TableRow[]>([])

  useEffect(() => {
    const loadTableData = () => {
      const storedData = localStorage.getItem('tableData')
      if (storedData) {
        const parsedData: TableRow[] = JSON.parse(storedData)
        setTableData(parsedData)
      }
    }
    loadTableData()
  }, [])

  const updateTables = (data: TableRow[]) => {
    setTableData(data)
  }

  return (
    <TableDataContext.Provider value={tableData}>
      <div
        className={`${inter.variable} ${interRegular.variable} antialiased w-full text-base flex`}
        suppressHydrationWarning
      >
        <Sidebar />
        <main className="flex-1 ml-16">
          <DashboardNavbar updateTables={updateTables} />
          {children}
        </main>
      </div>
    </TableDataContext.Provider>
  )
}
