import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from '../api/auth'
import { useAuthStore } from '../store/authStore'
import { ROUTES } from '../constants'
import type { LoginPayload, RegisterPayload } from '../types'

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
    onSuccess: (data) => {
      setAuth(data.access_token, data.user)
      navigate(ROUTES.HOME)
    },
  })
}

export function useRegister() {
  const setAuth = useAuthStore((state) => state.setAuth)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
    onSuccess: (data) => {
      setAuth(data.access_token, data.user)
      navigate(ROUTES.HOME)
    },
  })
}

export function useLogout() {
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const navigate = useNavigate()

  return () => {
    clearAuth()
    navigate(ROUTES.LOGIN)
  }
}