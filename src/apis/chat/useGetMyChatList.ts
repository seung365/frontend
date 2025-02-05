import { useQuery } from '@tanstack/react-query'
import { API_ROUTES } from '../../constant/api'
import { authInstance } from '../fetchInstance'

const getMyChatList = async () => {
  const response = await authInstance.get(`/${API_ROUTES.CHAT}/my-rooms`)
  return response.data
}

const useGetMyChatList = () => {
  const { data, status } = useQuery({
    queryKey: ['myChatList'],
    queryFn: getMyChatList,
  })
  return { data, status }
}

export default useGetMyChatList
