export interface TableRow {
  week: number
  day: string
  date: string
  stock: number
  turnover: number
  restoredTurnover: number
  forecast: number
  adjustment: number | null
  adjustedForecast: number
}

const generateWeekData = (
  weekNumber: number,
  startDate: string,
  stockValues: number[],
  turnoverValues: number[],
  restoredTurnoverValues: number[],
  forecastValues: number[],
  adjustmentValues: (number | null)[]
): TableRow[] => {
  const daysOfWeek = ['Пон', 'Втр', 'Ср', 'Чт', 'Пт', 'Сб', 'Вск']
  const baseDate = new Date(startDate)

  return daysOfWeek.map((day, index) => {
    const currentDate = new Date(baseDate)
    currentDate.setDate(baseDate.getDate() + index)

    return {
      week: weekNumber,
      day,
      date: currentDate.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      stock: stockValues[index] || 0,
      turnover: turnoverValues[index] || 0,
      restoredTurnover: restoredTurnoverValues[index] || 0,
      forecast: forecastValues[index] || 0,
      adjustment: adjustmentValues[index] ?? null,
      adjustedForecast:
        (forecastValues[index] || 0) + (adjustmentValues[index] || 0),
    }
  })
}

// Generate table data
export const tableData: TableRow[] = [
  ...generateWeekData(
    4,
    '2024-10-29',
    [2982, 2627, 2210, 1546, 3213, 2500, 2600],
    [355, 320, 340, 360, 380, 400, 420],
    [391, 345, 370, 395, 420, 445, 470],
    [278, 380, 410, 440, 470, 500, 530],
    [null, 10, null, 10, null, 10, null]
  ),
  ...generateWeekData(
    5,
    '2024-11-06',
    [2700, 2800, 2900, 3000, 3100, 3200, 3300],
    [430, 450, 470, 490, 510, 530, 550],
    [480, 505, 530, 555, 580, 605, 630],
    [540, 570, 600, 630, 660, 690, 720],
    [10, null, 10, null, 10, null, 10]
  ),
  ...generateWeekData(
    6,
    '2024-11-06',
    [2700, 2800, 2900, 3000, 3100, 3200, 3300],
    [430, 450, 470, 490, 510, 530, 550],
    [480, 505, 530, 555, 580, 605, 630],
    [540, 570, 600, 630, 660, 690, 720],
    [10, null, 10, null, 10, null, 10]
  ),
  ...generateWeekData(
    7,
    '2024-11-06',
    [2700, 2800, 2900, 3000, 3100, 3200, 3300],
    [430, 450, 470, 490, 510, 530, 550],
    [480, 505, 530, 555, 580, 605, 630],
    [540, 570, 600, 630, 660, 690, 720],
    [10, null, 10, null, 10, null, 10]
  ),
]
