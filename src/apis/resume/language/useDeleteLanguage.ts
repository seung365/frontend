import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '../../../constant/api'
import { authInstance } from '../../fetchInstance'

const deleteLanguage = async ({ id }: { id: number }) => {
  await authInstance.delete(`/${API_ROUTES.RESUME}/languages/${id}`)
}

const useDeleteLanguage = () => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: ({ id }: { id: number }) => deleteLanguage({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resume'] })
    },
    onError: (error) => {
      console.error('삭제 실패', error)
    },
  })

  return { mutate }
}

export default useDeleteLanguage
