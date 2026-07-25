import { useEffect, useRef, useState } from 'react'
import MessageBubble from './MessageBubble'
import InputBar from './InputBar'
import ChatLanding from './ChatLanding'
import TeachingModeSelector from './TeachingModeSelector'
import TypingIndicator from './TypingIndicator'
import { useChatSession, useSendChatMessage } from '../../hooks/useChat'
import { useChatStore } from '../../store/chatStore'
import { updateChatSession } from '../../api/chat'
import { deriveChatTitle } from '../../utils/chatTitle'
import { useQueryClient } from '@tanstack/react-query'

export default function ChatWindow() {
  const activeSessionId = useChatStore((state) => state.activeSessionId)
  const teachingMode = useChatStore((state) => state.teachingMode)
  const setTeachingMode = useChatStore((state) => state.setTeachingMode)
  const researchMode = useChatStore((state) => state.researchMode)
  const queryClient = useQueryClient()

  const { data: session, isLoading } = useChatSession(activeSessionId)
  const { mutate: sendMessage, isPending: isSending } = useSendChatMessage(
    activeSessionId ?? '',
  )

  const [pendingMessage, setPendingMessage] = useState<string | null>(null)

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [session?.messages.length, pendingMessage])

  useEffect(() => {
    if (!isSending) {
      setPendingMessage(null)
    }
  }, [isSending])

  function handleSend(content: string) {
    const isFirstMessage = (session?.messages.length ?? 0) === 0
    setPendingMessage(content)

    sendMessage(
      { content, mode: researchMode ? 'research' : undefined },
      {
        onSuccess: async () => {
          if (isFirstMessage && activeSessionId) {
            await updateChatSession(activeSessionId, {
              title: deriveChatTitle(content),
            })
            queryClient.invalidateQueries({ queryKey: ['chat', 'sessions'] })
          }
        },
      },
    )
  }

  function handleExplainPaper(paperTitle: string) {
    const content = `Tell me more about "${paperTitle}"`
    setPendingMessage(content)
    sendMessage({ content, mode: 'research' })
  }

  if (!activeSessionId) {
    return <ChatLanding />
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex items-center justify-between border-b border-[#232838] px-4 py-3">
        <h2 className="text-sm font-semibold text-[#E8EAED] truncate">
          {session?.title ?? 'Chat'}
        </h2>
        <TeachingModeSelector value={teachingMode} onChange={setTeachingMode} />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-6 h-6 border-2 border-[#232838] border-t-[#4F9DFF] rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {session?.messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                onExplainPaper={handleExplainPaper}
              />
            ))}

            {pendingMessage && (
              <MessageBubble
                message={{
                  id: 'pending',
                  session_id: activeSessionId,
                  role: 'user',
                  content: pendingMessage,
                  created_at: new Date().toISOString(),
                }}
              />
            )}

            {isSending && <TypingIndicator />}

            <div ref={bottomRef} />
          </>
        )}
      </div>

      <InputBar onSend={handleSend} disabled={isSending} />
    </div>
  )
}
