import { useMutation } from '@tanstack/react-query'
import { API_ROUTES } from '../../../constant/api'
import { information } from '../../../types/index'
import { authInstance } from '../../fetchInstance'

const postUserInfo = async (userInfo: information) => {
  await authInstance.post(`/${API_ROUTES.RESUME}/information`, userInfo)
}

const usePostUserInfo = () => {
  const { mutate, status } = useMutation({
    mutationKey: ['information'],
    mutationFn: (userInfo: information) => postUserInfo(userInfo),
  })
  return { mutate, status }
}

export default usePostUserInfo
