import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '../../constant/api'
import { BoardResponse } from '../../types'
import { authInstance } from '../fetchInstance'

const patchComment = async ({
  commentId,
  content,
}: {
  commentId: number
  content: string
}) => {
  await authInstance.patch(`/${API_ROUTES.COMMENTS}/${commentId}`, { content })
}

const usePatchComment = (boardId: string, commentId: number) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (content: string) => patchComment({ commentId, content }),
    onSuccess: (_, content) => {
      queryClient.setQueryData(
        ['board', boardId],
        (oldData: BoardResponse) => ({
          ...oldData,
          comment: oldData.comment.map((comment) =>
            comment.id === commentId
              ? { ...comment, content: content }
              : comment,
          ),
        }),
      )
      queryClient.invalidateQueries({ queryKey: ['replyComment'] })
    },
  })
  return { mutate }
}

export default usePatchComment
