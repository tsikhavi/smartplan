'use client'
import React, { useState } from 'react'
import { data } from './data'

type TableRow = {
  productName: string
  group1: string
  group2: string
  group3: string
  turnoverUnits: number
  stockUnits: number
  stockRub: number
  stockDays: number
  turnoverLastOrder: number
  barcode: string
}

const columnNames = [
  { key: 'productName', label: 'Название товара' },
  { key: 'group1', label: 'Группа 1' },
  { key: 'group2', label: 'Группа 2' },
  { key: 'group3', label: 'Группа 3' },
  { key: 'turnoverUnits', label: 'Оборот (шт)' },
  { key: 'stockUnits', label: 'Товарный запас (шт)' },
  { key: 'stockRub', label: 'Товарный запас (руб)' },
  { key: 'stockDays', label: 'Товарный запас (дни)' },
  { key: 'turnoverLastOrder', label: 'Оборач. послед. заказа (дни)' },
  { key: 'barcode', label: 'Штрих код' },
]

const buttonColumns = [
  { key: 'productName', label: 'Название товара' },
  { key: 'group1', label: 'Группа 1' },
  { key: 'group2', label: 'Группа 2' },
  { key: 'group3', label: 'Группа 3' },
  { key: 'barcode', label: 'Штрих код' },
]

const TableComponent: React.FC = () => {
  const [visibleColumns, setVisibleColumns] = useState(
    Object.fromEntries(columnNames.map((col) => [col.key, true]))
  )

  const [sortConfig, setSortConfig] = useState<{
    key: keyof TableRow
    direction: 'asc' | 'desc'
  } | null>(null)

  const toggleColumn = (columnKey: keyof TableRow) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [columnKey]: !prev[columnKey],
    }))
  }

  const getFooterValue = (key: keyof TableRow) => {
    if (key === 'stockDays' || key === 'turnoverLastOrder') {
      const validEntries = data.filter((row) => typeof row[key] === 'number')
      const total = validEntries.reduce(
        (sum, row) => sum + (row[key] as number || 0),
        0
      )
      return validEntries.length > 0
        ? (total / validEntries.length).toFixed(2)
        : '—'
    }
    if (typeof data[0]?.[key] === 'number') {
      return data.reduce((sum, row) => sum + (row[key] as number || 0), 0)
    }
    return '—'
  }

  const handleSort = (key: keyof TableRow) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })

    data.sort((a, b) => {
      const aValue = a[key]
      const bValue = b[key]
      if (aValue < bValue) return direction === 'asc' ? -1 : 1
      if (aValue > bValue) return direction === 'asc' ? 1 : -1
      return 0
    })
  }

  return (
    <div className="overflow-x-auto text-xs">
      <div className="space-x-1">
        {buttonColumns.map(({ key, label }) => (
          <button
            key={key}
            className={`rounded-t-lg shadow-md px-1 py-0.5 ${
              visibleColumns[key]
                ? 'bg-[#93DF6F] text-black'
                : 'bg-gray-300 text-gray-700'
            }`}
            onClick={() => toggleColumn(key as keyof TableRow)}
          >
            {label}
          </button>
        ))}
      </div>

      <table className="border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-blue-300">
            {columnNames.map(
              ({ key, label }) =>
                visibleColumns[key] && (
                  <th
                    key={key}
                    className="border border-gray-300 px-1 py-2 truncate cursor-pointer"
                    onClick={() => handleSort(key as keyof TableRow)}
                  >
                    {label}
                    {sortConfig?.key === key && (
                      <span>
                        {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                      </span>
                    )}
                  </th>
                )
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="odd:bg-white even:bg-gray-50">
              {columnNames.map(
                ({ key }) =>
                  visibleColumns[key] && (
                    <td
                      key={key}
                      className="border border-gray-300 px-2 text-left truncate"
                    >
                      {row[key as keyof TableRow]}
                    </td>
                  )
              )}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-bold bg-gray-100">
            {columnNames.map(
              ({ key }) =>
                visibleColumns[key] && (
                  <td key={key} className="border border-gray-300 px-2 py-1">
                    {key === 'productName' ? 'Общий итог' : getFooterValue(key as keyof TableRow)}
                  </td>
                )
            )}
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default TableComponent
