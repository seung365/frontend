import { useState } from 'react'
import { Control, useFieldArray, UseFormRegister } from 'react-hook-form'
import useDeleteLanguage from '../../../apis/resume/language/useDeleteLanguage'
import { Button, LanguageDetails, LanguageForm } from '../../../components'
import { Language, UserResume } from '../../../types'

interface LanguageResumeProps {
  register: UseFormRegister<UserResume>
  watchedData: Language[]
  control: Control<UserResume>
  getValues: (name: string) => Language[]
  onLanguageSubmit: (data: Language[]) => void
}

const LanguageResume = ({
  control,
  register,
  getValues,
  onLanguageSubmit,
  watchedData,
}: LanguageResumeProps) => {
  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control,
    name: 'languages',
  })

  const [isEdit, setIsEdit] = useState<boolean>(false)

  const { mutate: deleteLanguage } = useDeleteLanguage()

  const handleSubmitAllLanguages = () => {
    const languagesData = getValues('languages')
    onLanguageSubmit(languagesData)
    setIsEdit(false)
  }

  const handleDelete = (id: number) => {
    deleteLanguage({ id })
  }

  return (
    <section className='flex flex-col w-full gap-3'>
      {languageFields.map((field, index) =>
        isEdit ? (
          <LanguageForm
            key={field.id}
            index={index}
            register={register}
            onRemove={() => removeLanguage(index)}
          />
        ) : (
          <LanguageDetails
            key={field.id}
            language={watchedData[index]}
            onDelete={handleDelete}
          />
        ),
      )}
      <div className='flex justify-center gap-4 p-3'>
        {isEdit ? (
          <div className='flex gap-4'>
            {languageFields.length !== 0 && (
              <Button type='button' onClick={handleSubmitAllLanguages}>
                저장하기
              </Button>
            )}
            <Button
              type='button'
              onClick={() =>
                appendLanguage({
                  name: '',
                  level: '',
                })
              }
              className='bg-dark-gray'
            >
              외국어 추가
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
                  appendLanguage({
                    name: '',
                    level: '',
                  })
                }}
              >
                외국어 작성하기
              </Button>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default LanguageResume
