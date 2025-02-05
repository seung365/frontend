import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '../../../constant/api'
import { Project } from '../../../types'
import { authInstance } from '../../fetchInstance'

const putProject = async (projects: Project[]) => {
  const response = await authInstance.put(
    `/${API_ROUTES.RESUME}/projects`,
    projects,
  )
  return response.data
}

const usePutProject = () => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (projects: Project[]) => putProject(projects),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['resume'],
      })
    },
  })

  return { mutate }
}

export default usePutProject
