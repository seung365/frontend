import { useState } from 'react'
import { Control, useFieldArray } from 'react-hook-form'
import { Skills, UserResume } from '../../../../types'
import { Button } from '../../../index'
import SkillsForm from '../SkillsForm'

interface SkillStackProps {
  control: Control<UserResume>
  onSectionSubmit: (data: Skills[]) => void
}

const SkillsResume = ({ control, onSectionSubmit }: SkillStackProps) => {
  const [isEdit, setIsEdit] = useState(false)
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  })

  const handleAddSkill = (skillObj: Skills) => {
    const skillIndex = fields.findIndex(
      (field) => field.skill === skillObj.skill,
    )
    if (skillIndex === -1) {
      append(skillObj)
    } else {
      remove(skillIndex)
    }
  }

  const handleSubmit = () => {
    onSectionSubmit(fields)
    setIsEdit(false)
  }

  return (
    <div className='p-8 bg-white rounded-lg shadow-md'>
      {isEdit ? (
        <SkillsForm fields={fields} onAddSkill={handleAddSkill} />
      ) : null}

      {fields.length > 0 && (
        <div className='mb-6'>
          <h3 className='mb-3 text-sm font-medium text-gray-700'>
            보유 기술 스택
          </h3>
          <div className='flex flex-wrap gap-2'>
            {fields.map((field, index) => (
              <span
                key={field.id}
                className={`inline-flex items-center px-3 py-1 text-sm rounded-full ${
                  isEdit
                    ? 'bg-main-color text-white'
                    : 'bg-sub-color-2 text-black'
                }`}
              >
                {field.skill}
                {isEdit && (
                  <button
                    type='button'
                    onClick={() => remove(index)}
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
