import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '../../constant/api'
import { authInstance } from '../fetchInstance'

const deleteFollow = async (userId: string) => {
  const response = await authInstance.delete(`/${API_ROUTES.FOLLOWS}/${userId}`)
  return response.data
}

const useDeleteFollow = (profileId: string, id: string) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: () => deleteFollow(profileId),
    onSettled: () => {
      console.log('팔로우 삭제 요청 성공')
      queryClient.invalidateQueries({ queryKey: ['profileInfo', profileId] })
      queryClient.invalidateQueries({ queryKey: ['board', id] })
    },
    onError: (error) => {
      console.error('팔로우 삭제 요청 실패', error)
    },
  })
  return { mutate }
}

export default useDeleteFollow
