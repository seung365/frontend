import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { FormValues } from '../../../../pages/BoardWrite'

interface TitleInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  register: UseFormRegister<FormValues>
  setValue: UseFormSetValue<FormValues>
}

/**
 * 제목 입력 컴포넌트
 * @description
 * 게시글 제목을 입력하는 컴포넌트로, 다음 props를 받아서 사용합니다:
 * - placeholder: 입력 전 표시될 안내 텍스트
 * - register: React Hook Form의 필드 등록 함수
 *
 * 자동 높이 조절 기능이 포함된 textarea 컴포넌트입니다.
 */

const TitleInput = ({
  placeholder = '제목을 입력해 주세요.',
  register,
  setValue,
}: TitleInputProps) => {
  const handleAutoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }
  return (
    <div className='w-full mt-8'>
      <textarea
        {...register('title', {
          onChange: (e) => {
            setValue('title', e.target.value)
            handleAutoResize(e)
          },
        })}
        className='w-full px-2 py-4 text-2xl font-medium border rounded-md resize-none border-light-gray cursor-text focus:outline-none'
        placeholder={placeholder}
      />
    </div>
  )
}

export default TitleInput
