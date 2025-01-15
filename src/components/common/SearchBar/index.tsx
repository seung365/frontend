import { useState } from 'react'
import SearchCancel from '../../../assets/icons/search-cancel.svg?react'
import SearchIcon from '../../../assets/icons/search.svg?react'

/** 
 * @example
 * SearBar 컴포넌트
 * 검색하고자 하는 내용을 입력하고 엔터를 누르면 검색시에 수행되는 함수 onSearch 실행.

-사용법
export const ParentComponents = () => {
    const onSearch = (search?:string) {
        .... 수행동작
    }

    return <SearchBar placeholder=",,,"  onSearch={onSearch}/>;
}
 */

interface SearchBarProps {
  placeholder?: string
  onSearch: (search?: string) => void
}

const SearchBar = ({
  onSearch,
  placeholder = '검색어를 입력해주세요.',
}: SearchBarProps) => {
  const [search, setSearch] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleCancelClick = () => {
    setSearch('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onSearch && e.key === 'Enter') {
      onSearch(search)
    }
  }
  return (
    <div className='relative w-full h-12 max-w-md'>
      <SearchIcon className='absolute transform -translate-y-1/2 left-3 top-1/2' />
      <input
        type='text'
        placeholder={placeholder}
        value={search}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className='w-full h-full px-10 text-base border rounded-md outline-none cursor-pointer border-light-gray focus:border-main-color'
      />
      {search && (
        <SearchCancel
          className='absolute transform -translate-y-1/2 cursor-pointer right-3 top-1/2'
          onClick={handleCancelClick}
        />
      )}
    </div>
  )
}

export default SearchBar
