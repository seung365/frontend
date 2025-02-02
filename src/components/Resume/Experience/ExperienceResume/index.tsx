import { useState } from 'react'
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
  UseFormTrigger,
} from 'react-hook-form'
import usePostExperience from '../../../../apis/resume/experience/usePostExperience'
import { Experience, UserResume } from '../../../../types'
import { Button } from '../../../index'
import ExperienceForm from '../ExperienceForm'

interface ExperienceResumeProps {
  register: UseFormRegister<UserResume>
  onSectionSubmit: (data: Experience[]) => void
  watchedData: Experience[]
  control: Control<UserResume>
  errors: FieldErrors<UserResume>
  trigger: UseFormTrigger<UserResume>
}

const ExperienceResume = ({
  register,
  onSectionSubmit,
  watchedData,
  control,
  errors,
  trigger,
}: ExperienceResumeProps) => {
  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: 'experiences',
  })
  const [isEdit, setIsEdit] = useState(false)
  const { mutate: postExperience } = usePostExperience()

  const handleSectionSubmit = async () => {
    const isValid = await trigger('experiences')
    if (!isValid) {
      return
    }
    postExperience(watchedData)
    onSectionSubmit(watchedData)
    setIsEdit(!isEdit)
  }

  return (
    <div className='p-8 bg-white rounded-lg shadow-md'>
      <div>
        {experienceFields.map((field, index) => (
          <ExperienceForm
            register={register}
            key={field.id}
            index={index}
            isEdit={isEdit}
            watchedData={watchedData}
            onRemove={removeExperience}
            errors={errors}
          />
        ))}
      </div>

      <div className='flex justify-end gap-4 p-3'>
        {isEdit ? (
          <div className='flex gap-4'>
            <Button onClick={handleSectionSubmit}>저장하기</Button>
            <Button
              type='button'
              onClick={() =>
                appendExperience({
                  companyName: '',
                  employmentType: '',
                  position: '',
                  startDate: '',
                  endDate: '',
                  description: '',
                })
              }
              className=' bg-dark-gray'
            >
              경력 추가
            </Button>
          </div>
        ) : (
          <Button type='button' onClick={() => setIsEdit(!isEdit)}>
            수정하기
          </Button>
        )}
      </div>
    </div>
  )
}

export default ExperienceResume
