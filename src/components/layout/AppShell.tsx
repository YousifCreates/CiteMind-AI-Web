import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import AppBackground from './AppBackground'

export default function AppShell() {
  return (
    <div className="flex h-screen relative bg-[#0B0E14]">
      <AppBackground />
      <div className="relative z-10 flex h-screen w-full">
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
