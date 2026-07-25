import { create } from 'zustand'

interface LearningState {
  activeLearningPathId: string | null
  setActiveLearningPathId: (id: string | null) => void
}

export const useLearningStore = create<LearningState>((set) => ({
  activeLearningPathId: null,
  setActiveLearningPathId: (id) => set({ activeLearningPathId: id }),
}))