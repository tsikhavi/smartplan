'use client'

import React, { useState } from 'react'
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core'
import { data, TableRow } from './data'

interface AddColumnProps {
  columnNames: { key: string; label: string }[]
  activeButtons: Set<string>
  handleColumnToggle: (columnKey: string) => void
}

const Draggable = ({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="cursor-move"
    >
      {children}
    </div>
  )
}

const Droppable = ({
  id,
  onDrop,
  children,
}: {
  id: string
  onDrop: (id: string) => void
  children: React.ReactNode
}) => {
  const { isOver, setNodeRef } = useDroppable({ id })

  const style = {
    backgroundColor: isOver ? '#e0f7fa' : undefined,
  }

  return (
    <div ref={setNodeRef} style={style} className="p-4 border rounded">
      {children}
    </div>
  )
}

const AddColumn: React.FC<AddColumnProps> = ({
  columnNames,
  activeButtons,
  handleColumnToggle,
}) => {
  return (
    <DndContext
      onDragEnd={({ over, active }) => {
        if (over && over.id === 'droppable') {
          handleColumnToggle(String(active.id))
        }
      }}
    >
      <div className="space-x-4 flex flex-row mt-2 mb-12 -mr-80 text-xs">
        {columnNames.map(({ key, label }) => (
          <Draggable key={key} id={key}>
            <button
              className={`gap-[2px] px-[34px] py-8 h-[36px] flex flex-col items-center justify-center text-center text-xs font-light rounded-full 
               ${
                 activeButtons.has(key)
                   ? 'bg-[#93DF6F] text-black'
                   : 'bg-[#D9D9D9] text-black'
               }`}
              onClick={() => handleColumnToggle(key)}
            >
              {label}
            </button>
          </Draggable>
        ))}
      </div>
      <Droppable id="droppable" onDrop={(id) => handleColumnToggle(id)}>
        <p className="text-center text-gray-500">
          Drag and drop columns here to add
        </p>
      </Droppable>
    </DndContext>
  )
}

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

  const toggleColumn = (columnKey: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [columnKey]: !prev[columnKey],
    }))
  }

  const handleColumnToggle = (columnKey: string) => {
    const columnToAdd = columnNames.find((col) => col.key === columnKey)
    if (!columnToAdd) return

    setActiveButtons((prev) => {
      const updatedSet = new Set(prev)
      const isColumnActive = updatedSet.has(columnKey)

      if (isColumnActive) {
        updatedSet.delete(columnKey)
        setButtonColumns((prev) => prev.filter((col) => col.key !== columnKey))
      } else {
        updatedSet.add(columnKey)
        setButtonColumns((prev) => [...prev, columnToAdd])
      }

      return updatedSet
    })
  }

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
                  if (!visibleColumns[key]) return null
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
