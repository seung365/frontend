import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '../../constant/api'
import { authInstance } from '../fetchInstance'

const deleteChat = async (roomId: string) => {
  await authInstance.delete(`/${API_ROUTES.CHAT}/room/${roomId}`)
}

const useDeleteChat = () => {
  const queryClient = useQueryClient()
  const { mutate, status } = useMutation<void, Error, string>({
    mutationFn: (roomId: string) => deleteChat(roomId),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['chatList'],
      })
      queryClient.invalidateQueries({
        queryKey: ['myChatList'],
      })
    },
  })
  return { mutate, status }
}

export default useDeleteChat
