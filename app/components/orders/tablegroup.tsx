import React from 'react'

interface TableRow {
  productName: string
  group2: string
  turnoverUnits: number
  barcode?: string // New barcode field
}

// Provided JSON data for barcode mapping
const jsonData = [
  {
    listName: 'Стандартный недельный заказ',
    itemCount: 63,
    items: [
      { productName: 'Винстон компакт', barcode: '3753298600661' },
      { productName: 'Винстон компакт 100', barcode: '3753328477542' },
      { productName: 'Зажигалка BIG J3', barcode: '4537812617224' },
      { productName: 'Зажигалка Ангара', barcode: '4540745934389' },
      {
        productName: 'Сигареты Винстон красный',
        barcode: '905151847861',
      },
    ],
  },
]

// Mapping product names to barcodes
const barcodeMap: Record<string, string> = {}
jsonData.forEach((list) => {
  list.items.forEach((item) => {
    barcodeMap[item.productName] = item.barcode
  })
})

// Existing table data extended with barcodes
const data: TableRow[] = [
  {
    productName: 'Винстон компакт',
    barcode: '3753298600661',
    group2: '',
    turnoverUnits: 941,
  },
  {
    productName: 'Винстон компакт 100',
    barcode: '3753328477542',
    group2: '',
    turnoverUnits: 941,
  },
  {
    productName: 'Зажигалка BIG J3',
    barcode: '4537812617224',
    group2: '',
    turnoverUnits: 941,
  },
  {
    productName: 'Зажигалка Ангара',
    barcode: '4540745934389',
    group2: '',
    turnoverUnits: 941,
  },
  {
    productName: 'Сигареты Винстон красный',
    barcode: '905151847861',
    group2: '',
    turnoverUnits: 941,
  },
].map((row) => ({
  ...row,
  barcode: barcodeMap[row.productName] || 'N/A', // Add barcode or "N/A" if not found
}))

const TableGroup: React.FC = () => {
  return (
    <div className="overflow-x-auto text-xs">
      <table className="border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-blue-300">
            <th className="border border-gray-300">Группа 2</th>
            <th className="border border-gray-300">Название товара</th>
            <th className="border border-gray-300">Количество товаров</th>
            <th className="border border-gray-300">Штрихкод</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300">{row.group2}</td>
              <td className="border border-gray-300">{row.productName}</td>
              <td className="border border-gray-300 text-center">
                {row.turnoverUnits}
              </td>
              <td className="border border-gray-300 text-center">
                {row.barcode}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-bold bg-gray-100">
            <td className="border border-gray-300" colSpan={2}>
              Общий итог
            </td>
            <td className="border border-gray-300 text-center">
              {data.reduce((total, row) => total + row.turnoverUnits, 0)}
            </td>
            <td className="border border-gray-300 text-center">-</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default TableGroup
