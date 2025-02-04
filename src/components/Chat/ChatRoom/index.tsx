import { useState } from 'react'
import BackArrow from '../../../assets/icons/back-arrow.svg?react'
import { useChatStore } from '../../../store/ChatStore'

const ChatRoom = () => {
  const [message, setMessage] = useState('')
  const { setSelectedChat } = useChatStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      console.log('Send message:', message)
      setMessage('')
    }
  }

  return (
    <div className='flex flex-col h-full'>
      <div className='flex items-center gap-2 p-4 border-b'>
        <button
          onClick={() => setSelectedChat(null)}
          className='p-1 rounded-full hover:bg-gray-100'
        >
          <BackArrow className='w-6 h-6' />
        </button>
        <h2 className='font-semibold'>채팅방</h2>
      </div>
      <div className='flex-1 p-4 space-y-4 overflow-y-auto'>
        {/* 상대방 메시지 */}
        <div className='flex items-start gap-2'>
          <div className='w-8 h-8 overflow-hidden rounded-full'>
            <img
              src='https://via.placeholder.com/32'
              alt='프로필'
              className='object-cover w-full h-full'
            />
          </div>
          <div>
            <div className='bg-gray-100 rounded-lg p-3 max-w-[70%]'>
              <p>안녕하세요! 프로젝트 관련해서 이야기 나누고 싶습니다.</p>
            </div>
            <span className='mt-1 text-xs text-gray-500'>14:30</span>
          </div>
        </div>

        {/* 내 메시지 */}
        <div className='flex items-start justify-end gap-2'>
          <div>
            <div className='bg-blue-500 text-white rounded-lg p-3 max-w-[70%]'>
              <p>네, 좋습니다. 어떤 프로젝트인가요?</p>
            </div>
            <span className='flex justify-end mt-1 text-xs text-gray-500'>
              14:31
            </span>
          </div>
        </div>
      </div>

      {/* 메시지 입력 영역 */}
      <form onSubmit={handleSubmit} className='p-4 border-t'>
        <div className='flex gap-2 '>
          <input
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
            placeholder='메시지를 입력하세요...'
          />
          <button
            type='submit'
            className='px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600'
          >
            전송
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatRoom
