import axios from 'axios'
import { API_CONFIG } from '../constant/config'

const authInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
})

authInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const publicInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export { authInstance, publicInstance }
