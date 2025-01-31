import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '../../constant/api'
import { authInstance } from '../fetchInstance'

interface PostCommentRequest {
  boardId: string
  content: string
  parentCommentId: number | null
}

const postComment = async (commentData: PostCommentRequest) => {
  const response = await authInstance.post(
    `/${API_ROUTES.COMMENTS}`,
    commentData,
  )
  return response.data
}

const usePostComment = (id: string, commentId?: number) => {
  const queryClient = useQueryClient()
  const { mutate, status } = useMutation<
    PostCommentRequest,
    Error,
    PostCommentRequest
  >({
    mutationFn: (commentData) => postComment(commentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board', id] })
      if (commentId) {
        queryClient.invalidateQueries({ queryKey: ['replyComment', commentId] })
      }
    },
  })
  return { mutate, status }
}

export default usePostComment
