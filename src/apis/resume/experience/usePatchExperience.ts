import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '../../../constant/api'
import { Experience } from '../../../types'
import { authInstance } from '../../fetchInstance'

const patchExperience = async (experience: Experience) => {
  const response = await authInstance.patch(
    `/${API_ROUTES.RESUME}/experiences/`,
    experience,
  )
  return response.data
}

const usePatchExperience = () => {
  const queryClient = useQueryClient()
  const { mutate, status } = useMutation({
    mutationKey: ['resume'],
    mutationFn: (experience: Experience) => patchExperience(experience),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['resume'],
      })
    },
  })
  return { mutate, status }
}

export default usePatchExperience
