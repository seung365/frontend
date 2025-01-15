import profile from '../../../../assets/icons/profile.svg'

interface CommentBarProps {
  imageUrl?: string
  userName: string
  comment: string
  date: string
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

const CommentBar = ({ imageUrl, userName, comment, date }: CommentBarProps) => {
  return (
    <div className='flex flex-col w-full max-w-4xl gap-3 p-1 px-4 border-b-2'>
      <div className='flex items-center gap-3 align-center'>
        <img src={imageUrl || profile} className='w-8 h-8' />
        <span className='font-semibold'>{userName}</span>
        <span className='text-dark-gray'>{date}</span>
      </div>
      <p>{comment}</p>
    </div>
  )
}

export default CommentBar
