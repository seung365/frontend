import { Link } from 'react-router-dom'
import HeartFillIcon from '../../../../assets/icons/heart-fill.svg?react'
import { RouterPath } from '../../../../routes/path'
import { BoardCardType } from '../../../../types'
import formatDateString from '../../../../utils/formatDate'
import StatItem from '../../StatItem'
/*
BardCard 컴포넌트
-메인 페이지, Board 페이지, Profile 페이지에 들어갈 예정
*/

const BoardCard = ({
  id,
  title,
  content,
  thumbnail,
  categoryName,
  createdAt,
  upCnt,
  commentCnt,
  viewCnt,
  profileImage,
  nickName,
  tag,
}: BoardCardType) => {
  return (
    <Link to={`/${RouterPath.board}/${RouterPath.detail}/${id}`}>
      <section className='w-auto h-[480px] rounded-xl border-[1px] flex flex-col'>
        <section className='flex-grow-[7] flex-shrink-0 h-4/5 flex flex-col'>
          {thumbnail && (
            <div className='w-full h-3/5'>
              <img
                src={thumbnail}
                alt='게시글 이미지'
                className='object-cover w-full h-full cursor-pointer rounded-xl'
              />
            </div>
          )}

          <div className='flex flex-col flex-grow gap-2 p-2'>
            <span className='font-semibold text-size-subbody text-main-color'>
              {categoryName}
            </span>
            <span className='text-main-black line-clamp-1'>{title}</span>
            <p className='text-[14px] text-dark-gray line-clamp-4'>{content}</p>
          </div>
        </section>
        <section className='flex-grow-[3] flex-shrink-0 p-2 flex flex-col justify-end gap-1'>
          <div className='flex gap-2 overflow-hidden whitespace-nowrap line-clamp-1'>
            {tag?.map((tag) => (
              <span
                className='px-[4px] py-[2px] rounded-xl text-[10px] text-main-color bg-sub-color'
                key={tag.tagId}
              >
                {tag.tagName}
              </span>
            ))}
          </div>
          <div className='text-size-subbody text-[#898E96] flex justify-between items-center'>
            <div className='flex items-center gap-3'>
              <StatItem label={formatDateString(createdAt)} />
              <StatItem label='댓글' value={commentCnt} />
              <StatItem label='조회수' value={viewCnt} />
            </div>

            <div className='flex items-center gap-1 text-main-black'>
              <HeartFillIcon />
              <StatItem value={upCnt} />
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <img
              className='object-cover w-6 h-6 rounded-full'
              src={profileImage}
              alt='프로필 이미지'
            />
            <span className='text-size-subbody truncate text-[#898E96]'>
              by <b className='text-main-black'>{nickName}</b>
            </span>
          </div>
        </section>
      </section>
    </Link>
  )
}

export default BoardCard
