import { useSuspenseQuery } from '@tanstack/react-query'
import { API_ROUTES } from '../../constant/api'
import { BoardResponse } from '../../types/index'
import { authInstance } from '../fetchInstance'

const getBoardDetail = async (boardId: string): Promise<BoardResponse> => {
  const response = await authInstance.get(`/${API_ROUTES.BOARDS}/${boardId}`)
  console.log('게시글 상세 응답:', response)
  return response.data
}

const useGetBoardDetail = (id: string) => {
  const { data } = useSuspenseQuery({
    queryKey: ['board', id],
    queryFn: () => getBoardDetail(id),
    staleTime: 0,
  })
  return { data }
}

export default useGetBoardDetail
