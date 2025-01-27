import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Experience, UserResume } from '../../../../types'

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
  return (
    <div className='p-6 mb-6 bg-white rounded-lg shadow'>
      {isEdit ? (
        <div className='space-y-4'>
          <div className='form-group'>
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
              {...register(`experiences.${index}.company_name`, {
                required: '회사명을 입력해주세요',
              })}
            />
            {errors.experiences?.[index]?.company_name && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.experiences[index].company_name.message}
              </p>
            )}
          </div>

          <div className='form-group'>
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
            <div className='form-group'>
              <label
                htmlFor={`start-date-${index}`}
                className='block mb-1 text-sm font-medium text-gray-700'
              >
                시작일
              </label>
              <input
                id={`start-date-${index}`}
                type='date'
                className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color'
                {...register(`experiences.${index}.start_date`)}
              />
            </div>

            <div className='form-group'>
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
                  className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color'
                  {...register(`experiences.${index}.end_date`, {
                    validate: (value) => {
                      const startDate = watchedData[index].start_date
                      if (!value || !startDate) return true
                      return (
                        new Date(value) >= new Date(startDate) ||
                        '종료일은 시작일보다 이후여야 합니다'
                      )
                    },
                  })}
                />
                {errors.experiences?.[index]?.end_date && (
                  <p className='mt-1 text-sm text-red-500'>
                    {errors.experiences[index].end_date.message}
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

          <div className='form-group'>
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
          <button
            onClick={() => onRemove(index)}
            className='px-3 py-1 text-sm text-red-600 rounded hover:text-red-800 hover:bg-red-50'
          >
            삭제
          </button>
        </div>
      ) : (
        <div className='space-y-3'>
          <div className='flex items-start justify-between'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900'>
                {experience?.company_name}
              </h3>
              <p className='text-gray-600 text-md'>{experience?.position}</p>
            </div>
            <button
              onClick={() => onRemove(index)}
              className='px-3 py-1 text-sm text-red-600 rounded hover:text-red-800 hover:bg-red-50'
            >
              삭제
            </button>
          </div>

          <div className='text-sm text-gray-500'>
            <span>{experience?.start_date}</span>
            <span className='mx-2'>~</span>
            <span>{experience?.end_date || '현재 진행 중'}</span>
          </div>

          <p className='text-gray-700 whitespace-pre-line'>
            {experience?.description}
          </p>
        </div>
      )}
    </div>
  )
}

export default ExperienceForm
