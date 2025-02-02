import { useMutation } from '@tanstack/react-query'
import { API_ROUTES } from '../../../constant/api'
import { UserInfo } from '../../../types/index'
import { authInstance } from '../../fetchInstance'

const postUserInfo = async (userInfo: UserInfo) => {
  await authInstance.post(`/${API_ROUTES.RESUME}/information`, userInfo)
}

const usePostUserInfo = () => {
  const { mutate, status } = useMutation({
    mutationKey: ['userInfo'],
    mutationFn: (userInfo: UserInfo) => postUserInfo(userInfo),
  })
  return { mutate, status }
}

export default usePostUserInfo
