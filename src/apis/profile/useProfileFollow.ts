import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authInstance } from '../fetchInstance'

interface FollowCallbacks {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

const postFollow = async (memberId: string) => {
  const response = await authInstance.post(`/follows/${memberId}`)
  return response.data
}

const useProfileFollow = (profileId?: string) => {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (params: { memberId: string; callbacks?: FollowCallbacks }) =>
      postFollow(params.memberId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['profileInfo', profileId],
      })
      variables.callbacks?.onSuccess?.()
    },
    onError: (error: Error, variables) => {
      variables.callbacks?.onError?.(error)
    },
  })

  const mutateFollow = (memberId: string, callbacks?: FollowCallbacks) => {
    mutate({ memberId, callbacks })
  }

  return { mutate: mutateFollow, isPending }
}

export default useProfileFollow
