import { useState, useRef, useEffect } from 'react'
import { Settings, LogOut } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useLogout } from '../../hooks/useAuth'
import SettingsModal from './SettingsModal'

export default function ProfileMenu() {
  const [open, setOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const user = useAuthStore((state) => state.user)
  const logout = useLogout()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const initial = (user?.full_name ?? user?.email ?? '?').charAt(0).toUpperCase()

  return (
    <div ref={menuRef} className="relative">
      {open && (
        <div className="absolute bottom-full left-0 mb-2 w-full min-w-[180px] rounded-lg bg-[#12161F] border border-[#232838] shadow-lg overflow-hidden">
          <button
            type="button"
            onClick={() => {
              setShowSettings(true)
              setOpen(false)
            }}
            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-[#E8EAED] hover:bg-[#0B0E14] transition"
          >
            <Settings size={15} />
            Settings
          </button>
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-400 hover:bg-[#0B0E14] transition border-t border-[#232838]"
          >
            <LogOut size={15} />
            Sign out
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center gap-2.5 rounded-lg px-2 py-2 hover:bg-[#12161F] transition"
      >
        <div className="w-7 h-7 rounded-full bg-[#4F9DFF]/15 border border-[#4F9DFF]/30 flex items-center justify-center text-xs font-semibold text-[#4F9DFF] flex-shrink-0">
          {initial}
        </div>
        <div className="min-w-0 text-left">
          <p className="text-xs font-medium text-[#E8EAED] truncate">
            {user?.full_name ?? user?.email}
          </p>
        </div>
      </button>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  )
}