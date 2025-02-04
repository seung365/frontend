import { create } from 'zustand'

interface ChatStore {
  isOpen: boolean
  selectedChatId: number | null
  setIsOpen: (isOpened: boolean) => void
  setSelectedChat: (id: number | null) => void
}

export const useChatStore = create<ChatStore>((set) => ({
  isOpen: false,
  selectedChatId: null,
  setIsOpen: (isOpen) => set({ isOpen }),
  setSelectedChat: (id) => set({ selectedChatId: id }),
}))
