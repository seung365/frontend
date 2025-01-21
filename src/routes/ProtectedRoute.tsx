import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { RouterPath } from './path'

export const ProtectedRoute = () => {
  const accessToken = localStorage.getItem('accessToken')
  const navigate = useNavigate()

  useEffect(() => {
    if (!accessToken) {
      navigate(`/${RouterPath.signin}`, { replace: true })
    }
  }, [accessToken, navigate])

  return accessToken ? <Outlet /> : null
}
