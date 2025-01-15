import { UseFormRegister } from 'react-hook-form'
import { FormValues } from '../../../../pages/BoardWrite'

interface TitleInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  register: UseFormRegister<FormValues>
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
}: TitleInputProps) => {
  const handleAutoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.scrollHeight > e.target.clientHeight) {
      e.target.style.height = `${e.target.scrollHeight}px`
    }
  }

  return (
    <div className='w-full'>
      <textarea
        {...register('title')}
        className='w-full p-2 pt-2 text-lg font-semibold border rounded-md resize-none border-light-gray cursor-text focus:outline-none'
        placeholder={placeholder}
        onChange={(e) => {
          register('title').onChange(e)
          handleAutoResize(e)
        }}
      />
    </div>
  )
}

export default TitleInput
