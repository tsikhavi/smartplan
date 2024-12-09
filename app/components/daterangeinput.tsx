'use client'

import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { DayPicker, DateRange } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { useState, useMemo } from 'react'

interface DateRangeInputProps {
  onChange: (range: { from: string; to: string }) => void
}

export const DateRangeInput: React.FC<DateRangeInputProps> = ({ onChange }) => {
  const [range, setRange] = useState<DateRange | undefined>()
  const [showPicker, setShowPicker] = useState(false)

  // Memoize dates to prevent recalculating on each render
  const today = useMemo(() => new Date(), [])
  const sevenDaysAgo = useMemo(() => {
    const date = new Date()
    date.setDate(today.getDate() - 7)
    return date
  }, [today])

  // Format the default range
  const defaultFormattedRange = useMemo(
    () =>
      `${format(sevenDaysAgo, 'dd.MM.yyyy', { locale: ru })} - ${format(today, 'dd.MM.yyyy', { locale: ru })}`,
    [sevenDaysAgo, today]
  )

  const formattedRange = range
    ? `${format(range.from!, 'dd.MM.yyyy', { locale: ru })} - ${
        range.to ? format(range.to, 'dd.MM.yyyy', { locale: ru }) : ''
      }`
    : defaultFormattedRange

  const handleApplyClick = () => {
    setShowPicker(false)

    if (range) {
      const from = format(range.from!, 'dd-MM-yyyy', { locale: ru }) // API-friendly format
      const to = range.to
        ? format(range.to, 'dd-MM-yyyy', { locale: ru })
        : format(today, 'dd-MM-yyyy', { locale: ru })

      // Trigger the callback to notify parent component
      onChange({ from, to })
    }
  }

  return (
    <div className="relative text-sm">
      <div
        className="flex items-center border border-gray-300 rounded-md py-0 px-2 bg-white text-gray-600 cursor-pointer"
        onClick={() => setShowPicker(!showPicker)}
      >
        {formattedRange}
      </div>

      {showPicker && (
        <div className="absolute z-10 mt-2 text-sm bg-white text-black shadow-lg p-4 rounded-md">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
            defaultMonth={today}
            locale={ru}
            disabled={{
              after: today,
            }}
            classNames={{
              day: 'rounded-full hover:bg-malachite-500 hover:text-white focus:outline-none',
              selected: 'bg-malachite-50 text-malachite-600 font-bold',
              range_start: 'bg-malachite-900 text-white',
              range_end: 'bg-malachite-900 text-white',
              today: 'font-bold bg-black text-malachite-300',
              chevron: 'rounded-full p-1 hover:bg-malachite-300',
            }}
          />
          <div className="mt-2 flex gap-2">
            <button
              className="px-4 py-2 text-sm text-white bg-malachite-500 rounded hover:bg-malachite-600"
              onClick={handleApplyClick}
            >
              Применить
            </button>
            <button
              className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => setRange(undefined)}
            >
              Сбросить
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
