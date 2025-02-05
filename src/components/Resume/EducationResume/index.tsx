import { useState } from 'react'
import { Control, useFieldArray, UseFormRegister } from 'react-hook-form'
import useDeleteEducation from '../../../apis/resume/education/useDeleteEducation'
import { Button, EducationDetails, EducationForm } from '../../../components'
import { Education, UserResume } from '../../../types'

interface EducationResumeProps {
  register: UseFormRegister<UserResume>
  watchedData: Education[]
  control: Control<UserResume>
  getValues: (name: string) => Education[]
  onEducationSubmit: (data: Education[]) => void
}

const EducationResume = ({
  control,
  register,
  getValues,
  onEducationSubmit,
  watchedData,
}: EducationResumeProps) => {
  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: 'educations',
  })

  const [isEdit, setIsEdit] = useState<boolean>(false)

  const { mutate: deleteEducation } = useDeleteEducation()

  const handleSubmitAllEducations = () => {
    const educationsData = getValues('educations')
    onEducationSubmit(educationsData)
    setIsEdit(false)
  }

  const handleDelete = (id: number) => {
    deleteEducation({ id })
  }

  return (
    <section className='flex flex-col w-full gap-3'>
      {educationFields.map((field, index) =>
        isEdit ? (
          <EducationForm
            key={field.id}
            index={index}
            register={register}
            onRemove={() => removeEducation(index)}
          />
        ) : (
          <EducationDetails
            key={field.id}
            education={watchedData[index]}
            onDelete={handleDelete}
          />
        ),
      )}
      <div className='flex justify-center gap-4 p-3'>
        {isEdit ? (
          <div className='flex gap-4'>
            {educationFields.length !== 0 && (
              <Button type='button' onClick={handleSubmitAllEducations}>
                저장하기
              </Button>
            )}
            <Button
              type='button'
              onClick={() =>
                appendEducation({
                  organization: '',
                  degree: '',
                  major: '',
                  startDate: '',
                  endDate: '',
                  status: '',
                })
              }
              className='bg-dark-gray'
            >
              교육(학력) 추가
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
                  appendEducation({
                    organization: '',
                    degree: '',
                    major: '',
                    startDate: '',
                    endDate: '',
                    status: '',
                  })
                }}
              >
                교육(학력) 작성하기
              </Button>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default EducationResume
