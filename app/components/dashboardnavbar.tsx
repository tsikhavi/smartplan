'use client'
import Link from 'next/link'
import Image from 'next/image'
import { DateRangeInput } from './daterangeinput'
import SelectWithIcon from './start/selectwithicon'
import { useState } from 'react'

export default function DashboardNavbar() {
  // State to store the selected date range
  const [dateRange, setDateRange] = useState({ from: '', to: '' })

  // Function to handle date range change
  const handleDateChange = (range: { from: string; to: string }) => {
    setDateRange(range)
    // Fetch or re-fetch data using the selected date range
    fetchData(range)
  }

  // Fetch or re-fetch data (placeholder implementation)
  const fetchData = async (range: { from: string; to: string }) => {
    try {
      const response = await fetch(
        `/api/data?from=${range.from}&to=${range.to}`
      )
      const data = await response.json()
      console.log('Fetched data:', data)
      // Update your tables, charts, or curves with the new data
      updateTables(data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  // Function to update tables (placeholder)
  const updateTables = (data: any[]) => {
    // Logic to update tables or other UI components
    console.log('Update tables with:', data)
  }

  return (
    <header className="bg-[#404950] px-2">
      <div className="mx-auto flex h-8 w-full items-center justify-between">
        {/* Left Section: User Info */}
        <div className="flex items-center">
          <p className="text-xs text-white mx-2">Магазин</p>
          <SelectWithIcon
            id="shop"
            name="shop"
            options={['Магазин мираж', 'Магазин продукты']}
          />
          <p className="text-xs text-white ml-8 mr-2">
            Период фактических данных
          </p>
          <DateRangeInput onChange={handleDateChange} />
          <Image
            src="/Calendar_Days.svg"
            alt="Период"
            width={6}
            height={6}
            className="object-cover w-fit mx-auto h-fit"
          />
          <p className="text-xs text-white ml-8 mr-2">Показатели</p>
          <SelectWithIcon
            id="indexes"
            name="indexes"
            options={['Общие', 'Средние']}
          />
        </div>

        {/* Right Section: Navbar Items */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-white text-xs inline-flex items-center"
          >
            <span className="mx-2">Дмитрий К.</span>
            <Image
              aria-hidden
              src="/User_Circle.svg"
              alt="Settings Icon"
              width={20}
              height={20}
              className="inline-flex w-auto h-auto"
            />
          </Link>
        </div>
      </div>
    </header>
  )
}
