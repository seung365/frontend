import { useQuery } from '@tanstack/react-query'
import { ProfileInfoResponse } from '../../types'
import { publicInstance } from '../fetchInstance'

export const fetchProfileInfo = async (
  profileId?: string,
): Promise<ProfileInfoResponse> => {
  const response = await publicInstance.get<ProfileInfoResponse>(
    `/profile/${profileId}`,
  )
  return response.data
}

export const useFetchProfileInfo = (profileId?: string) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['profileInfo', profileId],
    queryFn: () => fetchProfileInfo(profileId),
  })
  return { data, isPending, isError }
}
