'use client'

import React, { useEffect, useState } from 'react'

const DateDisplay: React.FC = () => {
  const [lastDate, setLastDate] = useState<string>('')

  const fetchLastDate = async () => {
    // Fetch the latest 'selectedLastDate' from localStorage
    const storedLastDate = localStorage.getItem('selectedLastDate')
    if (storedLastDate) {
      setLastDate(storedLastDate)
    }
  }

  useEffect(() => {
    // Immediately fetch the last date on component mount
    fetchLastDate()

    // Set an interval to fetch the last date every 1 second (1000ms)
    const interval = setInterval(fetchLastDate, 1000)

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval)
  }, [])

  return (
    <p className="text-xs pl-4 mt-4 text-wrap first-letter:uppercase">
      показатели на последнюю актуальную дату (
      <span className="font-bold text-red-700">
        {lastDate || 'Дата не выбрана'}
      </span>
      )
    </p>
  )
}

export default DateDisplay
