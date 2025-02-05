import { useQuery } from '@tanstack/react-query'
import { API_ROUTES } from '../../../constant/api'
import { ResponseSkills } from '../../../types'
import { authInstance } from '../../fetchInstance'

const getSkill = async () => {
  const response = await authInstance.get(`${API_ROUTES.RESUME}/tags`)
  return response.data
}

const useGetSkill = () => {
  const { data } = useQuery({
    queryKey: ['skills'],
    queryFn: getSkill,
    select: (data) => data.map((skill: ResponseSkills) => skill.name) || [],
  })
  return { data }
}

export default useGetSkill
