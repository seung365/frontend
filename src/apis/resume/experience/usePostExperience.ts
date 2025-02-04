import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '../../../constant/api'
import { Experience } from '../../../types'
import { authInstance } from '../../fetchInstance'

const postExperience = async (experience: Experience[]) => {
  await authInstance.post(`/${API_ROUTES.RESUME}/experiences`, experience)
}

const usePostExperience = () => {
  const queryClient = useQueryClient()
  const { mutate, status } = useMutation({
    mutationKey: ['resume'],
    mutationFn: (experience: Experience[]) => postExperience(experience),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['resume'],
      })
    },
  })
  return { mutate, status }
}

export default usePostExperience
