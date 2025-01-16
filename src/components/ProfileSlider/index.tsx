import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import NextIcon from '../../assets/icons/next.svg?react'
import PrevIcon from '../../assets/icons/prev.svg?react'
import { profileList } from '../../mocks/profileList'
import ProfileCard from '../common/Card/ProfileCard'

const ProfileSlider = () => {
  return (
    <section className='relative'>
      <span className='block mb-6 text-main-color text-size-title w-fit rounded-xl '>
        🔥 개발자 프로필을 클릭하여 그들의 여정과 열정을 확인하세요
      </span>
      <div className='absolute left-0 z-10 -translate-y-1/2 top-1/2'>
        <button className='px-4 py-2 text-base rounded-full prev-btn'>
          <PrevIcon fill='#7353EA' />
        </button>
      </div>
      <div className='absolute right-0 z-10 -translate-y-1/2 top-1/2'>
        <button className='px-4 py-2 text-base rounded-full next-btn'>
          <NextIcon fill='#7353EA' />
        </button>
      </div>
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        slidesPerView={4}
        spaceBetween={20}
        loop={true}
        navigation={{
          prevEl: '.prev-btn',
          nextEl: '.next-btn',
        }}
      >
        {profileList.map((profile) => (
          <SwiperSlide key={profile.profileId}>
            <ProfileCard
              profileId={profile.profileId}
              nickname={profile.nickname}
              profileImg={profile.profileImg}
              about={profile.about}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default ProfileSlider
