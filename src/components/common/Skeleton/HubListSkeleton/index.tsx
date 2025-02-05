import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const HubListSkeleton = ({ isInitialLoading = false }) => {
  const skeletonCount = isInitialLoading ? 9 : 3

  return (
    <div className='grid w-full grid-cols-3 gap-9'>
      {Array.from({ length: skeletonCount }).map((_, i) => {
        return (
          <section key={i} className='w-full mb-4 min-h-50 rounded-xl'>
            <Skeleton
              className='object-cover w-full h-1/2 rounded-xl'
              height='60%'
            />
            <div className='flex flex-col gap-2 p-2'>
              <Skeleton className='rounded-md' height={14} width='60%' />
              <Skeleton className='rounded-md' height={25} count={2} />
            </div>
          </section>
        )
      })}
    </div>
  )
}

export default HubListSkeleton
