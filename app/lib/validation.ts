import { z } from 'zod'

export const TableRowSchema = z.object({
  магазин: z.string(),
  номер_чека: z.string(),
  дата: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
  название_товара: z.string(),
  оборот_шт: z.number(),
  оборот_руб: z.number(),
  оборот_себестоимости: z.number(),
  прибыл: z.number(),
})

export const TableRowArraySchema = z.array(TableRowSchema)

export type TableRow = z.infer<typeof TableRowSchema>
