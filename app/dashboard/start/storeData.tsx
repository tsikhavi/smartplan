// storeData.tsx
import { v4 as uuidv4 } from 'uuid'

// Types
export interface UserDetails {
  id: number
  name: string
  inn: string
}

export interface StoreInfo {
  name: string
  address: string
}

export interface SyncData {
  label: string
  date: string
}

export interface StatItem {
  value: number
  description: string
  id: string
}

export interface GroupData {
  id: number
  groupName: string
  groupTitle: string
  turnover: number
}

export interface AnalyticsData {
  id: number
  groupName: number
  groupTitle: string
  turnover: number
}

// Constants
export const USER_DETAILS: UserDetails = {
  id: 2216,
  name: 'Курдюмов Дмитрий',
  inn: '2301234567',
}

export const STORES_INFO: StoreInfo[] = [
  {
    name: 'Магазин Мираж',
    address: '636019, Томская область, г. Северск, ул. Шевченко, д. 86А',
  },
  {
    name: "Магазин 'Продукты'",
    address: '636037, Томская область, г. Северск, ул. Северная д. 91а',
  },
]

export const SYNC_DATA: SyncData[] = [
  { label: 'Последняя синхронизация', date: '08.02.2024' },
  { label: 'Последний расчет прогноза', date: '04.02.2024' },
  { label: 'Последний расчет заказа', date: '04.02.2024' },
]

export const ORDER_CALC_STEPS: string[] = [
  'Синхронизировать данные в приложении с данными из системы учета',
  'Посмотреть свои показатели',
  'Запустить расчет прогноза',
  'Проверить прогноз, откорректировать отдельные позиции или группы',
  'Сформировать данные по заказу на основе прогноза на необходимый период',
]

export const STAT_ITEMS: StatItem[] = [
  { value: 306180, description: 'всего оборот руб за период' },
  { value: 3039, description: 'всего продано товаров шт за период' },
  { value: 138698, description: 'всего прибыль за период' },
  { value: 2498, description: 'всего чеков за период' },
  { value: 1.22, description: 'в среднем шт товара в 1 чеке' },
  { value: 45.3, description: '% наценка за период' },
  { value: 43740, description: 'в среднем оборот руб в день' },
  { value: 434, description: 'в среднем продано товаров шт в день' },
  { value: 19814, description: 'в среднем прибыль руб в день' },
  { value: 357, description: 'в среднем чеков в день' },
  { value: 122.6, description: 'средний чек руб' },
  { value: 562, description: 'товара в ассортименте' },
].map((item) => ({ ...item, id: uuidv4() }))

export const CONTENT_STAT_ITEMS: StatItem[] = [
  { value: 9.0, description: 'товарный запас (дни)' },
  { value: 744488, description: 'товарный запас (руб)' },
  { value: 6.3, description: 'оборачиваемость последнего заказа (дни)' },
].map((item) => ({ ...item, id: uuidv4() }))

export const TABLE_DATA: GroupData[] = [
  { id: 1, groupName: 'группа 1', groupTitle: 'Продукты', turnover: 153038 },
  {
    id: 2,
    groupName: 'группа 2',
    groupTitle: 'Табачные изделия',
    turnover: 149865,
  },
  { id: 3, groupName: 'группа 3', groupTitle: 'Сигареты', turnover: 140753 },
  { id: 4, groupName: 'группа 4', groupTitle: 'Сигареты', turnover: 110753 },
]

export const TABLE_ANALYTICS_DATA: AnalyticsData[] = [
  {
    id: 1,
    groupName: 1,
    groupTitle: 'Сигареты Кэмэл компакт',
    turnover: 3570,
  },
  {
    id: 2,
    groupName: 2,
    groupTitle: "Пиво 'Немецкое' Светлое филтрированные",
    turnover: 3227,
  },
  {
    id: 3,
    groupName: 3,
    groupTitle: 'Сигареты Космос Синие с филтром',
    turnover: 2875,
  },
  {
    id: 4,
    groupName: 4,
    groupTitle: "Пиво 'Старый Мельник из Бочонка Мягкое'",
    turnover: 2364,
  },
  {
    id: 5,
    groupName: 5,
    groupTitle: "Пиво 'Крюгер традиционное' светлое 4,9%",
    turnover: 2225,
  },
]
