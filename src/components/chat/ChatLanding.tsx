import { useState } from 'react'
import { Sparkles, BookOpen, HelpCircle, FileText } from 'lucide-react'
import InputBar from './InputBar'
import { sendChatMessage, updateChatSession } from '../../api/chat'
import { useCreateChatSession } from '../../hooks/useChat'
import { useChatStore } from '../../store/chatStore'
import { useAuthStore } from '../../store/authStore'
import { useQueryClient } from '@tanstack/react-query'
import { deriveChatTitle } from '../../utils/chatTitle'

const QUICK_PROMPTS = [
  { icon: BookOpen, label: 'Explain a concept', prompt: 'Can you explain ' },
  { icon: HelpCircle, label: 'Quiz me', prompt: 'Quiz me on ' },
  { icon: FileText, label: 'Summarize a paper', prompt: 'Summarize this paper: ' },
  { icon: Sparkles, label: 'Continue my roadmap', prompt: 'Help me continue with ' },
]

export default function ChatLanding() {
  const [draft, setDraft] = useState('')
  const user = useAuthStore((state) => state.user)
  const setActiveSessionId = useChatStore((state) => state.setActiveSessionId)
  const { mutate: createSession, isPending } = useCreateChatSession()
  const queryClient = useQueryClient()

  function startSessionWithMessage(content: string) {
    createSession(
      {},
      {
        onSuccess: async (session) => {
          setActiveSessionId(session.id)
          await sendChatMessage(session.id, { content })
          await updateChatSession(session.id, { title: deriveChatTitle(content) })
          queryClient.invalidateQueries({ queryKey: ['chat', 'session', session.id] })
          queryClient.invalidateQueries({ queryKey: ['chat', 'sessions'] })
        },
      },
    )
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-[#E8EAED] text-center mb-8">
          What would you like to learn
          {user?.full_name ? `, ${user.full_name.split(' ')[0]}` : ''}?
        </h1>

        <InputBar
          value={draft}
          onValueChange={setDraft}
          onSend={startSessionWithMessage}
          disabled={isPending}
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
          {QUICK_PROMPTS.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setDraft(item.prompt)}
                disabled={isPending}
                className="flex flex-col items-center gap-1.5 rounded-xl bg-[#12161F] border border-[#232838] px-3 py-3 text-xs text-[#8B93A7] hover:border-[#4F9DFF]/50 hover:text-[#E8EAED] disabled:opacity-50 transition"
              >
                <Icon size={16} className="text-[#4F9DFF]" />
                {item.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}