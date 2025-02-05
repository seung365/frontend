import { create } from 'zustand'

interface ChatStore {
  isOpen: boolean
  selectedChatId: string | null
  selectedChatName: string | null
  selectedChatTab: 'all' | 'my'
  setIsOpen: (isOpened: boolean) => void
  setSelectedChat: (id: string | null) => void
  setSelectedChatName: (name: string | null) => void
  setSelectedChatTab: (tab: 'all' | 'my') => void
}

export const useChatStore = create<ChatStore>((set) => ({
  isOpen: false,
  selectedChatId: null,
  selectedChatTab: 'all',
  selectedChatName: null,
  setIsOpen: (isOpen) => set({ isOpen }),
  setSelectedChat: (id) => set({ selectedChatId: id }),
  setSelectedChatName: (name) => set({ selectedChatName: name }),
  setSelectedChatTab: (tab) => set({ selectedChatTab: tab }),
}))
