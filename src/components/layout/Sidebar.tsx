import { useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  PanelLeftClose,
  PanelLeftOpen,
  MessageSquarePlus,
  Map,
  BarChart3,
  MessageSquare,
  BookMarked,
  Trash2,
} from 'lucide-react'
import { useUIStore } from '../../store/uiStore'
import { useChatStore } from '../../store/chatStore'
import { useLearningStore } from '../../store/learningStore'
import { useChatSessions, useCreateChatSession, useDeleteChatSession } from '../../hooks/useChat'
import { useLearningPaths } from '../../hooks/useLearning'
import { ROUTES } from '../../constants'
import ProfileMenu from './ProfileMenu'

interface ActivityItem {
  id: string
  type: 'chat' | 'roadmap'
  title: string
  date: string
}

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const isCollapsed = useUIStore((state) => state.isSidebarCollapsed)
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)

  const activeSessionId = useChatStore((state) => state.activeSessionId)
  const setActiveSessionId = useChatStore((state) => state.setActiveSessionId)
  const setActiveLearningPathId = useLearningStore(
    (state) => state.setActiveLearningPathId,
  )

  const { data: chatData } = useChatSessions()
  const { data: pathData } = useLearningPaths()
  const { mutate: createSession } = useCreateChatSession()
  const { mutate: deleteSession } = useDeleteChatSession()

  const activity: ActivityItem[] = useMemo(() => {
    const chats: ActivityItem[] = (chatData?.sessions ?? []).map((s) => ({
      id: s.id,
      type: 'chat',
      title: s.title || 'Untitled chat',
      date: s.updated_at,
    }))
    const paths: ActivityItem[] = (pathData?.learning_paths ?? []).map((p) => ({
      id: p.id,
      type: 'roadmap',
      title: p.topic,
      date: p.updated_at ?? p.created_at ?? '',
    }))
    return [...chats, ...paths].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )
  }, [chatData, pathData])

  function handleNewChat() {
    createSession(
      {},
      {
        onSuccess: (session) => {
          setActiveSessionId(session.id)
          navigate(ROUTES.LEARN)
        },
      },
    )
  }

  function handleActivityClick(item: ActivityItem) {
    if (item.type === 'chat') {
      setActiveSessionId(item.id)
      navigate(ROUTES.LEARN)
    } else {
      setActiveLearningPathId(item.id)
      navigate(ROUTES.ROADMAP)
    }
  }

  function handleDeleteChat(e: React.MouseEvent, chatId: string) {
    e.stopPropagation()
    deleteSession(chatId, {
      onSuccess: () => {
        if (activeSessionId === chatId) {
          setActiveSessionId(null)
        }
      },
    })
  }

  const navItems = [
    { label: 'New chat', icon: MessageSquarePlus, onClick: handleNewChat },
    {
      label: 'Design curriculum',
      icon: Map,
      onClick: () => navigate(ROUTES.ROADMAP),
    },
    { label: 'Progress', icon: BarChart3, onClick: () => navigate(ROUTES.PROGRESS) },
  ]

  return (
    <aside
      className={`flex flex-col h-screen flex-shrink-0 border-r border-[#232838] bg-[#0B0E14]/95 backdrop-blur-sm transition-all duration-200 ${
        isCollapsed ? 'w-16' : 'w-72'
      }`}
    >
      <div className="flex items-center justify-between px-3 py-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2 min-w-0">
            <img src="/logo/logo-icon-dark.png" alt="" className="w-6 h-6 flex-shrink-0" />
            <span className="text-sm font-bold text-[#E8EAED] truncate">CiteMind</span>
          </div>
        )}
        <button
          type="button"
          onClick={toggleSidebar}
          className="text-[#8B93A7] hover:text-[#E8EAED] transition flex-shrink-0"
        >
          {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      <nav className="px-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
              title={isCollapsed ? item.label : undefined}
              className="w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-[#8B93A7] hover:bg-[#12161F] hover:text-[#E8EAED] transition"
            >
              <Icon size={16} className="flex-shrink-0" />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </button>
          )
        })}
      </nav>

      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto px-2 mt-4">
          <p className="text-[10px] font-medium uppercase tracking-wide text-[#8B93A7] px-2.5 mb-2">
            Recent
          </p>
          <div className="space-y-0.5">
            {activity.length === 0 ? (
              <p className="text-xs text-[#8B93A7] px-2.5 py-2">Nothing yet.</p>
            ) : (
              activity.map((item) => {
                const Icon = item.type === 'chat' ? MessageSquare : BookMarked
                return (
                  <div
                    key={`${item.type}-${item.id}`}
                    onClick={() => handleActivityClick(item)}
                    className="group w-full flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-[#8B93A7] hover:bg-[#12161F] hover:text-[#E8EAED] transition cursor-pointer"
                  >
                    <Icon size={13} className="flex-shrink-0 text-[#4F9DFF]" />
                    <span className="flex-1 truncate text-left">{item.title}</span>
                    {item.type === 'chat' && (
                      <button
                        type="button"
                        onClick={(e) => handleDeleteChat(e, item.id)}
                        className="opacity-0 group-hover:opacity-100 text-[#8B93A7] hover:text-red-400 transition flex-shrink-0"
                        title="Delete chat"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}

      {isCollapsed && <div className="flex-1" />}

      <div className="px-2 pb-4 border-t border-[#232838] pt-3">
        {isCollapsed ? (
          <div className="flex justify-center">
            <div className="w-7 h-7 rounded-full bg-[#4F9DFF]/15 border border-[#4F9DFF]/30" />
          </div>
        ) : (
          <ProfileMenu />
        )}
      </div>
    </aside>
  )
}