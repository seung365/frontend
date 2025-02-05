import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '../../constant/api'
import { authInstance } from '../fetchInstance'

const postChat = async (chatName: string) => {
  const response = await authInstance.post(`/${API_ROUTES.CHAT}/room`, chatName)
  return response.data
}

const usePostChat = () => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (chatName: string) => postChat(chatName),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['chatList'],
      })
      queryClient.invalidateQueries({
        queryKey: ['myChatList'],
      })
    },
    onError: (error: Error) => {
      console.error(error)
    },
  })
  return { mutate }
}

export default usePostChat
