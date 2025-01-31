import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '../../constant/api'
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board', boardId] })
      queryClient.invalidateQueries({ queryKey: ['replyComment'] })
    },
  })
  return { mutate }
}

export default usePatchComment
