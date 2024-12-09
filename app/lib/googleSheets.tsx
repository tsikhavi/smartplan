import { google, sheets_v4 } from 'googleapis'

export const googleAuth = async () => {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (!clientEmail || !privateKey) {
    throw new Error('Missing Google credentials.')
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })
    return auth
  } catch (error) {
    console.error(`${error} `)
    throw new Error('Failed to initialize Google Auth.')
  }
}

const sheets = google.sheets('v4')
const spreadsheetId = process.env.GOOGLE_SHEET_ID!

export async function getSheetData(range: string): Promise<string[][]> {
  const auth = await googleAuth()
  const client = await auth.getClient()

  try {
    const response = await sheets.spreadsheets.values.get({
      auth: client as sheets_v4.Params$Resource$Spreadsheets$Values$Get['auth'],
      spreadsheetId,
      range,
    })

    const data = response.data as sheets_v4.Schema$ValueRange

    if (data.values) {
      return data.values
    }

    throw new Error('No data found in the specified range.')
  } catch (error) {
    console.error(`${error} `)
    throw error instanceof Error
      ? new Error(`Failed to retrieve data: ${error.message}`)
      : new Error('Failed to retrieve data: Unknown error occurred.')
  }
}
