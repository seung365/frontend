import { useMutation } from '@tanstack/react-query'
import { API_ROUTES } from '../../../constant/api'
import { UserInfo } from '../../../types'
import { authInstance } from '../../fetchInstance'

type patchUserInfoProps = {
  userInfo: UserInfo
  id: string
}

const patchUserInfo = async ({ userInfo, id }: patchUserInfoProps) => {
  const response = await authInstance.patch(
    `/${API_ROUTES.RESUME}/information${id}`,
    userInfo,
  )
  return response.data
}

const usePatchUserInfo = (id: string) => {
  const { mutate, status } = useMutation({
    mutationKey: ['userInfo', id],
    mutationFn: (userInfo: UserInfo) => patchUserInfo({ userInfo, id }),
  })
  return { mutate, status }
}

export default usePatchUserInfo
