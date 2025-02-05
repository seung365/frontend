import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '../../../constant/api'
import { authInstance } from '../../fetchInstance'

const deleteProject = async ({ id }: { id: number }) => {
  const response = await authInstance.delete(
    `/${API_ROUTES.RESUME}/projects/${id}`,
  )
  console.log(response)
}

const useDeleteProject = () => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: ({ id }: { id: number }) => deleteProject({ id }),
    onSuccess: () => {
      // 프로젝트 삭제 후 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['resume'] })
    },
    onError: (error) => {
      console.error('삭제 실패', error)
    },
  })

  return { mutate }
}

export default useDeleteProject
