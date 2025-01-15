interface TitleBarProps {
  title: string
}

const TitleBar = ({ title }: TitleBarProps) => {
  return (
    <div className='w-full pt-2 mt-20 text-6xl font-semibold resize-none cursor-text focus:outline-none'>
      {title}
    </div>
  )
}

export default TitleBar
