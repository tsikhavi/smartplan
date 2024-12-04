import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <header className="bg-black">
      <div className="mx-auto flex h-16 w-full px-8 items-center">
        <Link className="block text-teal-600 inline-flex" href="#">
          <span className="sr-only">Home</span>
          <Image
            aria-hidden
            src="/logo.svg"
            alt="File icon"
            width={16}
            height={16}
            className="inline-flex"
          />
          <Image
            aria-hidden
            src="/SmartPlan.svg"
            alt="File icon"
            width={36}
            height={36}
            className="ml-1 inline-flex w-auto h-auto"
          />
        </Link>

        <div className="flex flex-1 items-center justify-end">
          <div className="flex items-center gap-4">
            <div className="flex ">
              <Link
                className="hidden rounded-md  px-5 py-2.5 text-sm font-medium text-malachite-500 transition hover:text-malachite-500/75 sm:block"
                href="#"
              >
                регистрация
              </Link>
            </div>

            <button className="block rounded  p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
