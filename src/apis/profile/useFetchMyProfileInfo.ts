import { useQuery } from '@tanstack/react-query'
import { ProfileInfoResponse } from '../../types'
import { authInstance } from '../fetchInstance'

const fetchMyProfileInfo = async (): Promise<ProfileInfoResponse> => {
  const response = await authInstance.get<ProfileInfoResponse>('/profile/me')
  return response.data
}

const useFetchMyProfileInfo = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['MyProfileInfo'],
    queryFn: fetchMyProfileInfo,
  })
  return { data, isPending, isError }
}

export default useFetchMyProfileInfo
