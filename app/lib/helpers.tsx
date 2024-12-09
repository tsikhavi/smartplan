'use server'
import { format, parse } from 'date-fns'

import { TableRow, TableRowArraySchema } from './validation'

type RawRow = [string, string, string, string, string, string, string, string]

export const fetchTableData = async (range: {
  from: string
  to: string
}): Promise<TableRow[]> => {
  try {
    const baseUrl =
      typeof window !== 'undefined'
        ? window.location.origin
        : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    const url = `${baseUrl}/api/data?from=${range.from}&to=${range.to}`

    const response = await fetch(url)
    const rawData = await response.json()

    const transformedData = rawData.map((row: RawRow) => {
      const parsedDate = parse(row[2]?.trim() || '', 'dd/MM/yyyy', new Date())
      const formattedDate = format(parsedDate, 'dd-MM-yyyy')

      return {
        магазин: row[0]?.trim() || '',
        номер_чека: row[1]?.trim() || '',
        дата: formattedDate,
        название_товара: row[3]?.trim() || '',
        оборот_шт: parseFloat(row[4]) || 0,
        оборот_руб: parseFloat(row[5]) || 0,
        оборот_себестоимости: parseFloat(row[6]) || 0,
        прибыл: parseFloat(row[7]) || 0,
      }
    })

    const validatedData = TableRowArraySchema.parse(transformedData)
    return validatedData
  } catch (error) {
    console.error('Ошибка при получении или проверке данных:', error)
    return []
  }
}
