import { useMutation } from '@tanstack/react-query'
import { API_ROUTES } from '../../../constant/api'
import { authInstance } from '../../fetchInstance'

const postSkill = async (skill: string[]) => {
  const response = await authInstance.post(`/${API_ROUTES.RESUME}/skills`, {
    skillNames: skill,
  })
  return response.data
}

const usePostSkill = () => {
  const { mutate, status } = useMutation({
    mutationKey: ['skills'],
    mutationFn: (skill: string[]) => postSkill(skill),
  })
  return { mutate, status }
}

export default usePostSkill
