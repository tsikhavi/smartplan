import { TABLE_ANALYTICS_DATA, TABLE_DATA } from './storeData'

export const TableGroup: React.FC = () => {
  const topGroups = TABLE_DATA.sort((a, b) => b.turnover - a.turnover).slice(
    0,
    3
  )

  return (
    <>
      <div className="flex justify-between items-center w-full px-2">
        <p className="font-bold text-sm">ТОП 3 групп по показателю</p>
        <button className="bg-gray-200 text-gray-700 rounded-t-xl px-4 text-xs shadow-md ">
          оборот (руб)
        </button>
      </div>
      <table className="border border-gray-200 text-xs items-center w-full">
        <thead className="bg-gray-200 text-ellipsis overflow-hidden truncate">
          <tr>
            <th scope="col" className="px-2">
              группа
            </th>
            <th scope="col" className="px-2">
              название
            </th>
            <th scope="col" className="px-10">
              оборот (руб) за период
            </th>
          </tr>
        </thead>
        <tbody>
          {topGroups.map((item) => (
            <tr key={item.id} className="border border-gray-200">
              <td className="whitespace-nowrap border-b border-e border-gray-200 px-4 font-medium">
                {item.groupName}
              </td>
              <td className="whitespace-nowrap border-b border-e border-gray-200 px-4">
                {item.groupTitle}
              </td>
              <td className="whitespace-nowrap border-b border-e border-gray-200 px-4 text-end">
                {item.turnover.toLocaleString('ru-RU')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export const TableAnalytics: React.FC = () => {
  const topGroups = TABLE_ANALYTICS_DATA.sort(
    (a, b) => b.turnover - a.turnover
  ).slice(0, 5)
  return (
    <>
      <div className="flex justify-between items-center w-full pt-4 ">
        <p className="font-bold text-sm">ТОП 5 товаров по показателю</p>
        <button className="bg-gray-200 text-gray-700 rounded-t-xl px-2 text-xs shadow-md ">
          прибыль (руб)
        </button>
      </div>
      <table className="border border-gray-200 text-xs items-center w-full m-0">
        <thead className="bg-gray-200 text-ellipsis overflow-hidden truncate">
          <tr>
            <th scope="col" className="px-2">
              топ
            </th>
            <th scope="col" className="px-2">
              название товара
            </th>
            <th scope="col" className="pr-2 text-end">
              прибыль (руб) за период
            </th>
          </tr>
        </thead>
        <tbody>
          {topGroups.map((item) => (
            <tr key={item.id} className="border border-gray-200">
              <td className="whitespace-nowrap border-b border-e border-gray-200 px-4 font-medium">
                {item.groupName}
              </td>
              <td className="whitespace-nowrap border-b border-e border-gray-200 px-4">
                {item.groupTitle.length > 30
                  ? `${item.groupTitle.substring(0, 30)}...`
                  : item.groupTitle}
              </td>

              <td className="whitespace-nowrap border-b border-e border-gray-200 px-2 text-end">
                {item.turnover.toLocaleString('ru-RU')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
