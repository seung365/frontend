import NoResultIcon from '../../../assets/icons/noResult.svg?react'

const NoResult = () => {
  return (
    <section className='flex flex-col border-[1px] border-sub-color gap-2 rounded-xl items-center justify-center w-full py-4'>
      <h1 className='text-board-dark-gray text-[20px] font-semibold'>
        검색 결과가 없습니다!
      </h1>
      <NoResultIcon />
    </section>
  )
}

export default NoResult
