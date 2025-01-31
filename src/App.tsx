import { QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import usePostToken from './apis/member/usePostToken.ts'
import queryClient from './apis/queryClient'
import { MobileView } from './components/index.ts'
import useCheckMobileView from './hooks/useCheckMobileView.ts'
import { Routes } from './routes'
import './styles/global.css'

const App = () => {
  const postToken = usePostToken()
  const isMobile = useCheckMobileView()

  useEffect(() => {
    const getToken = async () => {
      try {
        await postToken()
      } catch (error) {
        console.error('토큰 발급 실패:', error)
      }
    }

    getToken()
  }, [postToken])

  if (isMobile) {
    return <MobileView />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  )
}

export default App
