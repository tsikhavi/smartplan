// src/components/TableTasks.tsx
import React from 'react'
import data from './data.json'

const TableTasks: React.FC = () => {
  const taskList = data.find(
    (list) => list.listName === 'Стандартный недельный заказ'
  )

  if (!taskList) {
    return <p className="text-red-500">нет данных по этим запросом!</p>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{taskList.listName}</h1>
      <p className="text-[8px] text-gray-600">
        Кол-во товаров: {taskList.itemCount}
      </p>
      {taskList.items.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border text-xs border-gray-200">
            <thead>
              <tr className="bg-blue-300">
                <th className="border border-gray-200 px-4 py-2">№</th>
                <th className="border border-gray-200 px-4 py-2">
                  Название товара
                </th>
                <th className="border border-gray-200 px-4 py-2">штихкод</th>
              </tr>
            </thead>
            <tbody>
              {taskList.items.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-200 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {item.productName}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {item.barcode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-sm text-gray-500">No items available.</p>
      )}
    </div>
  )
}

export default TableTasks
