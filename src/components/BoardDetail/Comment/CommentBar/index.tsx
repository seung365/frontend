import { useState } from 'react'
import profile from '../../../../assets/icons/profile.svg'
import Button from '../../../common/Button'
import CommentInput from '../CommentInput'

interface CommentBarProps {
  imageUrl?: string
  userName: string
  comment: string
  date: string
  onUpdate?: (newComment: string) => void // 댓글 수정 시 호출되는 콜백 함수
}

/**
 * 댓글을 보여주는 컴포넌트
 * @description
 * 사용자 댓글을 표시하는 컴포넌트로, 다음 props를 받아 사용합니다:
 * - imageUrl: 사용자 프로필 이미지 URL
 * - userName: 사용자 이름
 * - comment: 댓글 내용
 * - date: 작성 날짜
 */

const CommentBar = ({
  imageUrl,
  userName,
  comment,
  date,
  onUpdate,
}: CommentBarProps) => {
  const [showReply, setShowReply] = useState(false)
  const [nestedReplyContent, setNestedReplyContent] = useState('')
  const [isEditting, setIsEditting] = useState(false)
  const [editedComment, setEditedComment] = useState(comment)

  const handleUpdate = () => {
    if (editedComment.trim() && onUpdate) {
      onUpdate(editedComment)
      setIsEditting(false)
    }
  }

  const handleCancel = () => {
    setIsEditting(false)
    setEditedComment(comment)
  }

  return (
    <div className='flex flex-col w-full max-w-4xl gap-3 p-1 px-4 '>
      <div className='flex items-center gap-3 align-center'>
        <img src={imageUrl || profile} className='w-8 h-8' />
        <span className='font-bold'>{userName}</span>
        <span className='text-dark-gray'>{date}</span>
        <div className='flex gap-2 text-gray-800'>
          <button onClick={() => setIsEditting(true)} children='수정' />
          <button children='삭제' />
        </div>
      </div>
      {isEditting ? (
        <div>
          <CommentInput
            comment={editedComment}
            onCommentChange={setEditedComment}
          />
          <div className='flex justify-end gap-2'>
            <Button onClick={handleCancel} theme='light'>
              취소
            </Button>
            <Button onClick={handleUpdate}>수정 완료</Button>
          </div>
        </div>
      ) : (
        <p>{comment}</p>
      )}

      <button
        className='flex text-sm font-semibold text-main-color w-fit'
        onClick={() => setShowReply(!showReply)}
        children='+ 답글 달기'
      />
      {showReply && (
        <div className='flex flex-wrap justify-end p-3 border rounded-md border-sub-color-2'>
          <CommentInput
            comment={nestedReplyContent}
            onCommentChange={setNestedReplyContent}
          />
          <Button children='댓글 작성' />
        </div>
      )}
    </div>
  )
}

export default CommentBar
