'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Что-то пошло не так!
        </h2>

        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-malachite-600 text-white rounded hover:bg-malachite-700 focus:ring-4 focus:outline-none focus:ring-malachite-300"
        >
          Попробовать снова
        </button>
      </div>
    </div>
  )
}
