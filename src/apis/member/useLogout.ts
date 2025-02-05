import { useMutation } from '@tanstack/react-query'
import { authLogoutInstance } from '../fetchInstance'

const postLogout = async (): Promise<void> => {
  await authLogoutInstance.post('/logout')
}

const useLogout = () => {
  const { mutate, status } = useMutation({
    mutationFn: postLogout,
  })

  return { mutate, status }
}

export default useLogout
