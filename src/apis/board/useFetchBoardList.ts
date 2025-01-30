import { useInfiniteQuery } from '@tanstack/react-query'
import useIntersect from '../../hooks/useIntersect'
import { BoardListResponse } from '../../types'
import { publicInstance } from '../fetchInstance'

const fetchAllBoards = async ({
  pageParam = 0,
  queryString = '',
}: {
  pageParam?: number
  queryString?: string
}): Promise<BoardListResponse> => {
  const response = await publicInstance.get<BoardListResponse>(
    `/boards?size=10&page=${pageParam}&${queryString}`,
  )
  return response.data
}

const fetchCategoriesBoard = async (
  categoryId: number,
  {
    pageParam = 0,
    queryString = '',
  }: { pageParam?: number; queryString?: string },
): Promise<BoardListResponse> => {
  const response = await publicInstance.get(
    `/boards/category/${categoryId}?size=9&page=${pageParam}&${queryString}`,
  )
  return response.data
}

const useFetchBoardList = (categoryId?: number, queryString?: string) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: categoryId
        ? ['CategoriesBoardList', categoryId, queryString]
        : ['AllBoardsList', queryString],
      queryFn: ({ pageParam = 0 }) =>
        categoryId
          ? fetchCategoriesBoard(categoryId, { pageParam, queryString })
          : fetchAllBoards({ pageParam, queryString }),
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

export default useFetchBoardList
