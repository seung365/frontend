import { useInfiniteQuery } from '@tanstack/react-query'
import useIntersect from '../../hooks/useIntersect'
import { BoardListResponse } from '../../types'
import { publicInstance } from '../fetchInstance'

const fetchProfileBoardList = async (
  memberId: string,
  { pageParam = 0 }: { pageParam?: number },
): Promise<BoardListResponse> => {
  const response = await publicInstance.get<BoardListResponse>(
    `/profile/boards/${memberId}?size=10&page=${pageParam}&sort=DESC`,
  )
  return response.data
}

const useFetchProfileBoardList = (memberId: string) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['ProfileBoardList', memberId],
      queryFn: ({ pageParam = 0 }) =>
        fetchProfileBoardList(memberId, { pageParam }),
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
        setTimeout(() => fetchNextPage(), 700)
      }
    },
    { threshold: 1.0 },
  )

  return { data, status, ref, isFetchingNextPage, hasNextPage }
}

export default useFetchProfileBoardList
