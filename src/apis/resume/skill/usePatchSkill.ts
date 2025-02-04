import { useMutation } from '@tanstack/react-query'
import { API_ROUTES } from '../../../constant/api'
import { authInstance } from '../../fetchInstance'

type patchSkillProps = {
  skill: string[]
  id: string
}

const patchSkill = async ({ skill, id }: patchSkillProps) => {
  const response = await authInstance.patch(
    `/${API_ROUTES.RESUME}/skill/${id}`,
    skill,
  )
  return response.data
}

const usePatchSkill = (id: string) => {
  const { data, status } = useMutation({
    mutationKey: ['skill', id],
    mutationFn: (skill: string[]) => patchSkill({ skill, id }),
  })
  return { data, status }
}

export default usePatchSkill
