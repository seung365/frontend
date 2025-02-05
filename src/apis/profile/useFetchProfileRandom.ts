import { useQuery } from '@tanstack/react-query'
import { API_ROUTES } from '../../constant/api'
import { ProfileRandomResponse } from '../../types'
import { publicInstance } from '../fetchInstance'

const fetchProfileRandom = async (): Promise<ProfileRandomResponse> => {
  const response = await publicInstance.get<ProfileRandomResponse>(
    `/${API_ROUTES.PROFILE}/random`,
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
