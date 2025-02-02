import { useMutation } from '@tanstack/react-query'
import { API_ROUTES } from '../../../constant/api'
import { Experience } from '../../../types'
import { authInstance } from '../../fetchInstance'

const postExperience = async (experience: Experience[]) => {
  await authInstance.post(`/${API_ROUTES.RESUME}/experiences`, experience)
}

const usePostExperience = () => {
  const { mutate, status } = useMutation({
    mutationKey: ['experience'],
    mutationFn: (experience: Experience[]) => postExperience(experience),
  })
  return { mutate, status }
}

export default usePostExperience
