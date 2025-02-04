import ChatBar from '../ChatBar'

interface ChatRoom {
  id: number
  profileImg: string
  name: string
  job: string
  lastMessage?: string
  timestamp?: string
}

const ChatList = () => {
  // 실제로는 API나 store에서 가져올 데이터
  const chatRooms: ChatRoom[] = [
    {
      id: 1,
      profileImg: 'https://via.placeholder.com/40',
      name: '김개발',
      job: 'Frontend Developer',
      lastMessage: '안녕하세요! 프로젝트 관련해서 이야기 나누고 싶습니다.',
      timestamp: '14:30',
    },
    {
      id: 2,
      profileImg: 'https://via.placeholder.com/40',
      name: '이디자인',
      job: 'UX Designer',
      lastMessage: '디자인 시안 검토 부탁드립니다.',
      timestamp: '12:15',
    },
    {
      id: 3,
      profileImg: 'https://via.placeholder.com/40',
      name: '박백엔드',
      job: 'Backend Developer',
      lastMessage: 'API 문서 공유드립니다.',
      timestamp: '어제',
    },
  ]

  return (
    <div className='flex flex-col'>
      {chatRooms.map((chat) => (
        <ChatBar
          id={chat.id}
          key={chat.id}
          profileImg={chat.profileImg}
          name={chat.name}
          job={chat.job}
          lastMessage={chat.lastMessage}
          timestamp={chat.timestamp}
        />
      ))}
    </div>
  )
}

export default ChatList
