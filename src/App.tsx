import { QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import usePostToken from './apis/member/usePostToken.ts'
import queryClient from './apis/queryClient'
import { Routes } from './routes'
import { PROTECTED_ROUTES } from './routes/path.ts'
import { useAuthStore } from './store/AuthStore.ts'
import './styles/global.css'

const App = () => {
  const isLogin = useAuthStore((state) => state.isLogin)
  const pathname = window.location.pathname
  const postToken = usePostToken()
  useEffect(() => {
    const checkAuth = async () => {
      if (!isLogin && !PROTECTED_ROUTES.includes(pathname)) {
        await postToken()
      }
    }

    checkAuth()
  }, [isLogin, postToken, pathname])

  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  )
}

export default App
