'use client'
import React, { useState } from 'react'
import TableComponent from '@app/app/components/analytics/tablecomponent'
import TableList from '@app/app/components/orders/tablelist'
import FormTasks from '@app/app/components/orders/form'
import TableTasks from '@app/app/components/orders/tabletasks'
import TableGroup from '@app/app/components/orders/tablegroup'

export default function Page() {
  const [showTableTasks, setShowTableTasks] = useState(true) // State to toggle between TableTasks and Table

  const handleToggle = () => {
    setShowTableTasks(!showTableTasks) // Toggle state on button click
  }

  return (
    <div className="pr-4 pl-1 py-6 bg-[#F5F4F4]">
      <section className="pl-80">
        <FormTasks />
      </section>
      <div className="grid grid-cols-6 gap-2">
        <div className="col-span-2 py-12 bg-white shadow">
          <TableComponent />
        </div>
        <div className="col-span-2 py-12 bg-white shadow pt-12">
          {/* Toggle Button */}
          <button
            type="button"
            className="bg-[#93DF6F] flex mx-auto text-black px-4 mb-2 font-bold border border-black rounded-full hover:bg-[#93DF6F]/50 text-xs"
          >
            редактирование списков
          </button>

          {/* Conditionally Render Components */}
          {showTableTasks ? <TableTasks /> : <TableList />}
          <button
            onClick={handleToggle}
            type="button"
            className="bg-[#93DF6F] flex mt-4 mx-auto text-black px-2 mb-4 font-bold border border-black rounded-full hover:bg-[#93DF6F]/50 text-xs"
          >
            {showTableTasks
              ? 'Показать листы товаров'
              : 'Показать Стандартный недельный заказ'}
          </button>
        </div>
        <div className="col-span-2 py-12 bg-white shadow">
          <TableGroup />
        </div>
      </div>
    </div>
  )
}
