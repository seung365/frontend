interface TagProps {
  children: string
}

const Tag = ({ children }: TagProps) => {
  return (
    <div className='font-medium h-10 p-3 inline-flex rounded-2xl items-center justify-center text-[#886296] bg-sub-color'>
      {children}
    </div>
  )
}

export default Tag
