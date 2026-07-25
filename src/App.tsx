import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import router from './router'
import queryClient from './lib/queryClient'
import { useAuthStore } from './store/authStore'

function App() {
  const hydrate = useAuthStore((state) => state.hydrate)

  useEffect(() => {
    hydrate()
  }, [hydrate])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
