import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authInstance } from '../fetchInstance'

interface FollowCallbacks {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

const deleteFollow = async (memberId: string) => {
  const response = await authInstance.delete(`/follows/${memberId}`)
  return response.data
}

const useProfileUnfollow = (profileId?: string) => {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (params: { memberId: string; callbacks?: FollowCallbacks }) =>
      deleteFollow(params.memberId),
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

export default useProfileUnfollow
