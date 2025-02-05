import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { API_ROUTES } from '../../constant/api'
import { BoardResponse, FormValues } from '../../types/index'
import { authInstance } from '../fetchInstance'

interface PatchBoardRequest {
  title: string
  content: string
  categoryId: number
  tags: string[]
}

interface MutationParams {
  formData: FormValues
  boardId: string
}

const patchBoard = async ({
  formData,
  boardId,
}: MutationParams): Promise<BoardResponse> => {
  const requestData: PatchBoardRequest = {
    title: formData.title,
    content: formData.content,
    categoryId: formData.categoryId,
    tags: formData.tags?.map((tag) => tag.tagName) || [],
  }

  const response = await authInstance.patch(
    `/${API_ROUTES.BOARDS}/${boardId}`,
    requestData,
  )
  return response.data
}

const usePatchBoard = (boardId: string) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { mutate, status } = useMutation<BoardResponse, Error, MutationParams>({
    mutationFn: ({ formData, boardId }) => patchBoard({ formData, boardId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['board', boardId],
      })
      navigate(-1)
    },
    onError: (error) => {
      console.error('게시글 수정 실패:', error)
    },
  })

  return { mutate, status }
}

export default usePatchBoard
