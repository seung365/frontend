import { useInfiniteQuery } from '@tanstack/react-query'
import profileList from '../../mocks/profileList'

const userkeys = {
  all: ['users'] as const,
  lists: () => [...userkeys.all, 'list'] as const,
  list: (filters: string) => [...userkeys.lists(), filters] as const,
  details: () => [...userkeys.all, 'detail'] as const,
  detail: (id: number) => [...userkeys.details(), id] as const,
}

interface getHubListProps {
  size?: number
  pageParam?: number
}

// const getHubList = async ({ size = 10, pageParam = 0 }: getHubListProps) => {
//   const response = await publicInstance.get(
//     `/${API_ROUTES.HUBS}?size=${size}&page=${pageParam}`,
//   )
//   return response.data
// }

const getMockHubList = async ({ size = 9, pageParam = 0 }: getHubListProps) => {
  const start = pageParam * size
  const end = start + size

  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    data: {
      contents: profileList.slice(start, end),
      totalPages: Math.ceil(profileList.length / size),
      lastPage: end >= profileList.length,
    },
  }
}

const useGetHubList = () => {
  const { data, hasNextPage, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: userkeys.lists(),
      queryFn: ({ pageParam = 0 }) => getMockHubList({ size: 9, pageParam }),
      getNextPageParam: (data, pages) => {
        if (data.data.lastPage) {
          return undefined
        }
        return pages.length + 1
      },
      initialPageParam: 0,
    })
  return { data, hasNextPage, status, isFetchingNextPage, fetchNextPage }
}

export default useGetHubList
