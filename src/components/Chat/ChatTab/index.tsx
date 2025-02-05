import { useState } from 'react'
import usePostChat from '../../../apis/chat/usePostChat'
import { useChatStore } from '../../../store/ChatStore'

const ChatTab = () => {
  const { selectedChatTab, setSelectedChatTab } = useChatStore()
  const [isCreating, setIsCreating] = useState(false)
  const [chatName, setChatName] = useState('')
  const { mutate } = usePostChat()

  const handleCreateChat = () => {
    if (chatName.trim()) {
      mutate(chatName)
      setChatName('')
      setIsCreating(false)
    }
  }

  return (
    <div>
      <div className='flex items-center w-full border-b border-gray-200'>
        <button
          onClick={() => setSelectedChatTab('all')}
          className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors duration-200
            ${
              selectedChatTab === 'all'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
        >
          전체 채팅
        </button>
        <button
          onClick={() => setSelectedChatTab('my')}
          className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors duration-200
            ${
              selectedChatTab === 'my'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
        >
          나의 채팅
        </button>
        {!isCreating && (
          <button
            className='flex items-center justify-center w-8 h-8 ml-2 text-white transition-colors bg-blue-500 rounded-full hover:bg-blue-600'
            onClick={() => setIsCreating(true)}
          >
            <span className='text-xl'>+</span>
          </button>
        )}
      </div>
      {isCreating && (
        <div className='flex flex-col items-center gap-2 pb-8 mt-4 mb-2 border-b-2'>
          <span className='text-gray-500'>그룹 채팅 생성</span>
          <div>
            <input
              type='text'
              placeholder='채팅방 이름을 입력하세요'
              className='flex-1 px-3 py-2 border rounded'
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateChat()}
              autoFocus
            />
            <button
              className='p-2 text-gray-500 hover:text-gray-700'
              onClick={() => {
                setIsCreating(false)
                setChatName('')
              }}
            >
              취소
            </button>
            <button
              className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600'
              onClick={handleCreateChat}
            >
              만들기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatTab
