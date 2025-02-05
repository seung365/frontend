import { useQuery } from '@tanstack/react-query'
import { API_ROUTES } from '../../constant/api'
import { authInstance } from '../fetchInstance'

const getResume = async (memberId: string) => {
  const response = await authInstance.get(`/${API_ROUTES.RESUMES}/${memberId}`)
  return response.data
}

const useGetResume = (memberId: string) => {
  const { data, status } = useQuery({
    queryKey: ['resume', memberId],
    queryFn: () => getResume(memberId),
  })
  return { data, status }
}

export default useGetResume
