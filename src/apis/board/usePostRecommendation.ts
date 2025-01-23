import { useCallback } from 'react'
import { authInstance } from '../fetchInstance'

const usePostRecommendation = () => {
  const postRecommendation = useCallback(async (boardId: number) => {
    try {
      const response = await authInstance.post(
        `/board/${boardId}/recommendation`,
      )
      return response.data
    } catch (error) {
      console.error('추천 에러:', error)
    }
  }, [])

  return postRecommendation
}

export default usePostRecommendation
