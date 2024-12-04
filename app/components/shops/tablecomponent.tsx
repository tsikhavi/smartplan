'use client'
import React, { useState } from 'react'
import { data, TableRow } from './data'
import AddColumn from './addcolumns'

const columnNames = [
  { key: 'productName', label: 'Название товара' },
  { key: 'group1', label: 'Группа 1' },
  { key: 'group2', label: 'Группа 2' },
  { key: 'group3', label: 'Группа 3' },
  { key: 'turnoverUnits', label: 'Оборот (шт)' },
  { key: 'turnoverRub', label: 'оборот (руб)' },
  { key: 'stockUnits', label: 'Товарный запас (шт)' },
  { key: 'stockRub', label: 'Товарный запас (руб)' },
  { key: 'stockDays', label: 'Товарный запас (дни)' },
  { key: 'turnoverLastOrder', label: 'Оборач. послед. заказа (дни)' },
  { key: 'turnoverPrice', label: 'оборот в себестоимости (руб)' },
  { key: 'entryPrice', label: 'входная цена (руб)' },
  { key: 'sellingPrice', label: 'продажная цена (руб)' },
  { key: 'barcode', label: 'Штрих код' },
]

const columnNames1 = [
  { key: 'turnoverUnits', label: 'Оборот (шт)' },
  { key: 'turnoverRub', label: 'оборот (руб)' },
  { key: 'stockUnits', label: 'Товарный запас (шт)' },
  { key: 'stockRub', label: 'Товарный запас (руб)' },
  { key: 'stockDays', label: 'Товарный запас (дни)' },
  { key: 'turnoverLastOrder', label: 'Оборач. послед. заказа (дни)' },
  { key: 'turnoverPrice', label: 'оборот в себестоимости (руб)' },
  { key: 'entryPrice', label: 'входная цена (руб)' },
  { key: 'sellingPrice', label: 'продажная цена (руб)' },
]

const initialButtonColumns = [
  { key: 'productName', label: 'Название товара' },
  { key: 'group1', label: 'Группа 1' },
  { key: 'group2', label: 'Группа 2' },
  { key: 'group3', label: 'Группа 3' },
  { key: 'barcode', label: 'Штрих код' },
]

const TableComponent: React.FC = () => {
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    Object.fromEntries(columnNames.map((col) => [col.key, true]))
  )
  const [activeButtons, setActiveButtons] = useState<Set<string>>(new Set())
  const [buttonColumns, setButtonColumns] = useState(initialButtonColumns)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof TableRow
    direction: 'asc' | 'desc'
  } | null>(null)

  // Toggles the visibility of a column
  const toggleColumn = (columnKey: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [columnKey]: !prev[columnKey],
    }))
  }

  // Handles adding or removing a column
  const handleColumnToggle = (columnKey: string) => {
    const columnToAdd = columnNames.find((col) => col.key === columnKey)

    if (!columnToAdd) return // Guard clause in case the columnKey is invalid

    setActiveButtons((prev) => {
      const updatedSet = new Set(prev)
      const isColumnActive = updatedSet.has(columnKey)

      if (isColumnActive) {
        // Remove the column from buttonColumns if toggling OFF
        updatedSet.delete(columnKey)
        setButtonColumns((prev) => prev.filter((col) => col.key !== columnKey))
      } else {
        // Add the column to buttonColumns if toggling ON
        updatedSet.add(columnKey)
        setButtonColumns((prev) => {
          if (!prev.some((col) => col.key === columnKey)) {
            return [...prev, columnToAdd]
          }
          return prev
        })
      }

      return updatedSet
    })
  }

  // Calculates footer value based on the column key
  const getFooterValue = (key: keyof TableRow) => {
    if (key === 'stockDays' || key === 'turnoverLastOrder') {
      const validEntries = data.filter(
        (row) => typeof row[key] === 'number'
      ) as TableRow[]
      const total = validEntries.reduce((sum, row) => sum + (row[key] || 0), 0)
      return validEntries.length > 0
        ? (total / validEntries.length).toFixed(2)
        : '—'
    }
    if (typeof data[0]?.[key] === 'number') {
      return data.reduce((sum, row) => {
        const value = row[key]
        return sum + (typeof value === 'number' ? value : 0)
      }, 0)
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
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
      return 0
    })
  }

  return (
    <section>
      <AddColumn
        columnNames={columnNames1}
        activeButtons={activeButtons}
        handleColumnToggle={handleColumnToggle}
      />

      <div className="my-2 table-scrollbar text-xs">
        <div className="space-x-1 flex flex-row -mr-80">
          {buttonColumns.map(({ key, label }) => (
            <button
              key={key}
              className={`rounded-t-lg shadow-md px-1 py-0.5 ${
                visibleColumns[key]
                  ? 'bg-[#93DF6F] text-black'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => toggleColumn(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <table className="border-collapse border border-gray-300 w-full mt-0">
          <thead>
            <tr className="bg-blue-300">
              {columnNames.map(
                ({ key, label }) =>
                  visibleColumns[key] && (
                    <th
                      key={key}
                      className="border border-gray-300 py-2 cursor-pointer truncate"
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
                {columnNames.map(({ key }) => {
                  // Check if the column is visible
                  if (!visibleColumns[key]) return null

                  // Render the data value or fallback
                  const value =
                    row[key as keyof TableRow] !== undefined &&
                    row[key as keyof TableRow] !== null
                      ? row[key as keyof TableRow]
                      : '—'

                  return (
                    <td
                      key={key}
                      className="border border-gray-300 text-left truncate"
                    >
                      {value}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="font-bold bg-gray-100">
              {columnNames.map(
                ({ key }) =>
                  visibleColumns[key] && (
                    <td key={key} className="border border-gray-300 py-1">
                      {key === 'productName'
                        ? 'Общий итог'
                        : getFooterValue(key as keyof TableRow)}
                    </td>
                  )
              )}
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  )
}

export default TableComponent
