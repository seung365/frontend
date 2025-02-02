import { SKILL_STACKS } from '../../../../constant'
import { Button } from '../../../index'

interface SkillsFormProps {
  fields: string[]
  onAddSkill: (skillObj: string) => void
}

const SkillsForm = ({ fields, onAddSkill }: SkillsFormProps) => {
  return (
    <div>
      <div className='mb-6'>
        <div className='relative'>
          <input
            placeholder='기술 스택 검색'
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
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isSelected
                    ? 'bg-main-color text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
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
