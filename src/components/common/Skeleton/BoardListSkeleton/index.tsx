import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Grid } from '../../../../components'

interface BoardListSkeletonProps {
  type: 'main' | 'profile' | 'board'
}

const BoardListSkeleton = ({ type }: BoardListSkeletonProps) => {
  const count = type === 'main' ? 2 : 3
  return (
    <Grid type={type}>
      {Array.from({ length: count }).map((_, i) => (
        <section
          key={i}
          className='w-auto min-h-[450px] rounded-xl mt-4 flex flex-col'
        >
          <section className='flex-grow-[7] flex-shrink-0 h-4/5 flex flex-col'>
            <div className='w-full h-3/5'>
              <Skeleton className='object-cover w-full h-full rounded-xl' />
            </div>
            <div className='flex flex-col flex-grow gap-2 p-2'>
              <Skeleton className='w-1/4 h-4' />
              <Skeleton className='h-6' />
              <Skeleton count={3} className='h-4' />
            </div>
          </section>
          <section className='flex-grow-[3] flex-shrink-0 p-2 flex flex-col justify-end gap-1'>
            <div className='flex gap-2 overflow-hidden whitespace-nowrap line-clamp-1'>
              <Skeleton className='w-16 h-6 rounded-xl' />
              <Skeleton className='w-16 h-6 rounded-xl' />
            </div>
            <div className='text-size-subbody text-[#898E96] flex justify-between items-center'>
              <div className='flex items-center gap-3'>
                <Skeleton className='w-12 h-4' />
                <Skeleton className='w-12 h-4' />
                <Skeleton className='w-12 h-4' />
              </div>
              <div className='flex items-center gap-1 text-main-black'>
                <Skeleton className='w-4 h-4' />
                <Skeleton className='w-12 h-4' />
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Skeleton circle width={24} height={24} />
              <Skeleton className='w-24 h-4' />
            </div>
          </section>
        </section>
      ))}
    </Grid>
  )
}

export default BoardListSkeleton
