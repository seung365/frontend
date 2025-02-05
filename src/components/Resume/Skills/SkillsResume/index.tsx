import { useEffect, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import usePatchSkill from '../../../../apis/resume/skill/usePatchSkill'
import { UserResume } from '../../../../types'
import { Button } from '../../../index'
import SkillsForm from '../SkillsForm'

interface SkillStackProps {
  register: UseFormRegister<UserResume>
  defaultValues: string[]
}

const SkillsResume = ({ register, defaultValues }: SkillStackProps) => {
  const [isEdit, setIsEdit] = useState(false)
  const [skills, setSkills] = useState<string[]>([])

  const { mutate: patchSkill } = usePatchSkill()

  useEffect(() => {
    setSkills(defaultValues)
  }, [defaultValues])

  const handleAddSkill = (skill: string) => {
    const skillIndex = skills.findIndex((s) => s === skill)
    if (skillIndex === -1) {
      const newSkills = [...skills, skill]
      setSkills(newSkills)
    } else {
      const newSkills = skills.filter((_, index) => index !== skillIndex)
      setSkills(newSkills)
    }
  }

  const handleSubmit = () => {
    patchSkill(skills)
    setIsEdit(false)
  }
  return (
    <section className='flex flex-col w-full gap-3'>
      {isEdit && (
        <div>
          <SkillsForm fields={skills} onAddSkill={handleAddSkill} />
        </div>
      )}
      <>
        {skills.length > 0 && (
          <div className='p-4 mb-6 border rounded-lg shadow-sm'>
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
      </>

      <div className='flex items-center justify-center border-gray-200'>
        {isEdit ? (
          <Button type='button' onClick={handleSubmit}>
            저장하기
          </Button>
        ) : (
          <>
            {defaultValues.length !== 0 ? (
              <Button
                theme='dark'
                type='button'
                onClick={() => setIsEdit(true)}
              >
                수정하기
              </Button>
            ) : (
              <Button type='button' onClick={() => setIsEdit(true)}>
                기술스택 작성하기
              </Button>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default SkillsResume
