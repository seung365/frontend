import { useCallback } from 'react'
import { publicInstance } from '../fetchInstance'

type PostTokenResponse = {
  access: string
  refresh: string
}

const usePostToken = () => {
  const postToken = useCallback(async () => {
    try {
      console.log('현재 쿠키:', document.cookie)

      const response = await publicInstance.post<PostTokenResponse>('/reissue')
      console.log('성공 응답:', response)
      const accessToken = response.headers.access
      console.log('발급된 토큰:', accessToken)

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
      }
    } catch (error) {
      console.error('토큰 재발급 에러:', error)
      console.error('상세 에러:', error)
    }
  }, [])

  return postToken
}

export default usePostToken
