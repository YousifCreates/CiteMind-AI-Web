import { Link } from 'react-router-dom'
import { MessageSquare, Map, Search, BarChart3, LogOut } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useLogout } from '../hooks/useAuth'
import { ROUTES } from '../constants'

const NAV_CARDS = [
  {
    to: ROUTES.LEARN,
    icon: MessageSquare,
    title: 'Chat & Learn',
    description: 'Ask questions and learn with an AI tutor, direct or Socratic.',
  },
  {
    to: ROUTES.ROADMAP,
    icon: Map,
    title: 'Roadmap',
    description: 'Generate structured learning paths with modules and prerequisites.',
  },
  {
    to: ROUTES.RESEARCH,
    icon: Search,
    title: 'Research',
    description: 'Search, ingest, and get grounded explanations of academic papers.',
  },
  {
    to: ROUTES.PROGRESS,
    icon: BarChart3,
    title: 'Progress',
    description: 'Track completion, spot weak areas, and get your next best step.',
  },
]

export default function Home() {
  const user = useAuthStore((state) => state.user)
  const logout = useLogout()

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-bold text-[#E8EAED]">
              Welcome back{user?.full_name ? `, ${user.full_name}` : ''}
            </h1>
            <p className="text-sm text-[#8B93A7] mt-1">
              Pick up where you left off, or start something new.
            </p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-1.5 text-sm text-[#8B93A7] hover:text-[#E8EAED] transition"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {NAV_CARDS.map((card) => {
            const Icon = card.icon
            return (
              <Link
                key={card.to}
                to={card.to}
                className="group rounded-2xl bg-[#12161F] border border-[#232838] p-6 hover:border-[#4F9DFF]/60 hover:shadow-[0_0_40px_-10px_rgba(79,157,255,0.25)] transition"
              >
                <div className="w-11 h-11 rounded-xl bg-[#4F9DFF]/10 border border-[#4F9DFF]/30 flex items-center justify-center mb-4 group-hover:bg-[#4F9DFF]/20 transition">
                  <Icon size={20} className="text-[#4F9DFF]" />
                </div>
                <h3 className="text-base font-semibold text-[#E8EAED] mb-1">
                  {card.title}
                </h3>
                <p className="text-sm text-[#8B93A7] leading-relaxed">
                  {card.description}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}