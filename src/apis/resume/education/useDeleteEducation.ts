import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '../../../constant/api'
import { authInstance } from '../../fetchInstance'

const deleteEducation = async ({ id }: { id: number }) => {
  const response = await authInstance.delete(
    `/${API_ROUTES.RESUME}/educations/${id}`,
  )
  return response.data
}

const useDeleteEducation = () => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: ({ id }: { id: number }) => deleteEducation({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resume'] })
    },
    onError: (error) => {
      console.error('삭제 실패', error)
    },
  })

  return { mutate }
}

export default useDeleteEducation
