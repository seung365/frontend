import { useMutation } from '@tanstack/react-query'
import { authInstance } from '../fetchInstance'

const postFollow = async (memberId: string) => {
  await authInstance.post(`/profile/follow/${memberId}`)
}

const usePostFollow = () => {
  const { mutate } = useMutation({
    mutationFn: (memberId: string) => postFollow(memberId),
  })
  return { mutate }
}

export default usePostFollow
