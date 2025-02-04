import React, { useEffect, useState } from 'react'

const useSkillSearch = (
  skillList: string[] = [],
  onSelect: (skill: string) => void,
) => {
  const [searchSkill, setSearchSkill] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const dropdownRef = React.createRef<HTMLDivElement>()

  const filteredSkills = skillList
    ? skillList.filter(
        (skill: string) =>
          skill.toLowerCase().includes(searchSkill.toLowerCase()) &&
          searchSkill.length > 0,
      )
    : []

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  useEffect(() => {
    if (!isDropdownOpen) {
      setSelectedIndex(-1)
    }
  }, [isDropdownOpen])

  const handleSkillSelect = (skill: string) => {
    onSelect(skill)
    setSearchSkill('')
    setIsDropdownOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isDropdownOpen || filteredSkills.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev < filteredSkills.length - 1 ? prev + 1 : prev,
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleSkillSelect(filteredSkills[selectedIndex])
        } else if (
          searchSkill.trim() &&
          skillList.includes(searchSkill.trim())
        ) {
          handleSkillSelect(searchSkill.trim())
        }
        break
      case 'Escape':
        setIsDropdownOpen(false)
        setSelectedIndex(-1)
        break
    }
  }

  return {
    searchSkill,
    isDropdownOpen,
    selectedIndex,
    filteredSkills,
    dropdownRef,
    setSearchSkill,
    setIsDropdownOpen,
    handleKeyDown,
    handleSkillSelect,
  }
}

export default useSkillSearch
