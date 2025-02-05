import { useQuery } from '@tanstack/react-query'
import { API_ROUTES } from '../../constant/api'
import { publicInstance } from '../fetchInstance'

const fetchBoardStatistics = async (memberId: string) => {
  const year = new Date().getFullYear()
  const response = await publicInstance.get(
    `/${API_ROUTES.MEMBERS}/stats/${memberId}/${year}`,
  )
  return response.data
}

const useFetchBoardStatistics = (memberId: string) => {
  const { data, status } = useQuery({
    queryKey: ['boardStatistics', memberId],
    queryFn: () => fetchBoardStatistics(memberId),
  })

  return { data, status }
}

export default useFetchBoardStatistics
