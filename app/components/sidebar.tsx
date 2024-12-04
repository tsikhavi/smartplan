'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

type SidebarItemProps = {
  href: string
  iconSrc: string
  label: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, iconSrc, label }) => {
  const pathname = usePathname() // Get current path
  const isActive = pathname === href

  return (
    <li className="group">
      <Link
        href={href}
        className={clsx(
          'group relative flex flex-col items-center w-full px-2.5 py-2 text-white transition',
          isActive ? 'bg-malachite-500' : 'hover:bg-malachite-500'
        )}
      >
        <Image
          src={iconSrc}
          alt={label}
          width={12}
          height={12}
          className="object-cover w-fit mx-auto h-fit"
        />
        <p className="text-xs text-center">{label}</p>
        <span className="invisible absolute start-full top-1/2 ms-2 -translate-y-1/2 rounded-md inline-flex bg-[#404950] px-2.5 py-2.5 text-xs font-medium text-white group-hover:visible">
          {label}
        </span>
      </Link>
    </li>
  )
}

const Sidebar: React.FC = () => {
  const items = [
    {
      href: '/dashboard/start',
      iconSrc: '/Main_Component.svg',
      label: 'Старт',
    },
    {
      href: '/dashboard/shops',
      iconSrc: '/Shopping_Bag.svg',
      label: 'Продажи',
    },
    {
      href: '/dashboard/analytics',
      iconSrc: '/Prognoz.svg',
      label: 'Прогноз',
    },
    {
      href: '/dashboard/orders',
      iconSrc: '/Checkbox_Check.svg',
      label: 'Заказ',
    },
  ]

  return (
    <div className="flex h-screen w-16 flex-col justify-between bg-[#404950] overflow-x-hidden fixed">
      <ul className="space-y-1 border-gray-100 pt-0">
        {items.map((item, index) => (
          <SidebarItem key={index} {...item} />
        ))}
      </ul>
      <div className="sticky inset-x-0 bottom-0 bg-[#404950] p-0">
        <form action="#">
          <button
            type="submit"
            className="group relative flex flex-col items-center w-full px-2.5 py-2 text-white hover:bg-malachite-500 transition"
          >
            <Image
              src="/Circle_Help.svg"
              alt="тех поддержка"
              width={12}
              height={12}
              className="object-cover w-fit mx-auto h-fit"
            />
            <p className="text-xs text-center text-wrap">тех поддержка</p>
            <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-md inline-flex bg-[#404950] p-1 text-xs font-medium text-white group-hover:visible">
              тех поддержка
            </span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Sidebar
