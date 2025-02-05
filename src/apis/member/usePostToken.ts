import { useAuthStore } from '../../store/AuthStore'
import { publicInstance } from '../fetchInstance'

const usePostToken = () => {
  const setLogin = useAuthStore((state) => state.setLogin)

  const postToken = async (): Promise<void> => {
    try {
      const response = await publicInstance.post<string>('/reissue')
      const accessToken = response.headers.access
      const memberId = response.data
      if (accessToken && memberId) {
        setLogin(accessToken, memberId)
      }
    } catch (error) {
      console.error('accesstoken 발급 실패', error)
    }
  }

  return postToken
}

export default usePostToken
