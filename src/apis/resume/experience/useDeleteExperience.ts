import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '../../../constant/api'
import { authInstance } from '../../fetchInstance'

const deleteExperience = async (id: number) => {
  await authInstance.delete(`/${API_ROUTES.RESUME}/experiences/${id}`)
}

const useDeleteExperience = () => {
  const queryClient = useQueryClient()
  const { mutate, status } = useMutation({
    mutationFn: (id: number) => deleteExperience(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['resume'],
      })
    },
    onError: (error) => {
      console.error(error)
    },
  })
  return { mutate, status }
}

export default useDeleteExperience
