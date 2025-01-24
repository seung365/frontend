import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { BoardResponse, FormValues } from '../../types/index'
import { authInstance } from '../fetchInstance'

interface PostBoardRequest {
  title: string
  content: string
  categoryId: number
  tags: string[]
}

const postBoard = async (formData: FormValues): Promise<BoardResponse> => {
  const requestData: PostBoardRequest = {
    title: formData.title,
    content: formData.content,
    categoryId: formData.categoryId,
    tags: formData.tags?.map((tag) => tag.tagName) || [],
  }

  const response = await authInstance.post('/board', requestData)
  console.log('게시글 작성 응답:', response)
  return response.data
}

const usePostBoard = () => {
  const navigate = useNavigate()

  const { mutate, status, data } = useMutation<
    BoardResponse,
    Error,
    FormValues
  >({
    mutationFn: (formData) => postBoard(formData),
    onSuccess: (data) => {
      navigate(`/board/detail/${data.id}`)
    },
    onError: (error) => {
      console.error('API call failed:', error)
    },
  })
  return { mutate, status, data }
}

export default usePostBoard
