import { useEffect, useState } from 'react'
import { SetURLSearchParams } from 'react-router-dom'
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
  params: URLSearchParams
  onSearchParams: SetURLSearchParams
  path?: string
}

const SearchBar = ({
  onSearch,
  placeholder = '검색어를 입력해주세요.',
  params,
  onSearchParams,
  path,
}: SearchBarProps) => {
  const [search, setSearch] = useState<string>('')

  useEffect(() => setSearch(''), [path])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleCancelClick = () => {
    setSearch('')
    params.delete('searchContents')
    onSearchParams(params)
  }

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(search)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onSearch && e.key === 'Enter') {
      onSearch(search)
    }
  }
  return (
    <div className='relative w-full h-12 max-w-md'>
      <input
        type='text'
        placeholder={placeholder}
        value={search}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className='w-full h-full pl-10 pr-16 text-base border rounded-md outline-none cursor-pointer border-light-gray focus:border-main-color'
      />
      <SearchIcon
        onClick={handleSearchClick}
        className='absolute transform -translate-y-1/2 cursor-pointer right-3 top-1/2'
      />
      {search && (
        <SearchCancel
          className='absolute transform -translate-y-1/2 cursor-pointer right-10 top-1/2'
          onClick={handleCancelClick}
        />
      )}
    </div>
  )
}

export default SearchBar
