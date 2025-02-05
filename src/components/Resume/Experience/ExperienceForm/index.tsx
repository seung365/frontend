import { FieldErrors, UseFormRegister } from 'react-hook-form'
import useDeleteExperience from '../../../../apis/resume/experience/useDeleteExperience'
import { Button } from '../../../../components'
import { Experience, UserResume } from '../../../../types'
import formatDateForInput from '../../../../utils/formatDateInput'

interface ExperienceFormProps {
  register: UseFormRegister<UserResume>
  index: number
  isEdit: boolean
  watchedData: Experience[]
  onRemove: (index: number) => void
  errors: FieldErrors<UserResume>
}

const ExperienceForm = ({
  register,
  index,
  isEdit,
  watchedData,
  onRemove,
  errors,
}: ExperienceFormProps) => {
  const experience = watchedData[index]
  const { mutate: deleteExperience } = useDeleteExperience()

  return (
    <>
      {isEdit ? (
        <section className='space-y-4 border-b-[1px] py-4'>
          <div>
            <label
              htmlFor={`company-name-${index}`}
              className='block mb-1 text-sm font-medium text-gray-700'
            >
              회사명
            </label>
            <input
              id={`company-name-${index}`}
              type='text'
              className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color'
              {...register(`experiences.${index}.companyName`, {
                required: '회사명을 입력해주세요',
              })}
            />
            {errors.experiences?.[index]?.companyName && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.experiences[index].companyName.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor={`employmentType-${index}`}
              className='block mb-1 text-sm font-medium text-gray-700'
            >
              고용 형태
            </label>
            <input
              id={`employmentType-${index}`}
              type='text'
              className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color'
              {...register(`experiences.${index}.employmentType`, {
                required: '고용 형태를 입력해주세요',
              })}
            />
            {errors.experiences?.[index]?.employmentType && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.experiences[index].employmentType.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor={`position-${index}`}
              className='block mb-1 text-sm font-medium text-gray-700'
            >
              직책
            </label>
            <input
              id={`position-${index}`}
              type='text'
              className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color'
              {...register(`experiences.${index}.position`)}
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label
                htmlFor={`start-date-${index}`}
                className='block mb-1 text-sm font-medium text-gray-700'
              >
                시작일
              </label>
              <input
                id={`start-date-${index}`}
                type='date'
                defaultValue={formatDateForInput(experience?.startDate)}
                className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color'
                {...register(`experiences.${index}.startDate`, {
                  setValueAs: (value: string) => {
                    if (!value) return value
                    return new Date(value).toISOString()
                  },
                })}
              />
            </div>

            <div>
              <label
                htmlFor={`end-date-${index}`}
                className='block mb-1 text-sm font-medium text-gray-700'
              >
                종료일
              </label>
              <div className='space-y-2'>
                <input
                  id={`end-date-${index}`}
                  type='date'
                  defaultValue={formatDateForInput(experience?.startDate)}
                  className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color'
                  {...register(`experiences.${index}.endDate`, {
                    setValueAs: (value: string) => {
                      if (!value) return value
                      return new Date(value).toISOString()
                    },
                    validate: (value) => {
                      const startDate = watchedData[index].startDate
                      if (!value || !startDate) return true
                      return (
                        new Date(value) >= new Date(startDate) ||
                        '종료일은 시작일보다 이후여야 합니다'
                      )
                    },
                  })}
                />
                {errors.experiences?.[index]?.endDate && (
                  <p className='mt-1 text-sm text-red-500'>
                    {errors.experiences[index].endDate.message}
                  </p>
                )}
                <div className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    id={`is-current-${index}`}
                    onChange={(e) => {
                      if (e.target.checked) {
                        const endDateInput = document.getElementById(
                          `end-date-${index}`,
                        ) as HTMLInputElement
                        if (endDateInput) {
                          endDateInput.value = ''
                        }
                      }
                    }}
                    className='w-4 h-4 rounded text-main-color focus:ring-main-color'
                  />
                  <label
                    htmlFor={`is-current-${index}`}
                    className='text-sm text-gray-600'
                  >
                    현재 재직중
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor={`description-${index}`}
              className='block mb-1 text-sm font-medium text-gray-700'
            >
              설명
            </label>
            <textarea
              id={`description-${index}`}
              className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color min-h-[100px]'
              {...register(`experiences.${index}.description`, {
                required: '설명을 입력해주세요',
              })}
            />
            {errors.experiences?.[index]?.description && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.experiences[index].description.message}
              </p>
            )}
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault()
              if (watchedData[index].id) {
                deleteExperience(watchedData[index].id)
              }
              onRemove(index)
            }}
            type='button'
            theme='light'
          >
            취소
          </Button>
        </section>
      ) : (
        <div className='flex flex-col gap-2 p-4 border rounded-lg shadow-sm'>
          <div>
            <h3 className='text-lg font-semibold text-gray-700'>
              {experience?.companyName}
            </h3>
            <p className='text-sm text-gray-600'>
              {`${experience.employmentType} | `}
              {experience?.position}
            </p>
          </div>
          <div className='text-sm text-gray-500'>
            <span>
              {experience?.startDate
                ? new Date(experience.startDate).toLocaleDateString()
                : ' '}
            </span>
            <span className='mx-2'>~</span>
            <span>
              {experience?.endDate
                ? new Date(experience.endDate).toLocaleDateString()
                : '현재 진행 중'}
            </span>
          </div>
          <p className='text-gray-700 whitespace-pre-line'>
            {experience?.description}
          </p>
          {watchedData[index]?.id !== undefined && (
            <div>
              <Button
                theme='light'
                type='button'
                size='small'
                onClick={() => {
                  onRemove(index)
                  if (watchedData[index].id) {
                    deleteExperience(watchedData[index].id)
                  }
                }}
              >
                삭제
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default ExperienceForm
