import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authInstance } from '../fetchInstance'

const deleteBoard = async (id: number) => {
  try {
    await authInstance.delete(`/board/${id}`)
  } catch (error) {
    console.error('게시글 삭제 에러:', error)
  }
}

const useDeleteBoard = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate, status } = useMutation<void, Error, number>({
    mutationFn: (id) => deleteBoard(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['AllBoardsList'],
      })
      navigate(-1)
    },
  })
  return { mutate, status }
}

export default useDeleteBoard
