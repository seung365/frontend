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

authInstance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken
  if (accessToken) {
    config.headers.access = `${accessToken}`
  }
  return config
})

const publicInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export { authInstance, publicInstance }
