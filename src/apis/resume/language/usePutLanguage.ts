import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '../../../constant/api'
import { Language } from '../../../types'
import { authInstance } from '../../fetchInstance'

const putLanguage = async (languages: Language[]) => {
  const response = await authInstance.put(
    `/${API_ROUTES.RESUME}/languages`,
    languages,
  )
  return response.data
}

const usePutLanguage = () => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (languages: Language[]) => putLanguage(languages),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['resume'],
      })
    },
  })

  return { mutate }
}

export default usePutLanguage
