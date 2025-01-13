import reactLogo from '../../../assets/icons/profile.svg'

interface CommentBarProps {
  imageUrl?: string
  userName: string
  comment: string
  date: string
}

/*
  CommentBar
  Description:
    - 댓글을 보여주는 컴포넌트
    - imageUrl, userName, comment, date를 props로 받아서 사용
*/

const CommentBar = ({ imageUrl, userName, comment, date }: CommentBarProps) => {
  return (
    <div className='flex flex-col w-full max-w-4xl gap-3 p-1 px-4 border-b-2'>
      <div className='flex items-center gap-3 align-center'>
        <img src={imageUrl || reactLogo} className='w-8 h-8' />
        <span className='font-semibold'>{userName}</span>
        <span className='text-dark-gray'>{date}</span>
      </div>
      <p>{comment}</p>
    </div>
  )
}

export default CommentBar
