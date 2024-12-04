// src/components/TableList.tsx
import React from 'react'

type TableEntry = {
  listName: string
  itemCount: number
}

const tableData: TableEntry[] = [
  { listName: "Поставщик фруктов 'агро среда'", itemCount: 26 },
  { listName: 'Молочка, Максим', itemCount: 18 },
  { listName: 'Алкоголь от миянс', itemCount: 52 },
  { listName: "Алкоголь от ООО 'Креста'", itemCount: 55 },
  { listName: 'Стандартный недельный заказ', itemCount: 63 }, // Entry from the image
]

const TableList: React.FC = () => {
  return (
    <div className="container mx-auto p-4 text-xs">
      <h1 className="text-2xl font-bold mb-4">Листы товаров</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-blue-300">
              <th className="border border-gray-200 px-4 text-left">
                Название товаров
              </th>
              <th className="border border-gray-200 px-4 text-left">
                Количество товаров
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4">
                  {entry.listName}
                </td>
                <td className="border border-gray-200 px-4">
                  {entry.itemCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableList
