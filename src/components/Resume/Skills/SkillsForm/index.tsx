import useGetSkill from '../../../../apis/resume/skill/useGetSkill'
import { SKILL_STACKS } from '../../../../constant'
import useSkillSearch from '../../../../hooks/useSkillSearch'
import { Button, SkillDropdown, SkillSearchInput } from '../../../index'

interface SkillsFormProps {
  fields: string[]
  onAddSkill: (skillObj: string) => void
}

const SkillsForm = ({ fields, onAddSkill }: SkillsFormProps) => {
  const { data: skillList } = useGetSkill()
  const {
    searchSkill,
    isDropdownOpen,
    selectedIndex,
    filteredSkills,
    dropdownRef,
    setSearchSkill,
    setIsDropdownOpen,
    handleKeyDown,
    handleSkillSelect,
  } = useSkillSearch(skillList, onAddSkill)
  return (
    <div>
      <div className='mb-6'>
        <div className='relative' ref={dropdownRef}>
          <SkillSearchInput
            value={searchSkill}
            onChange={(value) => {
              setSearchSkill(value)
              setIsDropdownOpen(true)
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsDropdownOpen(true)}
          />
          <SkillDropdown
            isOpen={isDropdownOpen}
            items={filteredSkills}
            selectedIndex={selectedIndex}
            onSelect={handleSkillSelect}
          />
        </div>
      </div>

      <div className='mb-6'>
        <h3 className='mb-3 text-sm font-medium text-gray-700'>
          기술 스택 선택
        </h3>
        <div className='flex flex-wrap gap-2'>
          {SKILL_STACKS.map((skill, index) => {
            const isSelected = fields.some((field) => field === skill)
            return (
              <Button
                type='button'
                key={index}
                theme={isSelected ? 'dark' : 'light'}
                className={'px-4 py-2 rounded-lg transition-all duration-200'}
                onClick={() => onAddSkill(skill)}
              >
                {skill}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SkillsForm
