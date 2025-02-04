interface DropdownProps {
  isOpen: boolean
  items: string[]
  selectedIndex: number
  onSelect: (item: string) => void
}

const Dropdown = ({
  isOpen,
  items,
  selectedIndex,
  onSelect,
}: DropdownProps) => {
  if (!isOpen || items.length === 0) return null

  return (
    <div className='absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg'>
      {items.map((item, index) => (
        <div
          key={index}
          className={`px-4 py-2 cursor-pointer ${
            index === selectedIndex
              ? 'bg-main-color text-white'
              : 'hover:bg-gray-100'
          }`}
          onClick={() => onSelect(item)}
        >
          {item}
        </div>
      ))}
    </div>
  )
}

export default Dropdown
