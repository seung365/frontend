import { useMutation } from '@tanstack/react-query'
import { API_ROUTES } from '../../../constant/api'
import { information } from '../../../types'
import { authInstance } from '../../fetchInstance'

type patchUserInfoProps = {
  userInfo: information
  id: number
}

const patchUserInfo = async ({ userInfo, id }: patchUserInfoProps) => {
  const response = await authInstance.patch(
    `/${API_ROUTES.RESUME}/information/${id}`,
    userInfo,
  )
  return response.data
}

const usePatchUserInfo = (id: number) => {
  const { mutate, status } = useMutation({
    mutationKey: ['information', id],
    mutationFn: (userInfo: information) => patchUserInfo({ userInfo, id }),
  })
  return { mutate, status }
}

export default usePatchUserInfo
