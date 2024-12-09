'use client'

import { useCallback, useContext, useState, useEffect, useRef } from 'react'
import { TableDataContext } from './layout'
import Loading from './loading'
import { v4 as uuidv4 } from 'uuid'
import { UpArrowIcon, DownArrowIcon } from '../lib/themeIcon'
import { fetchTableData } from '../lib/helpers'
import { TableRow } from '../lib/validation'
import Alert from '../components/alert'

export default function DashboardPage() {
  const data = useContext(TableDataContext)
  const [sortedData, setSortedData] = useState<TableRow[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [alertMessage, setAlertMessage] = useState<string | null>(null)
  const [sortConfig, setSortConfig] = useState<{
    columnKey: keyof TableRow | null
    direction: 'asc' | 'desc'
  } | null>(null)
  const [rowsToShow, setRowsToShow] = useState(30)
  const [columnWidths, setColumnWidths] = useState<number[]>([])
  const resizingColumn = useRef<number | null>(null)
  const startX = useRef<number | null>(null)
  const [selectedRange, setSelectedRange] = useState<string | null>(null)

  const updateSelectedRange = () => {
    const storedRange = localStorage.getItem('dateRange')
    setSelectedRange(storedRange)
  }

  useEffect(() => {
    updateSelectedRange()
    const interval = setInterval(() => {
      updateSelectedRange()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const loadData = async () => {
      if (!data || data.length === 0) {
        const storedData = localStorage.getItem('tableData')
        if (storedData) {
          const parsedData: TableRow[] = JSON.parse(storedData)
          setSortedData(parsedData)
          setHeaders(Object.keys(parsedData[0]))
          setLoading(false)
        } else {
          const range = { from: '01-02-2024', to: '07-02-2024' }
          setLoading(true)
          setAlertMessage('Обновление таблицы данными...')
          const serverData = await fetchTableData(range)

          if (serverData.length > 0) {
            localStorage.setItem('tableData', JSON.stringify(serverData))
            setSortedData(serverData)
            setHeaders(Object.keys(serverData[0]))
          }
          setLoading(false)
          setAlertMessage(null)
        }
      } else {
        setSortedData(data)
        setHeaders(Object.keys(data[0]))
      }
    }

    loadData()
  }, [data])

  const sortData = (columnKey: keyof TableRow) => {
    if (!sortedData) return

    const isAscending =
      sortConfig?.columnKey === columnKey && sortConfig.direction === 'asc'
    const direction = isAscending ? 'desc' : 'asc'

    const sorted = [...sortedData].sort((a, b) => {
      const aValue = a[columnKey]
      const bValue = b[columnKey]

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'asc'
          ? aValue.localeCompare(bValue, 'ru')
          : bValue.localeCompare(aValue, 'ru')
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'asc' ? aValue - bValue : bValue - aValue
      }

      return 0
    })

    setSortedData(sorted)
    setSortConfig({ columnKey, direction })
  }

  useEffect(() => {
    if (sortedData.length > 0) {
      setHeaders(Object.keys(sortedData[0]))
    }
  }, [sortedData])

  const handleMouseDown = (index: number, event: React.MouseEvent) => {
    resizingColumn.current = index
    startX.current = event.clientX
  }

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (resizingColumn.current === null || startX.current === null) return

      const deltaX = event.clientX - startX.current
      const newWidths = [...columnWidths]
      newWidths[resizingColumn.current] =
        (newWidths[resizingColumn.current] || 40) + deltaX
      newWidths[resizingColumn.current] = Math.max(
        newWidths[resizingColumn.current],
        30
      )
      setColumnWidths(newWidths)

      startX.current = event.clientX
    },
    [columnWidths]
  )

  const handleMouseUp = () => {
    resizingColumn.current = null
    startX.current = null
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseMove, columnWidths])

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <h1 className="text-2xl font-bold mb-4">Панель управления: Данные</h1>

      {alertMessage && <Alert color="malachite" message={alertMessage} />}

      {loading ? (
        <Loading />
      ) : !sortedData || sortedData.length === 0 ? (
        <div className="text-malachite-900 p-2 rounded-md">
          <p>
            Нет доступных данных.{' '}
            <span className="text-red-700 font-bold">
              Выберите диапазон дат выше
            </span>
            , чтобы загрузить соответствующие данные.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 flex justify-between gap-4">
            <p className="text-sm">
              Диапазон данные с:{' '}
              {selectedRange
                ? (() => {
                    try {
                      const range = JSON.parse(selectedRange)
                      return ` ${range.from.replace(/-/g, '.')} по ${range.to.replace(/-/g, '.')}`
                    } catch {
                      return ' некорректный диапазон'
                    }
                  })()
                : '01-02-2024 по 07-02-2024'}
            </p>
            <div>
              <label htmlFor="rows" className="text-sm font-medium px-2">
                Количество строк:
              </label>
              <select
                id="rows"
                className="border border-gray-300 rounded px-2 py-1 text-sm"
                value={rowsToShow}
                onChange={(e) => setRowsToShow(Number(e.target.value))}
              >
                {[500, 1000, 2000, 5000, 10000].map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="border border-gray-300 overflow-hidden">
            <div className="relative max-h-[400px] overflow-y-auto table-scrollbar">
              <table className="table-fixed border-collapse w-full text-xs text-left">
                <thead className="sticky top-0 bg-blue-300 z-0 shadow">
                  <tr>
                    {headers.map((header, index) => (
                      <th
                        key={uuidv4()}
                        className="border border-gray-300 px-2 py-2 truncate relative"
                        style={{ width: `${columnWidths[index] || 40}px` }}
                      >
                        <div className="flex justify-between items-center cursor-pointer">
                          <span
                            className="inline-flex"
                            onClick={() => sortData(header as keyof TableRow)}
                          >
                            {header}
                            {sortConfig?.columnKey === header ? (
                              sortConfig.direction === 'asc' ? (
                                <UpArrowIcon />
                              ) : (
                                <DownArrowIcon />
                              )
                            ) : null}
                          </span>
                          <div
                            className="w-[2px] h-full absolute right-0 bg-gray-300 top-0 cursor-col-resize"
                            onMouseDown={(e) => handleMouseDown(index, e)}
                          ></div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedData.slice(0, rowsToShow).map((row) => (
                    <tr
                      key={uuidv4()}
                      className="hover:bg-gray-50 odd:bg-white even:bg-gray-50"
                    >
                      {Object.values(row).map((cell) => (
                        <td
                          key={uuidv4()}
                          className="border whitespace-nowrap border-gray-300 px-4 py-0 text-ellipsis overflow-hidden"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="sticky bottom-0 bg-gray-100 z-10 shadow border-t border-gray-300">
              {(() => {
                const footerData = headers.map((header) => {
                  const isNumericColumn = sortedData.every(
                    (row) => typeof row[header as keyof TableRow] === 'number'
                  )

                  const columnSum = isNumericColumn
                    ? sortedData.reduce(
                        (sum, row) =>
                          sum + (row[header as keyof TableRow] as number),
                        0
                      )
                    : null

                  let difference: number | null = null
                  try {
                    const storedDifference = localStorage.getItem('diapazon')
                    difference = storedDifference
                      ? JSON.parse(storedDifference)
                      : null
                    if (typeof difference !== 'number') {
                      difference = null
                    }
                  } catch (error) {
                    console.error('Выбираете диапазон сверху', error)
                  }

                  const columnAverage =
                    columnSum !== null && difference
                      ? (columnSum / difference).toFixed(2)
                      : null

                  return {
                    id: uuidv4(),
                    header,
                    sum: columnSum,
                    average: columnAverage,
                  }
                })


                
                return (
                  <table className="table-fixed border-collapse w-full text-xs text-left">
                    <tfoot>
                      {/* Row for Sums */}
                      <tr>
                        {footerData.map(({ id, sum }) => (
                          <td
                            key={`sum-${id}`}
                            className="border border-gray-300 px-4 py-2 font-semibold text-right"
                          >
                            {sum !== null
                              ? Math.round(sum).toLocaleString('ru')
                              : '—'}
                          </td>
                        ))}
                      </tr>

                      {/* Row for Averages */}
                      <tr>
                        {footerData.map(({ id, average }) => (
                          <td
                            key={`average-${id}`}
                            className="border border-gray-300 px-4 py-2 font-semibold text-right"
                          >
                            {average !== null
                              ? Number(average).toLocaleString('ru', {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })
                              : '—'}
                          </td>
                        ))}
                      </tr>
                    </tfoot>
                  </table>
                )
              })()}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
