import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '../../../constant/api'
import { authInstance } from '../../fetchInstance'

const patchSkill = async (skill: string[]) => {
  const response = await authInstance.patch(`/${API_ROUTES.RESUME}/skills`, {
    skillNames: skill,
  })
  return response.data
}

const usePatchSkill = () => {
  const queryClient = useQueryClient()
  const { mutate, status } = useMutation({
    mutationKey: ['resume'],
    mutationFn: (skill: string[]) => patchSkill(skill),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['resume'],
      })
    },
  })
  return { mutate, status }
}

export default usePatchSkill
