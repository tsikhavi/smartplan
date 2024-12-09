'use client'

import React, { useEffect, useState } from 'react'

type DateRange = {
  from: string
  to: string
}

const DateDisplay: React.FC = () => {
  const [lastDateRange, setLastDateRange] = useState<DateRange | null>(null)

  const fetchLastDateRange = async () => {
    const storedDateRange = localStorage.getItem('dateRange')
    if (storedDateRange) {
      try {
        const parsedDateRange: DateRange = JSON.parse(storedDateRange)
        setLastDateRange(parsedDateRange)
      } catch (error) {
        console.error('Error parsing dateRange from localStorage:', error)
      }
    }
  }

  useEffect(() => {
    fetchLastDateRange()

    const interval = setInterval(fetchLastDateRange, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <p className="text-xs pl-4 mt-4 text-wrap first-letter:uppercase">
      Показатели на последнюю актуальную дату (
      <span className="font-bold text-red-700">
        {lastDateRange ? ` ${lastDateRange.to}` : 'Дата не выбрана'}
      </span>
      )
    </p>
  )
}

export default DateDisplay
