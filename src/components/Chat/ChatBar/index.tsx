import { useChatStore } from '../../../store/ChatStore'

interface ChatBarProps {
  id: number
  profileImg: string
  name: string
  job: string
  lastMessage?: string
  timestamp?: string
}

const ChatBar = ({
  id,
  profileImg,
  name,
  job,
  lastMessage,
  timestamp,
}: ChatBarProps) => {
  const { setSelectedChat } = useChatStore()

  return (
    <div
      className='flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50'
      onClick={() => setSelectedChat(id)}
    >
      <div className='flex items-center gap-3'>
        <div className='w-10 h-10 overflow-hidden rounded-full'>
          <img
            src={profileImg}
            alt={`${name}의 프로필`}
            className='object-cover w-full h-full'
          />
        </div>
        <div>
          <h3 className='font-semibold'>{name}</h3>
          <div className='text-sm text-gray-500'>{job}</div>
          {lastMessage && (
            <p className='text-sm text-gray-600 truncate max-w-[200px]'>
              {lastMessage}
            </p>
          )}
        </div>
      </div>
      {timestamp && <div className='text-sm text-gray-400'>{timestamp}</div>}
    </div>
  )
}

export default ChatBar
