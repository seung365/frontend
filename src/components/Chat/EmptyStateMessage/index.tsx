const EmptyStateMessage = ({ message }: { message: string }) => (
  <div className='flex flex-col items-center justify-center w-full h-full p-8'>
    <div className='text-center text-gray-500'>
      <p className='mb-2 text-lg'>👋</p>
      <p>{message}</p>
    </div>
  </div>
)

export default EmptyStateMessage
