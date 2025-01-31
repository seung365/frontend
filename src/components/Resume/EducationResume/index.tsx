import { Control, useFieldArray, UseFormRegister } from 'react-hook-form'
import { Button, EducationForm } from '../../../components'
import { Education, UserResume } from '../../../types'

interface EducationResumeProps {
  register: UseFormRegister<UserResume>
  control: Control<UserResume>
  getValues: (name: string) => Education[]
  onEducationSubmit: (data: Education[]) => void
}

const EducationResume = ({
  control,
  register,
  getValues,
  onEducationSubmit,
}: EducationResumeProps) => {
  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: 'educations',
  })

  const handleSubmitAllEducations = () => {
    const educationsData = getValues('educations')
    onEducationSubmit(educationsData)
  }
  return (
    <section className='flex flex-col w-full gap-3'>
      {educationFields.map((field, index) => (
        <EducationForm
          key={field.id}
          index={index}
          register={register}
          onRemove={() => removeEducation(index)}
        />
      ))}
      <div className='flex flex-col items-center w-full gap-4'>
        {educationFields.length !== 0 && (
          <Button
            style={{ width: '20%' }}
            type='button'
            onClick={handleSubmitAllEducations}
          >
            작성
          </Button>
        )}

        <button
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
          className='w-1/5 px-4 py-2 mx-auto text-white rounded-lg bg-dark-gray'
        >
          교육(학력) 추가
        </button>
      </div>
    </section>
  )
}

export default EducationResume
