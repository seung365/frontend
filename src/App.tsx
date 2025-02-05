import { QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import usePostToken from './apis/member/usePostToken.ts'
import queryClient from './apis/queryClient'
import { MobileView } from './components/index.ts'
import useCheckMobileView from './hooks/useCheckMobileView.ts'
import { Routes } from './routes'
import { useAuthStore } from './store/AuthStore.ts'
import './styles/global.css'

const App = () => {
  const isLogin = useAuthStore((state) => state.isLogin)
  const pathname = window.location.pathname
  const postToken = usePostToken()
  const isMobile = useCheckMobileView()

  useEffect(() => {
    const checkAuth = async () => {
      if (!isLogin) {
        await postToken()
      }
    }

    checkAuth()
  }, [isLogin, postToken, pathname])

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
