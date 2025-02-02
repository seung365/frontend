import { useMutation } from '@tanstack/react-query'
import { API_ROUTES } from '../../../constant/api'
import { authInstance } from '../../fetchInstance'

const deleteUserInfo = async (id: string) => {
  const response = await authInstance.delete(
    `/${API_ROUTES.RESUME}/information/${id}`,
  )
  return response.data
}

const useDeleteUserInfo = () => {
  const { data, status } = useMutation({
    mutationKey: ['userInfo'],
    mutationFn: (id: string) => deleteUserInfo(id),
  })
  return { data, status }
}

export default useDeleteUserInfo
