import axios from 'axios'
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

const waitForToken = async (delay = 500) => {
  const token = useAuthStore.getState().accessToken
  if (token) return token

  await new Promise((resolve) => setTimeout(resolve, delay))
  return useAuthStore.getState().accessToken
}

authInstance.interceptors.request.use(
  async (config) => {
    const token = await waitForToken()
    if (token) {
      config.headers.access = token
      return config
    }
    console.warn('토큰 없이 요청을 진행합니다.')
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

authInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      console.error('401 Unauthorized - Access Token 만료 또는 인증 실패')
      alert('세션이 만료되었습니다. 다시 로그인 해주세요.')
      useAuthStore.getState().setLogout()
      window.location.href = '/signin'
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
