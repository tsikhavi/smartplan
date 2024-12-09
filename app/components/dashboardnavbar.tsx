'use client'

import { useState } from 'react'
import { fetchTableData } from '../lib/helpers'
import { TableRow } from '../lib/validation'
import { DateRangeInput } from './daterangeinput'
import SelectWithIcon from './start/selectwithicon'
import Link from 'next/link'
import Image from 'next/image'
import Alert from './alert'
import { calculateDateDifference } from '../lib/utils'

type DashboardNavbarProps = {
  updateTables: (data: TableRow[]) => void
}

type DateRange = {
  from: string
  to: string
}

export default function DashboardNavbar({
  updateTables,
}: DashboardNavbarProps) {
  const [dateRange, setDateRange] = useState<DateRange>({ from: '', to: '' })
  const [alertMessage, setAlertMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const handleDateChange = async (range: DateRange) => {
    setDateRange(range)

    const difference = calculateDateDifference(range.from, range.to)
    if (difference !== null) {
      console.log(`Диапазон ${difference}`)
    } else {
      console.log(
        'Не удалось рассчитать количество дней: неверный диапазон дат.'
      )
    }

    try {
      const data = await fetchTableData(range)

      if (data) {
        localStorage.setItem('tableData', JSON.stringify(data))
        localStorage.setItem('dateRange', JSON.stringify(range))
        localStorage.setItem('diapazon', JSON.stringify(difference))
        updateTables(data)
        setAlertMessage({
          type: 'success',
          text: `Загрузки данных с ${range.from} по ${range.to}.`,
        })
      }
    } catch (error) {
      console.error('Ошибка при извлечении данных таблицы:', error)
      setAlertMessage({
        type: 'error',
        text: 'Не удалось загрузить данные. Повторите попытку позже.',
      })
    }
  }

  return (
    <header className="bg-[#404950] px-2">
      <div className="mx-auto flex h-8 w-full items-center justify-between">
        <div className="flex items-center">
          <p className="text-xs text-white mx-2">Магазин</p>
          <SelectWithIcon
            id="shop"
            name="shop"
            options={['Магазин мираж', 'Магазин продукты']}
          />
          <p className="text-xs text-white ml-8 mr-2">Период данных</p>
          <DateRangeInput onChange={handleDateChange} />
          <Image
            src="/Calendar_Days.svg"
            alt="Период"
            width={6}
            height={6}
            className="object-cover w-fit mx-auto h-fit"
          />
        </div>

        {/* Right Section: Navbar Items */}
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/start"
            className="text-white text-xs inline-flex items-center"
          >
            <span className="mx-2">Дмитрий К.</span>
            <Image
              aria-hidden
              src="/User_Circle.svg"
              alt="Settings Icon"
              width={12}
              height={12}
              className="inline-flex w-auto h-auto"
            />
          </Link>
          <Link href="/">
            <Image
              aria-hidden
              src="/SmartPlan.svg"
              alt="Settings Icon"
              width={20}
              height={12}
              className="inline-flex w-auto h-auto"
            />
          </Link>
        </div>
      </div>

      {alertMessage && (
        <Alert
          color={alertMessage.type === 'success' ? 'malachite' : 'red'}
          message={alertMessage.text}
        />
      )}
    </header>
  )
}
