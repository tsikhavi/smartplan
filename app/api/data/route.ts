import { NextResponse } from 'next/server'
import { getSheetData } from '@app/app/lib/googleSheets'
import { parse, isWithinInterval } from 'date-fns'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)

    // Extract "from" and "to" query parameters
    const from = url.searchParams.get('from')
    const to = url.searchParams.get('to')

    if (!from || !to) {
      return NextResponse.json(
        { error: 'Обязательны параметры диапазона дат «от» и «до».' },
        { status: 400 }
      )
    }

    // Define the range to fetch in the Google Sheet
    const range = 'sales!H2:O9056'

    // Fetch the sheet data
    const sheetData = await getSheetData(range)
    if (!Array.isArray(sheetData)) {
      return NextResponse.json(
        { error: 'Неожиданный формат данных из Google Таблиц.' },
        { status: 500 }
      )
    }

    // Parse query dates (from and to) in "yyyy-MM-dd" format
    const fromDate = parse(from, 'dd-MM-yyyy', new Date())
    const toDate = parse(to, 'dd-MM-yyyy', new Date())

    // Validate data and filter based on the date column (index 2)
    const filteredData = sheetData.filter((row, index) => {
      if (index === 0) return false

      const dateString = row[2]
      try {
        // Parse the sheet date in "dd/MM/yyyy" format
        const rowDate = parse(dateString, 'dd/MM/yyyy', new Date())
        return isWithinInterval(rowDate, { start: fromDate, end: toDate })
      } catch (error) {
        console.error(`Error parsing date in row ${index + 1}:`, error)
        return false
      }
    })

    return NextResponse.json(filteredData)
  } catch (error) {
    console.error('Error fetching data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch data.' },
      { status: 500 }
    )
  }
}
