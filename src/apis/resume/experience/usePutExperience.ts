import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '../../../constant/api'
import { Experience } from '../../../types'
import { authInstance } from '../../fetchInstance'

const putExperience = async (experience: Experience[]) => {
  await authInstance.put(`/${API_ROUTES.RESUME}/experiences`, experience)
}

const usePutExperience = () => {
  const queryClient = useQueryClient()
  const { mutate, status } = useMutation({
    mutationFn: (experience: Experience[]) => putExperience(experience),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['resume'],
      })
    },
  })
  return { mutate, status }
}

export default usePutExperience
