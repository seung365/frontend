import { useChatStore } from '../../../store/ChatStore'
import ChatModal from '../ChatModal'

const FloatingButton = () => {
  const { isOpen, setIsOpen } = useChatStore()

  return (
    <div className='fixed z-50 flex items-center justify-center right-10 bottom-10'>
      <button
        className='flex items-center justify-center text-white transition-shadow duration-300 rounded-full shadow-lg w-14 h-14 bg-main-color hover:shadow-xl'
        onClick={() => setIsOpen(!isOpen)}
      >
        Chat
      </button>
      {isOpen && <ChatModal />}
    </div>
  )
}

export default FloatingButton
