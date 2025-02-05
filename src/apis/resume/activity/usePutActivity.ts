import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '../../../constant/api'
import { Activity } from '../../../types'
import { authInstance } from '../../fetchInstance'

const putActivity = async (activities: Activity[]) => {
  const response = await authInstance.put(
    `/${API_ROUTES.RESUME}/activities`,
    activities,
  )
  return response.data
}

const usePutActivity = () => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (activities: Activity[]) => putActivity(activities),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['resume'],
      })
    },
  })

  return { mutate }
}

export default usePutActivity
