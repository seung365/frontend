import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '../../../constant/api'
import { authInstance } from '../../fetchInstance'

const deleteSkill = async (id: string) => {
  await authInstance.delete(`/${API_ROUTES.RESUME}/skill/${id}`)
}

const useDeleteSkill = () => {
  const queryClient = useQueryClient()
  const { mutate, status } = useMutation<void, Error, string>({
    mutationFn: (id) => deleteSkill(id),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['skill'],
      })
    },
  })
  return { mutate, status }
}

export default useDeleteSkill
