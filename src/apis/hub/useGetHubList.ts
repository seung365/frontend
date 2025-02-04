import { useInfiniteQuery } from '@tanstack/react-query'
import { API_ROUTES } from '../../constant/api'
import { publicInstance } from '../fetchInstance'

interface Profile {
  profileId: string
  nickname: string
  about: string
  profileImage: string
  employmentPeriod: string
  skills: string[]
}

interface PageResponse {
  content: Profile[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  first: boolean
  last: boolean
  numberOfElements: number
  empty: boolean
  pageable: {
    offset: number
    pageSize: number
    pageNumber: number
  }
}

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
  queryString: string
}

const getHubList = async ({
  size = 9,
  pageParam = 0,
  queryString = '',
}: getHubListProps): Promise<PageResponse> => {
  const response = await publicInstance.get(
    `/${API_ROUTES.HUB}?size=${size}&page=${pageParam}&${queryString}`,
  )
  return response.data
}

const useGetHubList = (queryString: string) => {
  const { data, hasNextPage, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [...userkeys.lists(), queryString],
      queryFn: ({ pageParam = 0 }) =>
        getHubList({ size: 9, pageParam, queryString }),
      getNextPageParam: (data) => {
        if (data.last) {
          return undefined
        }
        return data.number + 1
      },
      initialPageParam: 0,
    })

  const contents =
    data?.pages.reduce<Profile[]>((acc, page) => {
      return [...acc, ...page.content]
    }, []) ?? []

  return { contents, hasNextPage, status, isFetchingNextPage, fetchNextPage }
}

export default useGetHubList
