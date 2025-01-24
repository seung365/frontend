import { useState } from 'react'
import { SetURLSearchParams } from 'react-router-dom'

interface UseTagProps {
  params: URLSearchParams
  setSearchParams: SetURLSearchParams
}

const useTag = ({ params, setSearchParams }: UseTagProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleTagSelect = (tag: string) => {
    const isTagSelected = selectedTags.includes(tag)

    const updatedTags = isTagSelected
      ? selectedTags.filter((currentTag) => currentTag !== tag)
      : [...selectedTags, tag]

    setSelectedTags(updatedTags)

    // Update URL parameters
    params.delete('tagNames')
    updatedTags.forEach((tag) => params.append('tagNames', tag))
    setSearchParams(params)
  }

  const clearTags = () => {
    setSelectedTags([])
  }

  return {
    selectedTags,
    handleTagSelect,
    clearTags,
  }
}

export default useTag
