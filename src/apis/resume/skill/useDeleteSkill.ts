import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '../../../constant/api'
import { authInstance } from '../../fetchInstance'

const deleteSkill = async (id: string) => {
  await authInstance.delete(`/${API_ROUTES.RESUME}/skills/${id}`)
}

const useDeleteSkill = () => {
  const queryClient = useQueryClient()
  const { mutate, status } = useMutation<void, Error, string>({
    mutationFn: (id) => deleteSkill(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['resume'],
      })
    },
  })
  return { mutate, status }
}

export default useDeleteSkill
