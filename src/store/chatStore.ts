import { create } from 'zustand'
import { TEACHING_MODES } from '../constants'
import type { TeachingMode } from '../constants'

interface ChatState {
  activeSessionId: string | null
  teachingMode: TeachingMode | string
  researchMode: boolean
  setActiveSessionId: (id: string | null) => void
  setTeachingMode: (mode: TeachingMode | string) => void
  toggleResearchMode: () => void
}

export const useChatStore = create<ChatState>((set) => ({
  activeSessionId: null,
  teachingMode: TEACHING_MODES.DIRECT,
  researchMode: false,

  setActiveSessionId: (id) => set({ activeSessionId: id }),
  setTeachingMode: (mode) => set({ teachingMode: mode }),
  toggleResearchMode: () => set((state) => ({ researchMode: !state.researchMode })),
}))
