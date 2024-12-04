'use client' // for client-side rendering

import React, { useState } from 'react'

const FormTasks = () => {
  const [days, setDays] = useState<number | string>('')
  const [changes] = useState<number | string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted with:', { days, changes })
  }

  const handleDownload = (format: string) => {
    console.log(`Downloading as ${format}`)
    // Implement download functionality for different formats here
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-4 pb-4 bg-transparent "
    >
      {/* Days input */}
      <div className="flex items-center">
        <label htmlFor="days" className="mr-2 text-xs">
          Кол-во дней для заказа
        </label>
        <input
          id="days"
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          className="border rounded w-12 items-center flex"
          placeholder="15"
        />
      </div>

      {/* Description text */}
      <div className="text-center mx-4">
        <p className="text-xs font-light">
          Объем товара рассчитан на 5 дней продаж
        </p>
      </div>

      {/* Changes input */}
      <div className="flex items-center gap-4 ml-auto">
        <p className="text-xs font-light">Скачать в формате</p>
        <button
          type="button"
          onClick={() => handleDownload('xlsx')}
          className="bg-white text-black px-4 py-1 border-2 rounded-xl border border-black hover:bg-gray-200 text-xs"
        >
          XLSX
        </button>
        <button
          type="button"
          onClick={() => handleDownload('csv')}
          className="bg-white text-black px-4 py-1 border-2 rounded-xl border border-black hover:bg-gray-200 text-xs"
        >
          CSV
        </button>
        <button
          type="button"
          onClick={() => handleDownload('txt')}
          className="bg-white text-black px-4 py-1 border-2 rounded-xl border border-black hover:bg-gray-200 text-xs"
        >
          TXT
        </button>
      </div>
    </form>
  )
}

export default FormTasks
