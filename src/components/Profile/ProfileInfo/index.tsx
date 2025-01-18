import { Button, StatItem } from '../../../components'

interface ProfileInfoProps {
  isMyProfile: boolean
  nickName: string
  profileImg: string
  about: string
  boardCnt: number
  followerCnt: number
  followingCnt: number
  boardStatistics: { date: string; board_count: number }[]
}
/**
 * 프로필 정보 컴포넌트
 * isMyProfile 값에 따라 프로필 수정이나 팔로우하기 버튼 같은 요소 처리
 * @description
 */

const ProfileInfo = ({
  isMyProfile,
  nickName,
  profileImg,
  about,
  boardCnt,
  followerCnt,
  followingCnt,
  boardStatistics,
}: ProfileInfoProps) => {
  console.log(boardStatistics)
  return (
    <section>
      <h1 className='mb-3 text-main-black text-size-title text-semibold'>
        👨🏻‍💻 프로필
      </h1>
      <section className='flex w-full gap-4'>
        <section className='flex flex-grow-[3] flex-col items-center justify-center gap-3'>
          <img
            src={profileImg}
            alt={nickName}
            className='object-cover w-40 h-40 rounded-full'
          />
          {!isMyProfile && <Button size='small'>팔로우 하기</Button>}
        </section>

        <section className='flex flex-grow-[7] flex-col gap-4 p-2'>
          <h1 className='text-xl font-semibold text-main-black'>{nickName}</h1>
          <section className='flex gap-4'>
            <StatItem label='게시글' value={boardCnt} />
            <StatItem label='팔로워' value={followerCnt} />
            <StatItem label='팔로잉' value={followingCnt} />
          </section>
          <p className='border-[1px] text-[14px] px-3 py-2 rounded-xl max-w-[500px] h-32 border-main-color overflow-y-auto'>
            {about}
          </p>
        </section>
      </section>
    </section>
  )
}

export default ProfileInfo
