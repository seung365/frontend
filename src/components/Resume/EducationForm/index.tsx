import { UseFormRegister } from 'react-hook-form'
import { Button } from '../../../components'
import { UserResume } from '../../../types'

interface EducationFormProps {
  register: UseFormRegister<UserResume>
  index: number
  onRemove: () => void
}

const EducationForm = ({ register, index, onRemove }: EducationFormProps) => {
  return (
    <section className='space-y-4 border-b-[1px] py-4'>
      {/* 학교/기관명 */}
      <div>
        <label
          htmlFor={`educations.${index}.organization`}
          className='block text-sm font-medium'
        >
          학교/기관명 <span className='text-red-500'>*</span>
        </label>
        <input
          id={`educations.${index}.organization`}
          {...register(`educations.${index}.organization`, { required: true })}
          className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color'
          placeholder='학교/기관명을 입력하세요'
        />
      </div>

      {/* 학위 */}
      <div>
        <label
          htmlFor={`educations.${index}.degree`}
          className='block text-sm font-medium'
        >
          학위 <span className='text-red-500'>*</span>
        </label>
        <input
          id={`educations.${index}.degree`}
          {...register(`educations.${index}.degree`, { required: true })}
          className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color'
          placeholder='학위를 입력하세요'
        />
      </div>

      {/* 전공 */}
      <div>
        <label
          htmlFor={`educations.${index}.major`}
          className='block text-sm font-medium'
        >
          전공 <span className='text-red-500'>*</span>
        </label>
        <input
          id={`educations.${index}.major`}
          {...register(`educations.${index}.major`, { required: true })}
          className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color'
          placeholder='전공을 입력하세요'
        />
      </div>
      <div className='flex gap-2'>
        {/* 시작일 */}
        <div className='w-1/2'>
          <label
            htmlFor={`educations.${index}.startDate`}
            className='block text-sm font-medium'
          >
            시작일 (선택)
          </label>
          <input
            id={`educations.${index}.startDate`}
            type='date'
            {...register(`educations.${index}.startDate`, { required: true })}
            className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color'
          />
        </div>

        {/* 종료일 */}
        <div className='w-1/2'>
          <label
            htmlFor={`educations.${index}.endDate`}
            className='block text-sm font-medium'
          >
            종료일 (선택)
          </label>
          <input
            id={`educations.${index}.endDate`}
            type='date'
            {...register(`educations.${index}.endDate`)}
            className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color'
          />
        </div>
      </div>

      {/* 상태 */}
      <div>
        <label
          htmlFor={`educations.${index}.status`}
          className='block text-sm font-medium'
        >
          상태 (선택)
        </label>
        <input
          id={`educations.${index}.status`}
          {...register(`educations.${index}.status`)}
          className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color'
          placeholder='예: 재학 중, 졸업, 휴학 등'
        />
      </div>

      <div className='flex gap-2'>
        <Button theme='light' type='button' onClick={onRemove}>
          취소
        </Button>
      </div>
    </section>
  )
}

export default EducationForm
