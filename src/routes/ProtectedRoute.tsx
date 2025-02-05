import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useAuthStore } from '../store/AuthStore'
import { RouterPath } from './path'

export const ProtectedRoute = () => {
  const isLogin = useAuthStore((state) => state.isLogin)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogin) {
      navigate(`/${RouterPath.signin}`, { replace: true })
    }
  }, [isLogin, navigate])

  return isLogin ? <Outlet /> : null
}
