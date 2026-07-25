import { create } from 'zustand'

interface ProgressState {
  weaknessThreshold: number
  setWeaknessThreshold: (threshold: number) => void
}

export const useProgressStore = create<ProgressState>((set) => ({
  weaknessThreshold: 70,
  setWeaknessThreshold: (threshold) => set({ weaknessThreshold: threshold }),
}))