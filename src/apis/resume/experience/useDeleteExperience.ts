import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '../../../constant/api'
import { authInstance } from '../../fetchInstance'

const deleteExperience = async (id: string) => {
  await authInstance.delete(`/${API_ROUTES.RESUME}/experiences/${id}`)
}

const useDeleteExperience = () => {
  const queryClient = useQueryClient()
  const { mutate, status } = useMutation<void, Error, string>({
    mutationFn: (id) => deleteExperience(id),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['experience'],
      })
    },
  })
  return { mutate, status }
}

export default useDeleteExperience
