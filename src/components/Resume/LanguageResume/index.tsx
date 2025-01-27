import { Control, useFieldArray, UseFormRegister } from 'react-hook-form'
import { Button, LanguageForm } from '../../../components'
import { Language, UserResume } from '../../../types'

interface LanguageResumeProps {
  register: UseFormRegister<UserResume>
  control: Control<UserResume>
  getValues: (name: string) => Language[]
  onLanguageSubmit: (data: Language[]) => void
}

const LanguageResume = ({
  control,
  register,
  getValues,
  onLanguageSubmit,
}: LanguageResumeProps) => {
  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control,
    name: 'languages',
  })

  const handleSubmitAllLanguages = () => {
    const languagesData = getValues('languages')
    onLanguageSubmit(languagesData)
  }
  return (
    <section className='flex flex-col w-full gap-3'>
      {languageFields.map((field, index) => (
        <LanguageForm
          key={field.id}
          index={index}
          register={register}
          onRemove={() => removeLanguage(index)}
        />
      ))}
      <div className='flex flex-col items-center w-full gap-4'>
        {languageFields.length !== 0 && (
          <Button
            style={{ width: '20%' }}
            type='button'
            onClick={handleSubmitAllLanguages}
          >
            작성
          </Button>
        )}
        <button
          type='button'
          onClick={() =>
            appendLanguage({
              name: '',
              level: '',
            })
          }
          className='w-1/5 px-4 py-2 mx-auto text-white rounded-lg bg-dark-gray'
        >
          외국어 추가
        </button>
      </div>
    </section>
  )
}

export default LanguageResume
