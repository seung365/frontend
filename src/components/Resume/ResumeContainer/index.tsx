import { PropsWithChildren } from 'react'

interface ResumeContainerProps extends PropsWithChildren {
  title: string
  description: string
}

const ResumeContainer = ({
  title,
  description,
  children,
}: ResumeContainerProps) => {
  return (
    <section className='flex flex-col w-full gap-4 pb-4'>
      <section className='w-ful border-b-[1px]'>
        <h1 className='text-[20px] text-board-dark-gray'>{title}</h1>
      </section>
      <p className='p-2 rounded-lg bg-sub-color text-board-dark-gray'>
        {description}
      </p>
      {children}
    </section>
  )
}

export default ResumeContainer
