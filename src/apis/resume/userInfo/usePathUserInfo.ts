import { useMutation } from '@tanstack/react-query'
import { UserInfo } from '../../../types'
import { authInstance } from '../../fetchInstance'

type patchUserInfoProps = {
  userInfo: UserInfo
  id: string
}

const patchUserInfo = async ({ userInfo, id }: patchUserInfoProps) => {
  const response = await authInstance.patch(`/resume/infomation${id}`, userInfo)
  return response.data
}

const usePatchUserInfo = (id: string) => {
  const { data, status } = useMutation({
    mutationKey: ['userInfo', id],
    mutationFn: (userInfo: UserInfo) => patchUserInfo({ userInfo, id }),
  })
  return { data, status }
}

export default usePatchUserInfo
