import React from 'react'
import { TableRow, tableData } from './analyticsdata'

const tableHeaders = [
  { label: 'Неделя', key: 'week', className: 'text-center' },
  { label: 'День', key: 'day', className: 'text-center' },
  { label: 'Дата', key: 'date', className: 'text-center' },
  { label: 'Товарный запас (шт)', key: 'stock', className: 'text-center' },
  { label: 'Оборот (шт)', key: 'turnover', className: 'text-center' },
  {
    label: 'Вост-ный оборот (шт)',
    key: 'restoredTurnover',
    className: 'text-center',
  },
  { label: 'Прогноз (шт)', key: 'forecast', className: 'text-center' },
  { label: 'Корректировка', key: 'adjustment', className: 'text-center' },
  {
    label: 'Прогноз с коррект-ми',
    key: 'adjustedForecast',
    className: 'text-center',
  },
]

// Row rendering component
const TableRowComponent: React.FC<{
  row: TableRow
  isNewWeek: boolean
}> = ({ row, isNewWeek }) => {
  return (
    <tr className="hover:bg-gray-100 odd:bg-white even:bg-gray-50">
      <td
        className={`border border-gray-300 ${
          isNewWeek ? 'text-center' : 'bg-gray-50 text-transparent'
        }`}
      >
        {isNewWeek ? row.week : ''}
      </td>
      <td className="border border-gray-300 text-center">{row.day}</td>
      <td className="border border-gray-300 text-center">{row.date}</td>
      <td className="border border-gray-300 text-center">{row.stock}</td>
      <td className="border border-gray-300 text-center">{row.turnover}</td>
      <td className="border border-gray-300 text-center">
        {row.restoredTurnover}
      </td>
      <td className="border border-gray-300 text-center">{row.forecast}</td>
      <td className="border border-gray-300 text-center">
        {row.adjustment ?? '-'}
      </td>
      <td className="border border-gray-300 text-center">
        {row.adjustedForecast}
      </td>
    </tr>
  )
}

const TableAnalytics: React.FC = () => {
  let lastWeek: number | null = null

  return (
    <div className="overflow-x-auto text-xs pl-1">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-blue-300">
          <tr>
            {tableHeaders.map((header) => (
              <th
                key={header.key}
                className={`border border-gray-300 truncate py-2 ${header.className}`}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => {
            const isNewWeek = row.week !== lastWeek
            if (isNewWeek) lastWeek = row.week

            return (
              <TableRowComponent key={index} row={row} isNewWeek={isNewWeek} />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TableAnalytics
