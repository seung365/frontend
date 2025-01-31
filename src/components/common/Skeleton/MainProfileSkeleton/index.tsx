import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Grid } from '../../../../components'

const MainProfileSkeleton = () => {
  return (
    <Grid type='profile'>
      {Array.from({ length: 4 }).map((_, i) => {
        return (
          <section key={i} className='w-full mt-4 mb-4 min-h-52 rounded-xl'>
            <Skeleton
              className='object-cover w-full h-1/2 rounded-xl'
              height='60%'
            />
            <div className='flex flex-col gap-2 p-2'>
              <Skeleton className='rounded-md' height={14} width='60%' />
              <Skeleton className='rounded-md' height={25} count={3} />
            </div>
          </section>
        )
      })}
    </Grid>
  )
}

export default MainProfileSkeleton
