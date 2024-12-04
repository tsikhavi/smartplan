'use client'
import React, { useState } from 'react'

const FormComponent = () => {
  const [days, setDays] = useState<number | string>('')
  const [changes, setChanges] = useState<number | string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted with:', { days, changes })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-4 pl-60 bg-transparent"
    >
      {/* Days input */}
      <div className="flex items-center">
        <label htmlFor="days" className="mr-2 text-xs">
          Кол-во дней для прогноза
        </label>
        <input
          id="days"
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          className="border rounded w-12"
        />
      </div>

      {/* Changes input */}
      <div className="flex items-center pl-20">
        <label htmlFor="changes" className="mr-2 text-xs">
          Кол-во изменений
        </label>
        <input
          id="changes"
          type="number"
          value={changes}
          onChange={(e) => setChanges(e.target.value)}
          className="border rounded w-12"
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="bg-[#93DF6F] text-black px-4 rounded-full border border-black hover:bg-[#93DF6F]/50 text-xs"
      >
        Принять
      </button>
    </form>
  )
}

export default FormComponent
