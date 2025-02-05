import useGetChatList from '../../../apis/chat/useGetChatList'
import useGetMyChatList from '../../../apis/chat/useGetMyChatList'
import { EmptyStateMessage, ErrorMessage, Loader } from '../../index'
import ChatBar from '../ChatBar'

interface ChatListProps {
  type: 'all' | 'my'
}

interface ChatRoom {
  roomId: string
  name: string
}

const ChatList = ({ type }: ChatListProps) => {
  const { data: chatRooms, status } = useGetChatList()
  const { data: myChatRooms, status: myStatus } = useGetMyChatList()

  if (type === 'all') {
    if (status === 'pending') {
      return (
        <div className='flex items-center justify-center w-full h-full'>
          <Loader />
        </div>
      )
    }

    if (status === 'error') {
      return <ErrorMessage message='에러가 발생했습니다' />
    }

    if (chatRooms.length === 0) {
      return <EmptyStateMessage message='아직 생성된 채팅방이 없습니다' />
    }
    return (
      <div className='flex flex-col'>
        {chatRooms.map((chat: ChatRoom) => (
          <ChatBar key={chat.roomId} roomId={chat.roomId} name={chat.name} />
        ))}
      </div>
    )
  }

  if (type === 'my') {
    if (myStatus === 'pending') {
      return (
        <div className='flex items-center justify-center w-full h-full'>
          <Loader />
        </div>
      )
    }

    if (myStatus === 'error') {
      return <ErrorMessage message='로그인이 필요합니다' />
    }

    if (!myChatRooms || myChatRooms.length === 0) {
      return <EmptyStateMessage message='참여중인 채팅방이 없습니다' />
    }

    return (
      <div className='flex flex-col'>
        {myChatRooms.map((chat: ChatRoom) => (
          <ChatBar key={chat.roomId} roomId={chat.roomId} name={chat.name} />
        ))}
      </div>
    )
  }

  return null
}

export default ChatList
