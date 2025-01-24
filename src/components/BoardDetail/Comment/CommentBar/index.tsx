import { useState } from 'react'
import useDeleteComment from '../../../../apis/comment/useDeleteComment'
import useGetReplyComment from '../../../../apis/comment/useGetReplyComment'
import usePatchComment from '../../../../apis/comment/usePatchComment'
import usePostComment from '../../../../apis/comment/usePostComment'
import PlusSquareIcon from '../../../../assets/icons/plus-square.svg?react'
import profile from '../../../../assets/icons/profile.svg'
import { Comment } from '../../../../types'
import formatDate from '../../../../utils/formatDate'
import Button from '../../../common/Button'
import CommentInput from '../CommentInput'

interface CommentBarProps {
  imageUrl?: string
  boardId: string
  userName: string
  comment: string
  date: string
  commentMemberId: string
  commentId: number
  commentCnt: number
  depth?: number
}

const CommentBar = ({
  imageUrl,
  boardId,
  userName,
  comment,
  date,
  commentMemberId,
  commentId,
  commentCnt,
  depth = 0,
}: CommentBarProps) => {
  const [putReply, setPutReply] = useState(false)
  const [showReply, setShowReply] = useState(false)
  const [nestedReplyContent, setNestedReplyContent] = useState('')
  const [isEditting, setIsEditting] = useState(false)
  const [editedComment, setEditedComment] = useState<string>(comment)
  const memberId = localStorage.getItem('memberId')

  const { mutate: postComment } = usePostComment(boardId, commentId)
  const { mutate: patchComment } = usePatchComment(boardId, commentId)
  const { mutate: deleteComment } = useDeleteComment(boardId, commentId)

  const { data } = useGetReplyComment(commentId)

  const handleUpdate = () => {
    if (editedComment.trim()) {
      patchComment(editedComment)
      setIsEditting(false)
    }
  }

  const handleCancel = () => {
    setIsEditting(false)
    setEditedComment(comment)
  }

  const handleNestedReply = () => {
    if (nestedReplyContent.trim()) {
      const commentData = {
        content: nestedReplyContent,
        boardId: boardId,
        parentCommentId: commentId,
      }
      postComment(commentData)
      setNestedReplyContent('')
      setShowReply(true)
    }
  }

  const handleReplyClick = () => {
    if (commentCnt > 0) {
      setShowReply(!showReply)
      if (!showReply) {
        setPutReply(true)
      }
    } else {
      setPutReply(!putReply)
      setShowReply(!showReply)
    }
  }

  return (
    <div className='flex flex-col w-full max-w-4xl gap-3 p-1 px-4 '>
      <div className='flex items-center gap-3 align-center'>
        <img src={imageUrl || profile} className='w-8 h-8 rounded-full' />
        <span className='font-bold'>{userName}</span>
        <span className='text-dark-gray'>{date}</span>
        <div className='flex gap-2 text-gray-800'>
          {commentMemberId === memberId ? (
            <>
              <button onClick={() => setIsEditting(true)} children='수정' />
              <button onClick={() => deleteComment()} children='삭제' />
            </>
          ) : null}
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

      {depth < 2 && (
        <button
          className='flex text-sm font-semibold text-main-color w-fit'
          onClick={handleReplyClick}
          children={
            showReply ? (
              '답글 접기'
            ) : commentCnt > 0 ? (
              <div className='flex items-center justify-center gap-2'>
                <PlusSquareIcon className='self-center w-4 h-4' />
                {commentCnt}개의 답글 보기
              </div>
            ) : (
              <div className='flex items-center justify-center gap-2'>
                <PlusSquareIcon className='self-center w-4 h-4' /> 답글 달기
              </div>
            )
          }
        />
      )}

      {showReply && (
        <div className='flex flex-col gap-3 p-3 border rounded-md border-sub-color-2'>
          {putReply && depth < 2 && (
            <div className='flex flex-col gap-2'>
              <CommentInput
                comment={nestedReplyContent}
                onCommentChange={setNestedReplyContent}
                placeholder='답글을 입력해 주세요.'
              />
              <div className='flex justify-end'>
                <Button children='답글 작성' onClick={handleNestedReply} />
              </div>
            </div>
          )}
          <div className='flex flex-col gap-3'>
            {data?.map((reply: Comment) => (
              <CommentBar
                key={reply.id}
                imageUrl={reply.profileImage}
                boardId={boardId}
                userName={reply.nickName}
                comment={reply.content}
                date={formatDate(reply.createdAt)}
                commentMemberId={reply.memberId}
                commentId={reply.id}
                commentCnt={reply.commentCnt}
                depth={depth + 1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CommentBar
