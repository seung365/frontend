import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '../../../constant/api'
import { Education } from '../../../types'
import { authInstance } from '../../fetchInstance'

const putEducation = async (educations: Education[]) => {
  const response = await authInstance.put(
    `/${API_ROUTES.RESUME}/educations`,
    educations,
  )
  console.log(response.data)
  return response.data
}

const usePutEducation = () => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (educations: Education[]) => putEducation(educations),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['resume'],
      })
    },
  })

  return { mutate }
}

export default usePutEducation
