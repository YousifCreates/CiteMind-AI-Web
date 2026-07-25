import axios, { AxiosError } from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
import { API_BASE_URL, TOKEN_STORAGE_KEY } from '../constants'
import type { ApiErrorResponse } from '../types'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach Authorization header on every request if a token exists
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY)
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`)
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Handle 401s globally: clear token and redirect to login
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  },
)

export default axiosInstance