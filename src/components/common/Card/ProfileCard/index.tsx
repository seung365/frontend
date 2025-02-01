import { Link } from 'react-router-dom'

interface ProfileCardProps {
  profileId: string
  nickname: string
  profileImg: string
  about: string
}

/*
ProfileCard 컴포넌트
-사용자의 프로필을 보여주는 컴포넌트
*/

const ProfileCard = ({
  profileId,
  nickname,
  profileImg,
  about,
}: ProfileCardProps) => {
  return (
    <Link to={`/profile/${profileId}`}>
      <section className='w-full h-80 border-[1px] rounded-xl'>
        <div className='w-full h-1/2'>
          <img
            src={profileImg}
            alt='프로필 이미지'
            className='object-cover w-full h-full cursor-pointer rounded-xl'
          />
        </div>

        <div className='flex flex-col w-full gap-2 p-2 h-1/2'>
          <span className='text-main-black line-clamp-1'>{nickname}</span>
          <p className='text-[14px] text-dark-gray line-clamp-3 min-h-16'>
            {about}
          </p>
        </div>
      </section>
    </Link>
  )
}

export default ProfileCard
