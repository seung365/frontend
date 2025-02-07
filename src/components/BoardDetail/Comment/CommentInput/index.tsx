import { useEffect, useRef } from 'react'
import useLoginRedirect from '../../../../hooks/useLoginRedirect'
import { useAuthStore } from '../../../../store/AuthStore'

interface CommentInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onCommentChange: (comment: string) => void
  comment: string
}

/**
 * 댓글을 입력하는 textarea 컴포넌트
 * @description
 * 기본적인 댓글 입력 컴포넌트로, 다음 props를 받아 사용합니다:
 * - placeholder: 입력 전 표시될 안내 텍스트
 * - 기타 textarea HTML 속성들 모두 사용 가능
 */

const CommentInput = ({
  placeholder = '댓글을 입력해 주세요.',
  comment,
  onCommentChange,
}: CommentInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const redirectToLogin = useLoginRedirect()
  const { isLogin } = useAuthStore()

  const handleAutoResize = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  const handleFocus = () => {
    if (!isLogin) {
      textareaRef.current?.blur()
      redirectToLogin()
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      handleAutoResize()
    }
  }, [comment])

  return (
    <div className='w-full'>
      <textarea
        ref={textareaRef}
        value={comment}
        className='w-full p-4 text-base font-normal border border-solid rounded-md resize-none min-h-[60px] cursor-text focus:outline-none focus:border-main-color border-sub-color transition-colors'
        placeholder={placeholder}
        onFocus={handleFocus}
        onChange={(e) => {
          onCommentChange(e.target.value)
          handleAutoResize()
        }}
      />
    </div>
  )
}

export default CommentInput
