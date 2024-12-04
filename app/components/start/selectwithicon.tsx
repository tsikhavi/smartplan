'use client'

interface SelectProps {
  id: string
  name: string
  options: string[]
  className?: string
  value?: string // Add this
  onChange?: (value: string) => void // Add this
}

const SelectWithIcon: React.FC<SelectProps> = ({
  id,
  name,
  options,
  className = '',
  value,
  onChange,
}) => (
  <div className={`relative ${className}`}>
    <select
      id={id}
      name={name}
      value={value} // Bind value
      onChange={(e) => onChange?.(e.target.value)} // Trigger onChange
      className="appearance-none h-6 rounded-md border-0 py-0 pl-2 pr-8 text-gray-500 text-xs bg-white"
    >
      {options.map((option, index) => (
        <option key={index}>{option}</option>
      ))}
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
        className="h-3 w-3 fill-gray-500"
      >
        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
      </svg>
    </div>
  </div>
)

export default SelectWithIcon
