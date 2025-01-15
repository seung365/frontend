import { Link } from 'react-router-dom'
import HeartFillIcon from '../../../../assets/icons/heart-fill.svg?react'

/*
BardCard 컴포넌트
-메인 페이지, Board 페이지, Profile 페이지에 들어갈 예정
*/

interface BoardCardProps {
  id: string
  title: string
  contentImg: string
  content: string
  category: string
  date: string
  likeCnt: number
  commentCnt: number
  viewCnt: number
  profileId: string
  profileImg: string
  nickname: string
}

const BoardCard = ({
  id,
  title,
  content,
  contentImg,
  category,
  date,
  likeCnt,
  commentCnt,
  viewCnt,
  profileId,
  profileImg,
  nickname,
}: BoardCardProps) => {
  return (
    <Link to={`/board/${category}/${id}`}>
      <section className='w-auto h-auto'>
        <img
          src={contentImg}
          alt='게시글 이미지'
          className='object-cover w-full cursor-pointer h-3/5 rounded-xl'
        />
        <div className='flex flex-col gap-2 p-2'>
          <span className='px-1 py-1 rounded-lg w-fit text-size-subbody bg-sub-color text-main-color'>
            {category}
          </span>
          <span className='text-main-black line-clamp-1'>{title}</span>
          <p className='text-[14px] text-dark-gray line-clamp-3 min-h-16'>
            {content}
          </p>
          <div className='text-size-subbody text-[#898E96] flex justify-between items-center'>
            <div className='flex items-center gap-1'>
              <span>{date}</span>
              <span>·</span>
              <span>{commentCnt}개의 댓글</span>
              <span>·</span>
              <span>조회수 {viewCnt}</span>
            </div>
            <div className='flex items-center gap-1'>
              <HeartFillIcon />
              <span className='text-main-black'>{likeCnt}</span>
            </div>
          </div>
          <Link to={`/profile/${profileId}`}>
            <div className='flex items-center gap-2'>
              <img
                className='object-cover w-8 h-8 rounded-full'
                src={profileImg}
                alt='프로필 이미지'
              />

              <span className='text-size-subbody truncate text-[#898E96]'>
                by <b className='text-main-black'>{nickname}</b>
              </span>
            </div>
          </Link>
        </div>
      </section>
    </Link>
  )
}

export default BoardCard
