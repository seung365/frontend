interface ProfileCardProps {
  nickname: string
  profileImg: string
  about: string
}

/*
ProfileCard 컴포넌트
-사용자의 프로필을 보여주는 컴포넌트
*/

const ProfileCard = ({ nickname, profileImg, about }: ProfileCardProps) => {
  return (
    <section className='w-full min-h-72'>
      <img
        src={profileImg}
        alt='프로필 이미지'
        className='object-cover w-full cursor-pointer h-1/2 rounded-xl'
      />
      <div className='flex flex-col gap-2 p-2'>
        <span className='text-main-black line-clamp-1'>{nickname}</span>
        <p className='text-[14px] text-dark-gray line-clamp-3 min-h-16'>
          {about}
        </p>
      </div>
    </section>
  )
}

export default ProfileCard
