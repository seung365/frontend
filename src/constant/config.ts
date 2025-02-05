export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_APP_BASE_URL,
  AUTH: {
    NAVER: import.meta.env.VITE_NAVER_AUTH_URL,
    GITHUB: import.meta.env.VITE_GITHUB_AUTH_URL,
  },
  LOGOUT_URL: import.meta.env.VITE_LOGOUT_BASE_URL,
} as const
