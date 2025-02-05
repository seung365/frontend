import { Button, Modal } from '../../index'

interface ChooseTagModalProps {
  isOpen: boolean
  onClose: () => void
  pendingCategory: number | null
  setPendingCategory: (category: number | null) => void
  onConfirm: () => void
}

const WarningModal = ({
  isOpen,
  onClose,
  setPendingCategory,
  onConfirm,
}: ChooseTagModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose()
        setPendingCategory(null)
      }}
      content={
        <div className='p-5'>
          <h1 className='text-xl font-bold'>카테고리 변경</h1>
          <p className='mt-4 text-gray-700'>
            카테고리를 변경하면 현재 작성된 내용이 초기화됩니다.
            계속하시겠습니까?
          </p>
          <div className='flex justify-end gap-2 mt-6'>
            <Button
              children='취소'
              onClick={() => {
                onClose()
                setPendingCategory(null)
              }}
              theme='light'
              type='button'
            />
            <Button children='확인' onClick={onConfirm} type='button' />
          </div>
        </div>
      }
    />
  )
}

export default WarningModal
