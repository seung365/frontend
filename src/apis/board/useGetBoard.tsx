import { useSuspenseQuery } from '@tanstack/react-query'
import { BoardResponse } from '../../types/index'
import { authInstance } from '../fetchInstance'

const getBoard = async (
  boardId: number | undefined,
): Promise<BoardResponse> => {
  const response = await authInstance.get(`/board/${boardId}`)
  console.log('게시글 상세 응답:', response)
  return response.data
}

const useGetBoard = (id: string | undefined) => {
  const boardId = id ? parseInt(id) : undefined
  const { data } = useSuspenseQuery({
    queryKey: ['board', boardId],
    queryFn: () => getBoard(boardId),
  })
  return { data }
}

export default useGetBoard
