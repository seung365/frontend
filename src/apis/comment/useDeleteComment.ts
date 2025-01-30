import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '../../constant/api'
import { authInstance } from '../fetchInstance'

const deleteComment = async ({
  boardId,
  commentId,
}: {
  boardId: string
  commentId: number
}) => {
  await authInstance.delete(`/${API_ROUTES.COMMENTS}/${commentId}`, {
    data: {
      boardId: Number(boardId), // 명시적으로 숫자로 변환
    },
  })
}

const useDeleteComment = (boardId: string, commentId: number) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: () => deleteComment({ boardId, commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board', boardId] })
      queryClient.invalidateQueries({ queryKey: ['replyComment'] })
    },
  })
  return { mutate }
}

export default useDeleteComment
