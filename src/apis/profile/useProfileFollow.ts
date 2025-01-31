import { useMutation } from '@tanstack/react-query'
import { authInstance } from '../fetchInstance'

const postFollow = async (memberId: string) => {
  console.log(memberId)
  const response = await authInstance.post(`/follows/${memberId}`)
  console.log(response)
  return response.data
}

const useProfileFollow = (profileId?: string) => {
  //const queryClient = useQueryClient()
  console.log(profileId)
  const { mutate, status } = useMutation({
    mutationFn: postFollow,
    onSuccess: (data) => {
      //   queryClient.invalidateQueries({
      //     queryKey: ['profileInfo', profileId],
      //   })
      console.log('성공', data)
    },
    onError: (error) => {
      console.error('팔로우 요청 실패', error)
    },
  })

  return { mutate, status }
}

export default useProfileFollow
