import { useQuery } from '@tanstack/react-query'
import { publicInstance } from '../fetchInstance'

const getReplyComment = async (commentId: number) => {
  const response = await publicInstance.get(`/comment/${commentId}`)
  return response.data
}

const useGetReplyComment = (commentId: number) => {
  const { data } = useQuery({
    queryKey: ['replyComment', commentId],
    queryFn: () => getReplyComment(commentId),
  })
  return { data }
}

export default useGetReplyComment
