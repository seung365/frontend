import { UseFormRegister } from 'react-hook-form'
import { Button } from '../../../components'
import { UserResume } from '../../../types'

interface LanguageFormProps {
  register: UseFormRegister<UserResume>
  index: number
  onRemove: () => void
}

const LanguageForm = ({ register, index, onRemove }: LanguageFormProps) => {
  return (
    <section className='w-full flex flex-col space-y-4 border-b-[1px] py-4 '>
      <div className='flex w-full gap-2'>
        <div className='w-1/2'>
          {/* 언어 이름 */}
          <label
            htmlFor={`languages.${index}.name`}
            className='block text-sm font-medium'
          >
            언어 이름 <span className='text-red-500'>*</span>
          </label>
          <input
            id={`languages.${index}.name`}
            {...register(`languages.${index}.name`, { required: true })}
            className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color'
            placeholder='언어 이름을 입력하세요 (예: 영어, 일본어)'
          />
        </div>

        {/* 수준 */}
        <div className='w-1/2'>
          <label
            htmlFor={`languages.${index}.level`}
            className='block text-sm font-medium'
          >
            수준 <span className='text-red-500'>*</span>
          </label>
          <input
            id={`languages.${index}.level`}
            {...register(`languages.${index}.level`, { required: true })}
            className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color'
            placeholder='언어 수준을 입력하세요 (예: 기본, 중급, 고급)'
          />
        </div>
      </div>

      <div className='flex gap-2'>
        <Button theme='light' type='button' onClick={onRemove}>
          취소
        </Button>
      </div>
    </section>
  )
}

export default LanguageForm
