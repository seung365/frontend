import { useState } from 'react'
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
  UseFormTrigger,
} from 'react-hook-form'
import usePutExperience from '../../../../apis/resume/experience/usePutExperience'
import { Experience, UserResume } from '../../../../types'
import { Button } from '../../../index'
import ExperienceForm from '../ExperienceForm'

interface ExperienceResumeProps {
  register: UseFormRegister<UserResume>
  watchedData: Experience[]
  control: Control<UserResume>
  errors: FieldErrors<UserResume>
  trigger: UseFormTrigger<UserResume>
}

const ExperienceResume = ({
  register,
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
  const { mutate: putExperience } = usePutExperience()

  const handleSectionSubmit = async () => {
    const isValid = await trigger('experiences')
    if (!isValid) {
      return
    }
    putExperience(watchedData)
    setIsEdit(!isEdit)
  }

  return (
    <section className='flex flex-col w-full gap-3'>
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

      <div className='flex justify-center gap-4 p-3'>
        {isEdit ? (
          <div className='flex gap-4'>
            {experienceFields.length !== 0 && (
              <Button onClick={handleSectionSubmit}>저장하기</Button>
            )}

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
              className='bg-dark-gray'
            >
              경력 추가
            </Button>
          </div>
        ) : (
          <>
            {watchedData.length !== 0 ? (
              <Button type='button' onClick={() => setIsEdit(!isEdit)}>
                수정하기
              </Button>
            ) : (
              <Button
                type='button'
                onClick={() => {
                  setIsEdit(true)
                  appendExperience({
                    companyName: '',
                    employmentType: '',
                    position: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                  })
                }}
              >
                경력 작성하기
              </Button>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default ExperienceResume
