const ErrorComponent = () => {
  return (
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
  )
}

export default ErrorComponent
