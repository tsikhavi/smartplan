'use client'
import SalesChart from '@app/app/components/shops/saleschart'
import BarChart from '@app/app/components/barchart'
import dynamic from 'next/dynamic'
const TableComponent = dynamic(
  () => import('../../components/shops/tablecomponent1'),
  { ssr: false }
)

export default function Page() {
  return (
    <div className="px-4 py-2">
      <div className="grid grid-cols-4 gap-8 mt-2">
        <div className="col-span-2">
          <TableComponent />
        </div>
        <div className="col-span-2 mt-40">
          <SalesChart />
          <section className="grid grid-cols-2 gap-4 my-4">
            <BarChart
              labels={[
                '01.02.2024',
                '01.03.2024',
                '01.04.2024',
                '01.05.2024',
                '01.06.2024',
                '01.07.2024',
              ]}
              dataPoints={[129.0, 138.0, 127.0, 122.5, 118.5, 120.0]}
              barColor="rgba(234, 179, 8, 0.8)" // Tailwind yellow-500
              title="Кол-во чеков"
            />
            <BarChart
              labels={[
                '01.02.2024',
                '01.03.2024',
                '01.04.2024',
                '01.05.2024',
                '01.06.2024',
                '01.07.2024',
              ]}
              dataPoints={[420, 550, 330, 270, 305, 290]}
              barColor="rgba(59, 130, 246, 0.8)" // Tailwind blue-500
              title="Оборот (руб)"
            />
            <BarChart
              labels={[
                '01.02.2024',
                '01.03.2024',
                '01.04.2024',
                '01.05.2024',
                '01.06.2024',
                '01.07.2024',
              ]}
              dataPoints={[22500, 34500, 17000, 15000, 17000, 18500, 16000]}
              barColor="rgba(34, 197, 94, 0.8)" // Tailwind green-500
              title="Прибыль (руб)"
            />
            <BarChart
              labels={[
                '01.02.2024',
                '01.03.2024',
                '01.04.2024',
                '01.05.2024',
                '01.06.2024',
                '01.07.2024',
              ]}
              dataPoints={[50000, 70000, 40000, 35000, 37500, 32500]}
              barColor="rgba(249, 115, 22, 0.8)" // Tailwind orange-500
              title="Сред чек (руб)"
            />
          </section>
        </div>
      </div>
    </div>
  )
}
