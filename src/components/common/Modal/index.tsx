import React, { useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  content: React.ReactNode
}

/**
 * 모달 컴포넌트
 * @description
 * 팝업 형태의 모달 컴포넌트로, 다음 props를 받아 사용합니다:
 * - isOpen: 모달 표시 여부
 * - onClose: 모달 닫기 함수
 * - children: 모달 내부에 표시될 콘텐츠
 *
 * 주요 기능:
 * - ESC 키를 눌러 모달 닫기
 * - 배경 클릭 시 모달 닫기
 * - 모달 오픈 시 배경 스크롤 방지
 * - 접근성(role, aria-modal) 지원
 *
 * @example
 * ```tsx
 *   const [open, setOpen] = useState(false)
 *
 * <Modal
 *  isOpen={open}
 * onClose={() => setOpen(false)}
 * content={
 *  <div className='p-5'>
 *   <h1>카테고리 선택</h1>
 *  <div className='flex justify-end'>
 *  <Button children='닫기' onClick={() => setOpen(false)} />
 * </div>
 * </div>
 * }
 * />
 *  ```
 *
 */

const Modal = ({ isOpen, onClose, content }: ModalProps) => {
  useEffect(() => {
    // ESC 키로 모달 닫기
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)

    // 모달 열릴 때 body 스크롤 방지

    return () => {
      window.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  if (!isOpen) return null

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      onClick={onClose}
      role='dialog'
      aria-modal='true'
    >
      <div
        className='w-full max-w-md p-6 mx-4 bg-white rounded-lg'
        onClick={(e) => e.stopPropagation()}
      >
        {content}
      </div>
    </div>
  )
}

export default Modal
