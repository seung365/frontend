import { useSuspenseQuery } from '@tanstack/react-query'
import { API_ROUTES } from '../../constant/api'
import { BoardResponse } from '../../types/index'
import { authInstance } from '../fetchInstance'

const getBoardDetail = async (boardId: string): Promise<BoardResponse> => {
  const response = await authInstance.get(`/${API_ROUTES.BOARDS}/${boardId}`)
  return response.data
}

const useGetBoardDetail = (boardId: string) => {
  const { data } = useSuspenseQuery({
    queryKey: ['board', boardId],
    queryFn: () => getBoardDetail(boardId),
    staleTime: 0,
  })
  return { data }
}

export default useGetBoardDetail
