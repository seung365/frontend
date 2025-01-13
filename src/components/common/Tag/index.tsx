interface TagProps {
  children: string
}

/*
  Tag
  Description:
    - 태그 컴포넌트
    - children을 props로 받아서 사용
*/

const Tag = ({ children }: TagProps) => {
  return (
    <div className='font-medium h-10 p-3 inline-flex rounded-2xl items-center justify-center text-[#886296] bg-sub-color'>
      {children}
    </div>
  )
}

export default Tag
