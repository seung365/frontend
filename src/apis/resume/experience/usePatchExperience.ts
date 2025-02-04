import { useMutation } from '@tanstack/react-query'
import { API_ROUTES } from '../../../constant/api'
import { Experience } from '../../../types'
import { authInstance } from '../../fetchInstance'

type patchExperienceProps = {
  experience: Experience
  id: string
}

const patchExperience = async ({ experience, id }: patchExperienceProps) => {
  const response = await authInstance.patch(
    `/${API_ROUTES.RESUME}/experiences/${id}`,
    experience,
  )
  return response.data
}

const usePatchExperience = (id: string) => {
  const { data, status } = useMutation({
    mutationKey: ['experience', id],
    mutationFn: (experience: Experience) => patchExperience({ experience, id }),
  })
  return { data, status }
}

export default usePatchExperience
