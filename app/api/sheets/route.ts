import { NextResponse } from 'next/server'
import { getSheetData } from '@app/app/lib/googleSheets'

export async function GET() {
  try {
    //console.log('API Route Accessed: /api/sheets') // Debug log
    const range = 'sales!H1:030' // Adjust the range based on your data
    console.log(`Fetching data with range: ${range}`) // Debug log
    const data = await getSheetData(range)
    //console.log('Data fetched successfully:', data) // Debug log
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch data from Google Sheets' },
      { status: 500 }
    )
  }
}
