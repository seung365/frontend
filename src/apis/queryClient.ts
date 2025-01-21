import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 쿼리 요청 실패시 재시도 횟수
      staleTime: 60000, // 1 min
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    },
  },
})

export default queryClient
