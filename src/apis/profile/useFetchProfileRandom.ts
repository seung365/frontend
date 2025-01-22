import { useQuery } from '@tanstack/react-query'
import { ProfileRandomResponse } from '../../types'
import { publicInstance } from '../fetchInstance'

const fetchProfileRandom = async (): Promise<ProfileRandomResponse> => {
  const response = await publicInstance.get<ProfileRandomResponse>(
    '/profile/random',
  )
  return response.data
}

const useFetchProfileRandom = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['profileRandom'],
    queryFn: fetchProfileRandom,
  })

  return { data, isPending, isError }
}

export default useFetchProfileRandom
