import { tagType } from '../../../types'

interface TagProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    tagType {}

/**
 * 태그 컴포넌트
 * @description
 *  - 버튼 형태로 태그를 표시하는 컴포넌트
 *  - children을 props로 받아서 사용
 */

const Tag = ({ tagName, ...props }: TagProps) => {
  return (
    <button
      className='font-medium h-7 p-3 inline-flex rounded-2xl items-center justify-center text-[#886296] bg-sub-color'
      {...props}
    >
      {tagName}
    </button>
  )
}

export default Tag
