import { useChatStore } from '../../../store/ChatStore'
import ChatModal from '../ChatModal'

const FloatingButton = () => {
  const { isOpen, setIsOpen } = useChatStore()

  return (
    <div>
      <button
        className='fixed flex items-center justify-center rounded-full w-14 h-14 text-main-color bg-sub-color right-10 bottom-10'
        onClick={() => setIsOpen(!isOpen)}
      >
        Chat
      </button>
      {isOpen && <ChatModal />}
    </div>
  )
}

export default FloatingButton
