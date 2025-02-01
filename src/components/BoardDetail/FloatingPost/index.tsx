import { CopyToClipboard } from 'react-copy-to-clipboard'
import { twMerge } from 'tailwind-merge'
import Heart from '../../../assets/icons/heart.svg?react'

interface FloatingPostProps {
  count: number
  isRecommend: boolean
  onheartClick: () => void
}

/**
 * 플로팅 좋아요/공유 버튼 컴포넌트
 * @description
 * 게시글에 떠있는 좋아요와 공유 버튼을 포함한 컴포넌트로, 다음 props를 받아 사용합니다:
 * - count: 좋아요 수
 * - onHeartClick: 좋아요 버튼 클릭 핸들러 함수
 *
 * @note
 * 위치 지정은 부모 요소를 기준으로 상대적으로 배치되어야 합니다.
 */

const FloatingPost = ({
  count,
  isRecommend,
  onheartClick,
}: FloatingPostProps) => {
  return (
    <div className='fixed z-10 flex flex-col items-center justify-center gap-1 p-2 rounded-full bg-sub-color top-32 right-10'>
      <div className='flex flex-col items-center justify-center gap-1'>
        <button
          onClick={onheartClick}
          className='flex items-center justify-center p-1 bg-white border-2 rounded-full w-11 h-11 hover:opacity-100 opacity-80'
        >
          <Heart
            className={twMerge(
              'w-6 h-6',
              isRecommend ? 'text-main-color' : 'text-gray-400',
            )}
          />
        </button>
        <p>{count}</p>
      </div>
      <CopyToClipboard text={window.location.href}>
        <button className='flex items-center justify-center p-1 text-lg bg-white border-2 rounded-full text-main-color w-11 h-11 hover:opacity-100 opacity-70'>
          Link
        </button>
      </CopyToClipboard>
    </div>
  )
}

export default FloatingPost
