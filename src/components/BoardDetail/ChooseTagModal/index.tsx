import { tagType } from '../../../types'
import { Button, Modal } from '../../index'

interface ChooseTagModalProps {
  isOpen: boolean
  onClose: () => void
  tagName: tagType[]
  selectedTags: tagType[]
  onTagSelect: (tag: tagType) => void
}

const ChooseTagModal = ({
  isOpen,
  onClose,
  tagName,
  selectedTags,
  onTagSelect,
}: ChooseTagModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      content={
        <div className='p-5'>
          <h1>태그 선택</h1>
          <div className='flex flex-wrap gap-2 mt-3'>
            {tagName.map((tag) => (
              <Button
                children={tag.tagName}
                key={tag.tagId}
                type='button'
                onClick={() => onTagSelect(tag)}
                theme={
                  selectedTags.some((t) => t.tagId === tag.tagId)
                    ? 'dark'
                    : 'light'
                }
              />
            ))}
          </div>
        </div>
      }
    />
  )
}

export default ChooseTagModal
