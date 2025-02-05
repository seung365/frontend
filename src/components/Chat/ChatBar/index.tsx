import { useChatStore } from '../../../store/ChatStore'

interface ChatBarProps {
  roomId: string
  name: string
}

const ChatBar = ({ roomId, name }: ChatBarProps) => {
  const { setSelectedChat, setSelectedChatName } = useChatStore()

  return (
    <div
      className='flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50'
      onClick={() => {
        setSelectedChat(roomId)
        setSelectedChatName(name)
      }}
    >
      <div className='flex items-center gap-3'>
        <div>
          <h3 className='font-semibold'>{name}</h3>
        </div>
      </div>
    </div>
  )
}

export default ChatBar
