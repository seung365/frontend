const MobileView = () => {
  return (
    <div className='flex items-center justify-center min-h-screen px-4 bg-gray-100'>
      <div className='p-8 text-center bg-white rounded-lg shadow-lg'>
        <h1 className='mb-2 text-2xl font-bold text-main-color'>DevInit</h1>
        <h2 className='mb-4 text-xl font-semibold text-main-color'>
          데스크톱 환경에서 이용해주세요
        </h2>
        <div className='w-16 h-1 mx-auto mb-4 bg-sub-color-2'></div>
        <p className='leading-relaxed text-gray-600'>
          현재 모바일 환경은 지원하지 않습니다. <br />
          데스크톱이나 태블릿으로 접속해주세요.
        </p>
        <div className='mt-6 text-sm text-dark-gray'>
          더 나은 서비스 이용을 위해 <br />
          화면 크기가 더 큰 기기에서 접속해 주시기 바랍니다.
        </div>
      </div>
    </div>
  )
}

export default MobileView
