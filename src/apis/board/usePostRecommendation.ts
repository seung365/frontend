import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '../../constant/api'
import redirectToLogin from '../../hooks/useLoginRedirect'
import { BoardResponse } from '../../types'
import { authInstance } from '../fetchInstance'

const postRecommendation = async (boardId: number) => {
  const response = await authInstance.post(
    `/${API_ROUTES.BOARDS}/${boardId}/recommendation`,
  )
  return response.data
}

const usePostRecommendation = () => {
  const queryClient = useQueryClient()

  const { mutate, status } = useMutation<BoardResponse, Error, number>({
    mutationFn: postRecommendation,
    onSuccess: (_, boardId) => {
      queryClient.setQueryData(
        ['board', String(boardId)],
        (oldData: BoardResponse) => ({
          ...oldData,
          upCnt: oldData.recommended ? oldData.upCnt - 1 : oldData.upCnt + 1,
          recommended: !oldData.recommended,
        }),
      )
    },
    onError: (error) => {
      console.error('추천 에러:', error)
      redirectToLogin()
    },
  })
  return { mutate, status }
}

export default usePostRecommendation
