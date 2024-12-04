import React from 'react'

interface AddColumnProps {
  columnNames: { key: string; label: string }[]
  activeButtons: Set<string>
  handleColumnToggle: (columnKey: string) => void
}

const AddColumn: React.FC<AddColumnProps> = ({
  columnNames,
  activeButtons,
  handleColumnToggle,
}) => {
  return (
    <div className="space-x-4 flex flex-row mt-2 mb-12 -mr-80 text-xs">
      {columnNames.map(({ key, label }) => (
        <button
          key={key}
          className={`  gap-[2px] px-[34px] py-8 h-[36px] flex flex-col items-center justify-center text-center text-xs font-light rounded-full 
             ${
               activeButtons.has(key)
                 ? 'bg-[#93DF6F] text-black'
                 : 'bg-[#D9D9D9] text-black'
             }`}
          onClick={() => handleColumnToggle(key)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default AddColumn
