import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import NextIcon from '../../assets/icons/next.svg?react'
import PrevIcon from '../../assets/icons/prev.svg?react'
import { BoardCard, Grid, ProfileCard } from '../../components'
import { boardList } from '../../mocks/boardList'
import { profileList } from '../../mocks/profileList'

const Home = () => {
  return (
    <section className='flex flex-col w-full h-full gap-12 py-10 '>
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
      <section>
        <span className='block mb-6 text-main-color text-size-title w-fit rounded-xl'>
          🚀 성장과 도전이 공유되는 공간입니다. 지금 바로 탐험을 시작하세요!
        </span>
        <Grid type='main'>
          {boardList.map((item) => (
            <BoardCard
              key={item.id}
              id={item.id}
              title={item.title}
              content={item.content}
              contentImg={item.contentImg}
              category={item.category}
              date={item.date}
              likeCnt={item.likeCnt}
              commentCnt={item.commentCnt}
              viewCnt={item.viewCnt}
              profileId={item.profileId}
              profileImg={item.profileImg}
              nickname={item.nickname}
            />
          ))}
        </Grid>
      </section>
    </section>
  )
}

export default Home
