interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onFocus: () => void
}

const SearchInput = ({
  value,
  onChange,
  onKeyDown,
  onFocus,
}: SearchInputProps) => {
  return (
    <div className='relative'>
      <input
        placeholder='기술 스택 검색'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        className='w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color'
      />
      <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
        <svg
          className='w-5 h-5 text-gray-400'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
      </div>
    </div>
  )
}

export default SearchInput
