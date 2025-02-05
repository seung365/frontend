import { useAuthStore } from '../../store/AuthStore'
import { publicInstance } from '../fetchInstance'

const usePostToken = () => {
  const setLogin = useAuthStore((state) => state.setLogin)

  const postToken = async (): Promise<void> => {
    try {
      console.log('현재 쿠키:', document.cookie)

      const response = await publicInstance.post<string>('/reissue')
      console.log('성공 응답:', response)
      const accessToken = response.headers.access
      console.log('발급된 토큰:', accessToken)
      const memberId = response.data
      if (accessToken && memberId) {
        setLogin(accessToken, memberId)
      }
    } catch (error) {
      console.log('accesstoken 발급 실패', error)
    }
  }

  return postToken
}

export default usePostToken
