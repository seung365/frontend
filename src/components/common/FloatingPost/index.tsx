import { CopyToClipboard } from 'react-copy-to-clipboard'
import clip from '../../../assets/icons/clip.svg'
import heart from '../../../assets/icons/heart.svg'

interface FloatingPostProps {
  count: number
  onheartClick?: () => void
}

/*
  FloatingPost
  Description:
    - 좋아요와 공유 버튼을 가지고 있는 컴포넌트
    - count, onheartClick을 props로 받아서 사용
    - onheartClick은 좋아요 버튼을 클릭했을 때 실행되는 함수
    
  - 위치의 경우 부모요소 기준으로 해야해서 수정해야한다.
*/

const FloatingPost = ({ count, onheartClick }: FloatingPostProps) => {
  return (
    <div className='absolute z-10 flex flex-col items-center justify-center gap-1 p-2 rounded-full bg-sub-color top-20 right-10'>
      <div className='flex flex-col items-center justify-center gap-1'>
        <button
          onClick={onheartClick}
          className='flex items-center justify-center p-1 bg-white border-2 rounded-full w-11 h-11 hover:opacity-100 opacity-70'
        >
          <img src={heart} className='w-6 h-6' />
        </button>
        <p>{count}</p>
      </div>
      <CopyToClipboard text={window.location.href}>
        <button className='flex items-center justify-center p-1 bg-white border-2 rounded-full w-11 h-11 hover:opacity-100 opacity-70'>
          <img src={clip} className='w-7 h-7' />
        </button>
      </CopyToClipboard>
    </div>
  )
}

export default FloatingPost
