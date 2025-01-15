interface TitleBarProps {
  title: string
}

const TitleBar = ({ title }: TitleBarProps) => {
  return (
    <div className='w-full p-2 pt-2 text-3xl font-semibold border-b-2 resize-none border-main-color cursor-text focus:outline-none'>
      {title}
    </div>
  )
}

export default TitleBar
