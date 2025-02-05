import { useState } from 'react'
import useDeleteChat from '../../../apis/chat/useDeleteChat'
import useGetChatDetail from '../../../apis/chat/useGetChatDetail'
import BackArrow from '../../../assets/icons/back-arrow.svg?react'
import useChat from '../../../hooks/useChat'
import { useChatStore } from '../../../store/ChatStore'

const ChatRoom = () => {
  const [inputMessage, setInputMessage] = useState('')
  const { selectedChatId, setSelectedChat, selectedChatName } = useChatStore()
  const { data: chatDetail } = useGetChatDetail(selectedChatId as string)
  const { mutate: deleteChat } = useDeleteChat()
  //deleteChat(selectedChatId as string)
  console.log(chatDetail)
  const { messages, sendMessage, error, isConnected } = useChat(
    selectedChatId as string,
  )

  const sendChatMessage = () => {
    if (inputMessage.trim()) {
      sendMessage(inputMessage.trim())
      setInputMessage('')
    }
  }

  const handleSend = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) {
      return
    }

    if (e.key === 'Enter') {
      e.preventDefault()
      if (inputMessage.trim()) {
        sendMessage(inputMessage.trim())
        setInputMessage('')
      }
    }
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center h-full'>
        <div className='text-center text-red-500'>
          <p className='mb-2 text-lg'>⚠️</p>
          <p>로그인이 필요합니다</p>
        </div>
        <button
          onClick={() => setSelectedChat(null)}
          className='px-4 py-2 mt-4 text-blue-500 hover:underline'
        >
          돌아가기
        </button>
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className='flex flex-col items-center justify-center h-full'>
        <div className='text-center text-gray-500'>
          <p className='mb-2 text-lg'>🔄</p>
          <p>채팅 연결 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col h-full overflow-hidden'>
      <div className='flex items-center justify-between gap-2 mb-2'>
        <div className='flex items-center gap-2'>
          <button
            onClick={() => setSelectedChat(null)}
            className='p-2 transition-colors rounded-full hover:bg-gray-100'
          >
            <BackArrow className='w-5 h-5' />
          </button>
          <h3 className='font-medium'>{selectedChatName} 채팅방</h3>
        </div>
        {chatDetail?.ownerNickname === messages[0]?.nickname && (
          <button
            onClick={() => {
              deleteChat(selectedChatId as string)
              setSelectedChat(null)
            }}
            className='px-3 py-1 text-sm text-red-500 border border-red-500 rounded hover:bg-red-50'
          >
            채팅방 삭제
          </button>
        )}
      </div>
      <div className='flex-1 min-h-0 px-4 py-2 overflow-y-auto'>
        {messages.map((msg, index) => (
          <div key={index} className='mb-2'>
            {msg.type === 'ENTER' ? (
              <div className='text-sm text-center text-gray-500'>
                {msg.sender
                  ? `${msg.nickname}님이 입장하셨습니다.`
                  : '새로운 사용자가 입장하셨습니다.'}
              </div>
            ) : (
              <div>
                <strong>{msg.nickname}:</strong> {msg.message}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className='pt-4 mt-auto border-t'>
        <div className='flex gap-2'>
          <input
            type='text'
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleSend}
            className='flex-1 px-3 py-2 border rounded'
            placeholder='메시지를 입력하세요'
          />
          <button
            onClick={sendChatMessage}
            className='px-4 py-2 text-white bg-blue-500 rounded'
          >
            보내기
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatRoom
