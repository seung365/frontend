import { useQuery } from '@tanstack/react-query'
import { API_ROUTES } from '../../constant/api'
import { publicInstance } from '../fetchInstance'

const getChatList = async () => {
  const response = await publicInstance.get(`/${API_ROUTES.CHAT}/rooms`)
  return response.data
}

const useGetChatList = () => {
  const { data, status } = useQuery({
    queryKey: ['chatList'],
    queryFn: getChatList,
  })
  return { data, status }
}

export default useGetChatList
