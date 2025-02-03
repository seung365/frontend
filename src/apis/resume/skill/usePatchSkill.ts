import { useMutation } from '@tanstack/react-query'
import { API_ROUTES } from '../../../constant/api'
import { authInstance } from '../../fetchInstance'

const patchSkill = async (skill: string[]) => {
  const response = await authInstance.patch(`/${API_ROUTES.RESUME}/skills`, {
    skillNames: skill,
  })
  return response.data
}

const usePatchSkill = () => {
  const { mutate, status } = useMutation({
    mutationKey: ['skills'],
    mutationFn: (skill: string[]) => patchSkill(skill),
  })
  return { mutate, status }
}

export default usePatchSkill
