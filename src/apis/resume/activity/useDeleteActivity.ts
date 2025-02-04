import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '../../../constant/api'
import { authInstance } from '../../fetchInstance'

const deleteActivity = async ({ id }: { id: number }) => {
  const response = await authInstance.delete(
    `/${API_ROUTES.RESUME}/activities/${id}`,
  )
  console.log(response)
}

const useDeleteActivity = () => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: ({ id }: { id: number }) => deleteActivity({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resume'] })
    },
    onError: (error) => {
      console.error('삭제 실패', error)
    },
  })

  return { mutate }
}

export default useDeleteActivity
