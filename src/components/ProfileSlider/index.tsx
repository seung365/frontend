import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import useFetchProfileRandom from '../../apis/profile/useFetchProfileRandom'
import NextIcon from '../../assets/icons/next.svg?react'
import PrevIcon from '../../assets/icons/prev.svg?react'
import { ProfileCardType } from '../../types'
import ProfileCard from '../common/Card/ProfileCard'
import MainProfileSkeleton from '../common/Skeleton/MainProfileSkeleton'

const ProfileSlider = () => {
  const { data, isPending, isError } = useFetchProfileRandom()

  return (
    <section className='relative'>
      <span className='block mb-6 text-main-color text-size-title w-fit rounded-xl '>
        🔥 개발자 프로필을 클릭하여 그들의 여정과 열정을 확인하세요
      </span>
      {isPending ? (
        <MainProfileSkeleton />
      ) : isError ? (
        <div className='flex flex-col items-center justify-center gap-4'>
          <h1 className='text-lg text-red-500'>
            데이터를 불러오는 중 오류가 발생했습니다.
          </h1>
          <button
            className='px-4 py-2 text-white rounded-md bg-main-color'
            onClick={() => window.location.reload()}
          >
            다시 시도하기
          </button>
        </div>
      ) : (
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
          {data?.map((profile: ProfileCardType) => (
            <SwiperSlide key={profile.id}>
              <ProfileCard
                profileId={profile.id}
                nickname={profile.nickname}
                profileImg={profile.profileImage}
                about={profile.about}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
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
    </section>
  )
}

export default ProfileSlider
