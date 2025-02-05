import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '../../../constant/api'
import { authInstance } from '../../fetchInstance'

const deleteProject = async ({ id }: { id: number }) => {
  await authInstance.delete(`/${API_ROUTES.RESUME}/projects/${id}`)
}

const useDeleteProject = () => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: ({ id }: { id: number }) => deleteProject({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resume'] })
    },
    onError: (error) => {
      console.error('삭제 실패', error)
    },
  })

  return { mutate }
}

export default useDeleteProject
