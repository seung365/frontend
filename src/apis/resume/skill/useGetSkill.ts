import { useQuery } from '@tanstack/react-query'
import { authInstance } from '../../fetchInstance'

const getSkill = async () => {
  const response = await authInstance.get('/tags')
  return response.data
}

const useGetSkill = () => {
  const { data } = useQuery({
    queryKey: ['skill'],
    queryFn: getSkill,
  })
  return data
}

export default useGetSkill
