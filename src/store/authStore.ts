import { create } from 'zustand'
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '../constants'
import type { User } from '../types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setAuth: (token: string, user: User) => void
  clearAuth: () => void
  hydrate: () => void
}

function readStoredUser(): User | null {
  const raw = localStorage.getItem(USER_STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setAuth: (token, user) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, token)
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
    set({ token, user, isAuthenticated: true })
  },

  clearAuth: () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    localStorage.removeItem(USER_STORAGE_KEY)
    set({ token: null, user: null, isAuthenticated: false })
  },

  hydrate: () => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY)
    const user = readStoredUser()
    if (token && user) {
      set({ token, user, isAuthenticated: true })
    }
  },
}))