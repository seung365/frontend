import useGetSkill from '../../../apis/resume/skill/useGetSkill'
import { CAREER_TERM } from '../../../constant'
import useSkillSearch from '../../../hooks/useSkillSearch'
import { CheckTermType, SortingType } from '../../../types'
import { Button } from '../../index'

interface FilterProps {
  skills: string[]
  sorting: SortingType
  term: CheckTermType
  onSorting: (newSorting: SortingType) => void
  onSkills: (newSkill: string[]) => void
  onTerm: (newTerm: CheckTermType) => void
}

const Filter = ({
  skills,
  sorting,
  term,
  onSkills,
  onSorting,
  onTerm,
}: FilterProps) => {
  const { data } = useGetSkill()

  const handleSkillToggle = (skill: string) => {
    if (skills.includes(skill)) {
      onSkills(skills.filter((s) => s !== skill))
    } else {
      onSkills([...skills, skill])
    }
  }

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
  } = useSkillSearch(data, handleSkillToggle)

  return (
    <div className='border w-[300px] h-[1000px] rounded-xl'>
      <div className='flex flex-col gap-10 p-4 '>
        <div className='flex flex-col gap-2'>
          <span className='text-base font-semibold'>정렬</span>
          <select
            className='w-full h-10 border rounded-lg border-dark-gray'
            onChange={(e) => onSorting(e.target.value as SortingType)}
            value={sorting}
          >
            <option value='latest'>최신순</option>
            <option value='popular'>인기순</option>
          </select>
        </div>
        <div className='flex flex-col gap-2'>
          <span className='text-base font-bold'>기술 검색</span>
          <div className='relative' ref={dropdownRef}>
            <input
              type='text'
              value={searchSkill}
              onChange={(e) => {
                setSearchSkill(e.target.value)
                setIsDropdownOpen(true)
              }}
              onKeyDown={handleKeyDown}
              className='w-full h-10 px-3 border rounded-lg border-dark-gray'
              placeholder='직무 스킬 검색'
            />
            {isDropdownOpen && filteredSkills.length > 0 && (
              <div className='absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg'>
                {filteredSkills.map((skill, index) => (
                  <div
                    key={skill}
                    className={`p-2 cursor-pointer hover:bg- ${
                      selectedIndex === index
                        ? 'bg-main-color text-white'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleSkillSelect(skill)}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='flex flex-wrap gap-3'>
            {skills.map((skill: string) => (
              <Button
                key={skill}
                theme='dark'
                onClick={() => handleSkillToggle(skill)}
              >
                {skill} ⨉
              </Button>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-2 p-4'>
          <span className='text-base font-bold'>재직 기간</span>
          {CAREER_TERM.map((careerTerm: CheckTermType, index: number) => (
            <label key={index} className='flex items-center gap-2'>
              <input
                type='radio'
                name='term'
                value={careerTerm}
                checked={term === careerTerm}
                className='accent-purple-500'
                onChange={() => onTerm(careerTerm)}
              />
              {careerTerm}
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Filter
