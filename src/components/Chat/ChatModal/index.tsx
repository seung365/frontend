const ChatModal = () => {
  return (
    <div className='fixed flex items-center right-10 bottom-10'>
      {isOpen && (
        <div className='absolute bottom-0 mr-4 bg-white rounded-lg shadow-lg right-12 w-80'>
          {/* 말풍선 꼬리 */}
          <div className='absolute right-[-8px] bottom-3 w-4 h-4 bg-white transform rotate-45' />

          {/* 채팅 모달 내용 */}
          <div className='relative z-10 p-4 bg-white rounded-lg'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='font-semibold'>Messages</h3>
              <button onClick={() => setIsOpen(false)}>×</button>
            </div>
            {/* 채팅 내용 */}
            <div className='overflow-y-auto h-96'>채팅 내용이 들어갈 자리</div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center justify-center w-10 h-10 rounded-full text-main-color bg-sub-color'
      >
        Chat
      </button>
    </div>
  )
}

export default ChatModal
