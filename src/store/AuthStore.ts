import { create } from 'zustand'

type AuthState = {
  isLogin: boolean
  accessToken: string | null
  memberId: string | null
  setLogin: (token: string, memberId: string) => void
  setLogout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: false,
  accessToken: null,
  memberId: null,
  setLogin: (accessToken, memberId) => {
    set({ isLogin: true, accessToken, memberId })
  },
  setLogout: () => set({ isLogin: false, accessToken: null, memberId: null }),
}))
