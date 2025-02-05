import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Loader } from '../components'
import { useAuthStore } from '../store/AuthStore'
import { RouterPath } from './path'

export const ProtectedRoute = () => {
  const [isInitialCheck, setIsInitialCheck] = useState(true)
  const isLogin = useAuthStore((state) => state.isLogin)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = setTimeout(() => {
      if (!isLogin) {
        navigate(`/${RouterPath.signin}`, { replace: true })
      }
      setIsInitialCheck(false)
    }, 200)

    return () => clearTimeout(checkAuth)
  }, [isLogin, navigate])

  if (isInitialCheck) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader />
      </div>
    )
  }

  return isLogin ? <Outlet /> : null
}
