import { useRef } from 'react'

interface CommentInputProps {
  placeholder?: string
}

/*
  CommentInput
  Description:
    - 댓글을 입력하는 textarea 컴포넌트
    - placeholder를 props로 받아서 사용
*/

const CommentInput = ({
  placeholder = '댓글을 입력해 주세요.',
}: CommentInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleAutoResize = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  return (
    <div className='w-full max-w-4xl px-4'>
      <textarea
        ref={textareaRef}
        className='w-full p-6 text-xl font-semibold border-2 border-solid rounded-md resize-none h-30 cursor-text focus:outline-none border-sub-color'
        placeholder={placeholder}
        onChange={handleAutoResize}
      />
    </div>
  )
}

export default CommentInput
