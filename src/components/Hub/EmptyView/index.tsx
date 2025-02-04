const EmptyView = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full gap-4 py-20 col-span-full'>
      <span className='text-xl font-bold text-gray-600'>
        등록된 프로필이 없습니다
      </span>
      <p className='text-gray-400'>다른 검색 조건을 선택해보세요</p>
    </div>
  )
}

export default EmptyView
