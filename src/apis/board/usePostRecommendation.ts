import { useCallback } from 'react'
import { API_ROUTES } from '../../constant/api'
import { authInstance } from '../fetchInstance'

const usePostRecommendation = () => {
  const postRecommendation = useCallback(async (boardId: number) => {
    try {
      const response = await authInstance.post(
        `/${API_ROUTES.BOARDS}/${boardId}/recommendation`,
      )
      return response.data
    } catch (error) {
      console.error('추천 에러:', error)
    }
  }, [])

  return postRecommendation
}

export default usePostRecommendation
