import { X } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

interface SettingsModalProps {
  onClose: () => void
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
  const user = useAuthStore((state) => state.user)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#12161F] border border-[#232838] rounded-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[#E8EAED]">Settings</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8B93A7] hover:text-[#E8EAED] transition"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium tracking-wide text-[#8B93A7] mb-1">
              FULL NAME
            </label>
            <div className="rounded-lg bg-[#0B0E14] border border-[#232838] px-3 py-2.5 text-sm text-[#E8EAED]">
              {user?.full_name || '—'}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium tracking-wide text-[#8B93A7] mb-1">
              EMAIL
            </label>
            <div className="rounded-lg bg-[#0B0E14] border border-[#232838] px-3 py-2.5 text-sm text-[#E8EAED]">
              {user?.email}
            </div>
          </div>

          <p className="text-xs text-[#8B93A7] leading-relaxed pt-2 border-t border-[#232838]">
            Editing your profile and account preferences isn't available yet —
            check back soon.
          </p>
        </div>
      </div>
    </div>
  )
}