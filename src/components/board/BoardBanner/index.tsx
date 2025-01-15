import { BOARD_BANNER_CONTENTS } from '../../../constant'

interface BoardBannerProps {
  pathname: string
}

const BoardBanner = ({ pathname }: BoardBannerProps) => {
  const bannerItem = BOARD_BANNER_CONTENTS.find(
    (item) => item.path === pathname,
  )
  return (
    bannerItem && (
      <section className='flex flex-col items-center justify-center gap-5 w-full p-4 h-36 bg-sub-color rounded-xl text-[#333333]'>
        <h3 className='text-size-title'>{bannerItem.title}</h3>
        <span>{bannerItem.description}</span>
      </section>
    )
  )
}

export default BoardBanner
