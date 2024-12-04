import React from 'react'

interface ButtonProps {
  text: string
  isActive: boolean
}

const Button: React.FC<ButtonProps> = ({ text, isActive }) => {
  const words = text.split(' ')
  const firstLine = words.slice(0, 2).join(' ')
  const secondLine = words.slice(2).join(' ')

  return (
    <button
      className={`px-2 py-1 h-12 flex flex-col items-center justify-center text-center text-xs font-light rounded-full 
      ${isActive ? 'bg-[#93DF6F]' : 'bg-[#D9D9D9]'} whitespace-normal break-words gap-[2px]`}
    >
      <span className="leading-[1.2]">{firstLine}</span>
      {secondLine && (
        <span className="leading-[1.2] -mt-[2px]">{secondLine}</span>
      )}
    </button>
  )
}

export default function ButtonRow() {
  const buttons: ButtonProps[] = [
    { text: 'оборот (шт)', isActive: true },
    { text: 'оборот (руб)', isActive: false },
    { text: 'оборот в себестоимости (руб)', isActive: false },
    { text: 'товарный запас (шт)', isActive: true },
    { text: 'товарный запас (руб)', isActive: true },
    { text: 'товарный запас (дни)', isActive: true },
    { text: 'оборачиваемость последн. заказа (дни)', isActive: true },
    { text: 'входная цена (руб)', isActive: false },
    { text: 'продажная цена (руб)', isActive: false },
  ]

  return (
    <section className="flex flex-wrap gap-1 items-center justify-between font-bold">
      {buttons.map((button, index) => (
        <Button key={index} text={button.text} isActive={button.isActive} />
      ))}
    </section>
  )
}
