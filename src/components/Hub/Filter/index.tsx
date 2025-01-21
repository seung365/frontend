import { CAREER_TERM, SKILL_LIST } from '../../../constant'
import { SortingType, TermType } from '../../../pages/Hub'
import Button from '../../common/Button'

interface FilterProps {
  skills: string[]
  onSorting: (newSorting: SortingType) => void
  onSkills: (newSkill: string) => void
  onTerm: (newTerm: TermType) => void
}

const Filter = ({ skills, onSkills, onSorting, onTerm }: FilterProps) => {
  return (
    <div className='border w-[300px] h-[1000px] rounded-xl'>
      <div className='flex flex-col gap-10 p-4 '>
        <div className='flex flex-col gap-2'>
          <span className='text-base font-bold'>정렬</span>
          <select className='w-full h-10 border rounded-lg border-dark-gray'>
            <option value='' onClick={() => onSorting('최신순')}>
              최신순
            </option>
            <option value='' onClick={() => onSorting('인기순')}>
              인기순
            </option>
          </select>
        </div>
        <div className='flex flex-wrap gap-2'>
          <span className='text-base font-bold'>기술 검색</span>
          <div className='flex flex-wrap gap-3'>
            {SKILL_LIST.map((skill: string) => (
              <Button
                key={skill}
                theme={skills.includes(skill) ? 'dark' : 'light'}
                onClick={() => onSkills(skill)}
              >
                {skill}
              </Button>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-2 p-4'>
          <span className='text-base font-bold'>재직 기간</span>
          {CAREER_TERM.map((term: TermType, index: number) => (
            <label key={index} className='flex items-center gap-2'>
              <input
                type='checkbox'
                name='term'
                value={term}
                className='accent-purple-500'
                onChange={() => onTerm(term)}
              />
              {term}
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Filter
