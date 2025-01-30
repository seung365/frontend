import { useMutation } from '@tanstack/react-query'
import { authInstance } from '../../fetchInstance'

const postSkill = async (skill: string[]) => {
  const response = await authInstance.post('/tags', skill)
  return response.data
}

const usePostSkill = () => {
  const { data, status } = useMutation({
    mutationKey: ['skill'],
    mutationFn: (skill: string[]) => postSkill(skill),
  })
  return { data, status }
}

export default usePostSkill
