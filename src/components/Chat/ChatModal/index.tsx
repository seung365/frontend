import { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useChatStore } from '../../../store/ChatStore'
import ChatList from '../ChatList'
import ChatRoom from '../ChatRoom'
import ChatTab from '../ChatTab'

const ChatModal = () => {
  const { setIsOpen, selectedChatId, selectedChatTab, isOpen } = useChatStore()

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleEsc)

    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      window.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, setIsOpen])

  const modalContent = (
    <div className='fixed z-40 flex items-center right-10 bottom-10'>
      <div className='absolute bottom-0 mr-4 bg-slate-200 backdrop-blur-sm rounded-lg shadow-xl right-12 w-[400px] h-[600px] border border-gray-200'>
        <div className='absolute right-[-8px] bottom-3 w-4 h-4 bg-slate-50 transform rotate-45 border-r border-b border-gray-200' />
        <div className='relative z-10 flex flex-col h-full p-4 rounded-lg bg-slate-50/95 backdrop-blur-sm'>
          <div className='flex items-center justify-between'>
            <h3 className='font-semibold text-gray-800'>Messages</h3>
            <button
              onClick={() => setIsOpen(false)}
              className='p-2 text-gray-500 transition-colors hover:text-gray-700'
            >
              ×
            </button>
          </div>
          <div className='flex-1 overflow-hidden'>
            {selectedChatId ? (
              <ChatRoom />
            ) : (
              <div className='flex flex-col h-full'>
                <ChatTab />
                <div className='flex-1 overflow-y-auto'>
                  {selectedChatTab === 'all' ? (
                    <ChatList type='all' />
                  ) : (
                    <ChatList type='my' />
                  )}
                </div>
              </div>
            )}
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
