import { useMutation } from '@tanstack/react-query'
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
  const { data, status } = useMutation({
    mutationKey: ['experiences'],
    mutationFn: (experience: Experience) => patchExperience(experience),
  })
  return { data, status }
}

export default usePatchExperience
