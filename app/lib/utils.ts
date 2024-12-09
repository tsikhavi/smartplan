// Utility to convert "DD-MM-YYYY" to "YYYY-MM-DD"
export const convertToISOFormat = (date: string): string | null => {
  const [day, month, year] = date.split('-')
  if (!day || !month || !year) {
    console.warn(`Invalid date format for conversion: "${date}"`)
    return null
  }
  return `${year}-${month}-${day}` // Return in ISO format
}

// Updated function to calculate the difference in days
export const calculateDateDifference = (
  from: string,
  to: string
): number | null => {
  const fromISO = convertToISOFormat(from)
  const toISO = convertToISOFormat(to)

  if (!fromISO || !toISO) {
    console.warn(`Conversion failed for dates: from="${from}", to="${to}"`)
    return null
  }

  const fromDate = new Date(fromISO)
  const toDate = new Date(toISO)

  if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
    console.warn(
      `Invalid date after conversion: from="${fromISO}", to="${toISO}"`
    )
    return null
  }

  return Math.ceil(
    (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)
  )
}
