import { UseFormRegister } from 'react-hook-form'
import { Button } from '../../../components'
import { UserResume } from '../../../types' // Project 타입을 가져옵니다.

interface ProjectFormProps {
  register: UseFormRegister<UserResume>
  index: number
  onRemove: () => void
}

const ProjectForm = ({ register, index, onRemove }: ProjectFormProps) => {
  return (
    <section className='space-y-4 border-b-[1px] py-4'>
      {/* 프로젝트명 */}
      <div>
        <label
          htmlFor={`projects.${index}.projectName`}
          className='block text-sm font-medium'
        >
          프로젝트명 <span className='text-red-500'>*</span>
        </label>
        <input
          id={`projects.${index}.projectName`}
          {...register(`projects.${index}.projectName`, { required: true })}
          className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color'
          placeholder='프로젝트명을 입력하세요'
        />
      </div>

      {/* 프로젝트 설명 */}
      <div>
        <label
          htmlFor={`projects.${index}.description`}
          className='block text-sm font-medium'
        >
          프로젝트 설명 <span className='text-red-500'>*</span>
        </label>
        <textarea
          id={`projects.${index}.description`}
          {...register(`projects.${index}.description`, {
            required: true,
          })}
          className='w-full p-2 mt-1 overflow-y-auto border rounded resize-none focus:outline-none focus:ring-1 focus:ring-main-color focus:border-main-color h-28'
          placeholder='프로젝트에 대한 설명을 입력하세요'
          rows={4}
        ></textarea>
      </div>

      {/* 소속/기관명 */}
      <div>
        <label
          htmlFor={`projects.${index}.organizations`}
          className='block text-sm font-medium'
        >
          소속/기관명 (선택)
        </label>
        <input
          id={`projects.${index}.organizations`}
          {...register(`projects.${index}.organization`)}
          className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-main-color focus:border-main-color'
          placeholder='소속/기관명을 입력하세요'
        />
      </div>

      {/* 시작일 */}
      <div className='flex gap-2'>
        <div className='w-1/2'>
          <label
            htmlFor={`projects.${index}.startDate`}
            className='block text-sm font-medium'
          >
            시작일 (선택)
          </label>
          <input
            id={`projects.${index}.startDate`}
            type='date'
            {...register(`projects.${index}.startDate`, {
              setValueAs: (value) =>
                value ? new Date(value).toISOString() : undefined,
            })}
            className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-main-color focus:border-main-color'
          />
        </div>

        <div className='w-1/2'>
          <label
            htmlFor={`projects.${index}.endDate`}
            className='block text-sm font-medium'
          >
            종료일 (선택)
          </label>
          <input
            id={`projects.${index}.endDate`}
            type='date'
            {...register(`projects.${index}.endDate`, {
              setValueAs: (value) =>
                value ? new Date(value).toISOString() : undefined,
            })}
            className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-main-color focus:border-main-color'
          />
        </div>
      </div>

      {/* 외부 링크 */}
      <div>
        <label
          htmlFor={`projects.${index}.link`}
          className='block text-sm font-medium'
        >
          링크 (선택)
        </label>
        <input
          id={`projects.${index}.link`}
          type='url'
          {...register(`projects.${index}.link`)}
          className='w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-main-color focus:border-main-color'
          placeholder='https://example.com'
        />
      </div>
      <Button theme='light' type='button' onClick={onRemove}>
        취소
      </Button>
    </section>
  )
}

export default ProjectForm
