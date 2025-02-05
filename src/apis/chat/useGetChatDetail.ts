import { useQuery } from '@tanstack/react-query'
import { API_ROUTES } from '../../constant/api'
import { authInstance } from '../fetchInstance'

const getChatDetail = async (roomId: string) => {
  const response = await authInstance.get(`/${API_ROUTES.CHAT}/room/${roomId}`)
  return response.data
}

const useGetChatDetail = (roomId: string) => {
  const { data, status } = useQuery({
    queryKey: ['chatDetail', roomId],
    queryFn: () => getChatDetail(roomId),
  })
  return { data, status }
}

export default useGetChatDetail
