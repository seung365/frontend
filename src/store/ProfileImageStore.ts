import { create } from 'zustand'

type ProfileImageState = {
  profileImage: string
  setProfileImage: (profileImage: string) => void
}

export const useProfileImageStore = create<ProfileImageState>((set) => ({
  profileImage: '',
  setProfileImage: (profileImageData) => {
    set({ profileImage: profileImageData })
  },
}))
