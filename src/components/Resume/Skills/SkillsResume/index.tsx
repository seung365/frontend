import { useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { UserResume } from '../../../../types'
import { Button } from '../../../index'
import SkillsForm from '../SkillsForm'

interface SkillStackProps {
  register: UseFormRegister<UserResume>
  defaultValues?: string[]
  onSectionSubmit: (data: string[]) => void
}

const SkillsResume = ({
  register,
  defaultValues = [],
  onSectionSubmit,
}: SkillStackProps) => {
  const [isEdit, setIsEdit] = useState(false)
  const [skills, setSkills] = useState<string[]>(defaultValues)

  const handleAddSkill = (skill: string) => {
    const skillIndex = skills.findIndex((s) => s === skill)
    if (skillIndex === -1) {
      const newSkills = [...skills, skill]
      setSkills(newSkills)
      onSectionSubmit(newSkills)
    } else {
      const newSkills = skills.filter((_, index) => index !== skillIndex)
      setSkills(newSkills)
      onSectionSubmit(newSkills)
    }
  }

  const handleSubmit = () => {
    onSectionSubmit(skills)
    setIsEdit(false)
  }

  return (
    <div className='p-8 bg-white rounded-lg shadow-md'>
      {isEdit ? (
        <SkillsForm fields={skills} onAddSkill={handleAddSkill} />
      ) : null}

      {skills.length > 0 && (
        <div className='mb-6'>
          <h3 className='mb-3 text-sm font-medium text-gray-700'>
            보유 기술 스택
          </h3>
          <div className='flex flex-wrap gap-2'>
            {skills.map((skill, index) => (
              <span
                key={index}
                className={`inline-flex items-center px-3 py-1 text-sm rounded-full ${
                  isEdit
                    ? 'bg-main-color text-white'
                    : 'bg-sub-color-2 text-black'
                }`}
              >
                {skill}
                <input
                  type='hidden'
                  {...register(`skills.${index}`)}
                  value={skill}
                />
                {isEdit && (
                  <button
                    type='button'
                    onClick={() => handleAddSkill(skill)}
                    className='ml-2 hover:text-gray-200'
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className='flex justify-end pt-4 border-t border-gray-200'>
        {isEdit ? (
          <Button
            type='button'
            onClick={handleSubmit}
            className='px-6 py-2 text-white rounded-lg bg-main-color hover:bg-main-color/90'
          >
            저장하기
          </Button>
        ) : (
          <Button
            theme='dark'
            type='button'
            onClick={() => setIsEdit(true)}
            className='px-6 py-2 rounded-lg'
          >
            수정하기
          </Button>
        )}
      </div>
    </div>
  )
}

export default SkillsResume
