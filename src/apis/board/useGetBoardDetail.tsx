import { useSuspenseQuery } from '@tanstack/react-query'
import { BoardResponse } from '../../types/index'
import { authInstance } from '../fetchInstance'

const getBoardDetail = async (boardId: number): Promise<BoardResponse> => {
  const response = await authInstance.get(`/board/${boardId}`)
  console.log('게시글 상세 응답:', response)
  return response.data
}

const useGetBoardDetail = (id: string) => {
  const boardId = parseInt(id)
  const { data } = useSuspenseQuery({
    queryKey: ['board', id],
    queryFn: () => getBoardDetail(boardId),
  })
  return { data }
}

export default useGetBoardDetail
