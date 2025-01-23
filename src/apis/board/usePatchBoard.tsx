import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
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
  id: string
}

const patchBoard = async ({
  formData,
  id,
}: MutationParams): Promise<BoardResponse> => {
  const requestData: PatchBoardRequest = {
    title: formData.title,
    content: formData.content,
    categoryId: formData.categoryId,
    tags: formData.tags?.map((tag) => tag.tagName) || [],
  }

  const response = await authInstance.patch(`/board/${id}`, requestData)
  console.log('게시글 수정 응답:', response)
  return response.data
}

const usePatchBoard = (id: string) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { mutate, status } = useMutation<BoardResponse, Error, MutationParams>({
    mutationFn: ({ formData, id }) => patchBoard({ formData, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['board', id],
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
