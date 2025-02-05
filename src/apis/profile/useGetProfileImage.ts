import { useQuery } from '@tanstack/react-query'
import { API_ROUTES } from '../../constant/api'
import { authInstance } from '../fetchInstance'

const getProfileImage = async () => {
  const response = await authInstance.get(
    `/${API_ROUTES.PROFILE}/profile/image`,
  )

  return response.data
}

export const useGetProfileImage = () => {
  const { data, status } = useQuery({
    queryKey: ['profileImage'],
    queryFn: getProfileImage,
  })

  return { data, status }
}

export default useGetProfileImage
