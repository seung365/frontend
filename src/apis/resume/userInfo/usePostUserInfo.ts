import { useMutation } from '@tanstack/react-query'
import { UserInfo } from '../../../types/index'
import { authInstance } from '../../fetchInstance'

const postUserInfo = async (userInfo: UserInfo) => {
  const response = await authInstance.post('/resume/infomation', userInfo)
  return response.data
}

const usePostUserInfo = () => {
  const { data, status } = useMutation({
    mutationKey: ['userInfo'],
    mutationFn: (userInfo: UserInfo) => postUserInfo(userInfo),
  })
  return { data, status }
}

export default usePostUserInfo
