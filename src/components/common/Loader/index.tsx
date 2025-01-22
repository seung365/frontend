const Loader = () => {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='w-12 h-12 border-4 border-gray-300 rounded-full border-t-main-color animate-spin'></div>
      <span className='ml-3 text-lg text-gray-700'>Loading...</span>
    </div>
  )
}

export default Loader
