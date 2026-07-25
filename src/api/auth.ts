import axiosInstance from '../lib/axios'
import type { AuthResponse, RegisterPayload, LoginPayload } from '../types'

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  const { data } = await axiosInstance.post<AuthResponse>('/api/auth/register', payload)
  return data
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const formData = new URLSearchParams()
  formData.append('username', payload.email)
  formData.append('password', payload.password)

  const { data } = await axiosInstance.post<AuthResponse>('/api/auth/login', formData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  return data
}