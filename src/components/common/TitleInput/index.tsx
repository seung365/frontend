import { useRef } from 'react'

interface TitleInputProps {
  placeholder?: string
}

/*
  TitleInput
  Description:
    - 제목을 입력하는 input 컴포넌트
    - placeholder를 props로 받아서 사용
*/

const TitleInput = ({
  placeholder = '제목을 입력해 주세요.',
}: TitleInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleAutoResize = () => {
    const textarea = textareaRef.current
    if (textarea) {
      if (textarea.scrollHeight > textarea.clientHeight) {
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }
  }

  return (
    <div className='w-full max-w-4xl'>
      <textarea
        ref={textareaRef}
        className='w-full h-16 p-6 text-xl font-semibold rounded-md resize-none cursor-text focus:outline-none'
        placeholder={placeholder}
        onChange={handleAutoResize}
      />
    </div>
  )
}

export default TitleInput
