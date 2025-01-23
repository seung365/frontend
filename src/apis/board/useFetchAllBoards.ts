import { useInfiniteQuery } from '@tanstack/react-query'
import useIntersect from '../../hooks/useIntersect'
import { BoardListResponse } from '../../types'
import { publicInstance } from '../fetchInstance'

const fetchAllBoards = async ({
  pageParam = 0,
}: {
  pageParam?: number
}): Promise<BoardListResponse> => {
  const response = await publicInstance.get<BoardListResponse>(
    `/board?size=10&page=${pageParam}`,
  )
  return response.data
}

const useFetchAllBoards = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['AllBoardsList'],
      queryFn: fetchAllBoards,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        return lastPage.number + 1 <= lastPage.totalPages
          ? lastPage.number + 1
          : undefined
      },
    })

  const ref = useIntersect(
    (entry, observer) => {
      observer.unobserve(entry.target)
      if (hasNextPage && !isFetchingNextPage) {
        setTimeout(() => fetchNextPage(), 500)
      }
    },
    { threshold: 1.0 },
  )

  return { data, status, ref, isFetchingNextPage, hasNextPage }
}

export default useFetchAllBoards
