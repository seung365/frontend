import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/AuthStore'
import { publicInstance } from '../fetchInstance'

type PostTokenResponse = {
  access: string
  refresh: string
  memberId: string
}

const usePostToken = () => {
  const setLogin = useAuthStore((state) => state.setLogin)
  const navigate = useNavigate()

  const postToken = async () => {
    try {
      console.log('현재 쿠키:', document.cookie)

      const response = await publicInstance.post<PostTokenResponse>('/reissue')
      console.log('성공 응답:', response)
      const accessToken = response.headers.access
      console.log('발급된 토큰:', accessToken)
      const memberId = response.data.memberId
      if (accessToken && memberId) {
        setLogin(accessToken, memberId)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // 다시 로그인하게 이동
        alert('로그인 실패!')
        navigate('/signin')
      }
    }
  }

  return postToken
}

export default usePostToken
