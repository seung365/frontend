import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API_CONFIG } from '../constant/config'
import { useAuthStore } from '../store/AuthStore'

const authInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

const authLogoutInstance = axios.create({
  baseURL: API_CONFIG.LOGOUT_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

authLogoutInstance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken
  if (accessToken) {
    config.headers.access = `${accessToken}`
  }
  return config
})

authInstance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken
  if (accessToken) {
    config.headers.access = `${accessToken}`
  }
  return config
})

authInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const navigate = useNavigate()
      console.error('401 Unauthorized - Access Token 만료 또는 인증 실패')
      alert('세션이 만료되었습니다. 다시 로그인 해주세요.')
      navigate('/signin')

      useAuthStore.getState().setLogout()
    }
    return Promise.reject(error)
  },
)

const publicInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export { authInstance, authLogoutInstance, publicInstance }
