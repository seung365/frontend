import ReactDOM from 'react-dom'
import { useChatStore } from '../../../store/ChatStore'
import ChatList from '../ChatList'
import ChatRoom from '../ChatRoom'

const ChatModal = () => {
  const { setIsOpen, selectedChatId } = useChatStore()

  const modalContent = (
    <div className='fixed flex items-center right-10 bottom-10'>
      <div className='absolute bottom-0 mr-4 bg-white rounded-lg shadow-lg right-12 w-[400px] h-[600px]'>
        <div className='absolute right-[-8px] bottom-3 w-4 h-4 bg-white transform rotate-45' />
        <div className='relative z-10 h-full p-4 bg-white rounded-lg'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='font-semibold'>Messages</h3>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div className='h-[calc(100%-2rem)]'>
            {selectedChatId ? <ChatRoom /> : <ChatList />}
          </div>
        </div>
      </div>
    </div>
  )

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById('modal-root') || document.body,
  )
}

export default ChatModal
