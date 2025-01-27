import { UseFormRegister } from 'react-hook-form'
import { UserResume } from '../../../types'
import Button from '../../common/Button'

interface ActivityFormProps {
  register: UseFormRegister<UserResume>
  index: number
  onRemove: () => void
}

const ActivityForm = ({ index, register, onRemove }: ActivityFormProps) => {
  return (
    <section className='space-y-4 border-b-[1px] py-4'>
      {/* 활동명 */}
      <div>
        <label
          htmlFor={`activities.${index}.activityName`}
          className='block text-sm font-medium'
        >
          활동명 <span className='text-red-500'>*</span>
        </label>
        <input
          id={`activities.${index}.activityName`}
          {...register(`activities.${index}.activityName`, { required: true })}
          className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color'
          placeholder='활동명을 입력하세요'
        />
      </div>

      {/* 소속/기관명 */}
      <div>
        <label
          htmlFor={`activities.${index}.organization`}
          className='block text-sm font-medium'
        >
          소속/기관명 <span className='text-red-500'>*</span>
        </label>
        <input
          id={`activities.${index}.organization`}
          {...register(`activities.${index}.organization`, { required: true })}
          className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color'
          placeholder='소속/기관명을 입력하세요'
        />
      </div>

      <div className='flex gap-2'>
        {/* 시작일 */}
        <div className='w-1/2'>
          <label
            htmlFor={`activities.${index}.startDate`}
            className='block text-sm font-medium'
          >
            시작일 (선택)
          </label>
          <input
            id={`activities.${index}.startDate`}
            type='date'
            {...register(`activities.${index}.startDate`)}
            className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color'
          />
        </div>

        {/* 종료일 */}
        <div className='w-1/2'>
          <label
            htmlFor={`activities.${index}.endDate`}
            className='block text-sm font-medium'
          >
            종료일 (선택)
          </label>
          <input
            id={`activities.${index}.endDate`}
            type='date'
            {...register(`activities.${index}.endDate`)}
            className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color'
          />
        </div>
      </div>

      {/* 설명 */}
      <div>
        <label
          htmlFor={`activities.${index}.description`}
          className='block text-sm font-medium'
        >
          설명 <span className='text-red-500'>*</span>
        </label>
        <textarea
          id={`activities.${index}.description`}
          {...register(`activities.${index}.description`, {
            required: true,
          })}
          className='w-full p-2 mt-1 border rounded resize-none focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color h-28'
          placeholder='활동에 대한 설명을 입력하세요'
          rows={4}
        ></textarea>
      </div>

      <div className='flex gap-2'>
        <Button theme='light' type='button' onClick={onRemove}>
          취소
        </Button>
      </div>
    </section>
  )
}

export default ActivityForm
