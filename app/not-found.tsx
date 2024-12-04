'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

const ActionButton: React.FC<{
  onClick?: () => void
  href?: string
  label: string
  type?: 'link' | 'button'
}> = ({ onClick, href, label, type = 'link' }) => {
  if (type === 'link' && href) {
    return (
      <Link
        href={href}
        className="inline-flex text-white w-fit bg-malachite-600 hover:bg-malachite-800 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        {label}
      </Link>
    )
  }

  return (
    <button
      onClick={onClick}
      className="inline-flex text-white w-fit bg-malachite-600 hover:bg-malachite-800 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      {label}
    </button>
  )
}

export default function NotFound() {
  const router = useRouter()
  const handleGoBack = () => {
    router.back()
  }

  return (
    <section className="bg-white my-20">
      <div className="py-16 px-6 mx-auto max-w-screen-xl">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-9xl font-extrabold tracking-tight text-red-600">
            404
          </h1>
          <p className="mb-2 text-4xl font-bold tracking-tight text-gray-600">
            К сожалению, мы не можем найти запрошенный ресурс.
          </p>
          <div className="py-12 flex flex-col items-center space-y-4">
            <ActionButton type="button" onClick={handleGoBack} label="Назад" />
            <ActionButton type="link" href="/" label="На главную" />
          </div>
        </div>
      </div>
    </section>
  )
}
