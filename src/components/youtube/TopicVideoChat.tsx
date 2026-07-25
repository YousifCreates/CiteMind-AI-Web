import { useEffect, useRef, useState } from 'react'
import { Send } from 'lucide-react'
import MessageContent from '../chat/MessageContent'
import { useTopicVideoChat, useSendTopicVideoChatMessage } from '../../hooks/useYoutube'

interface TopicVideoChatProps {
  topicId: string
  videoId: string
}

export default function TopicVideoChat({ topicId, videoId }: TopicVideoChatProps) {
  const { data: session, isLoading } = useTopicVideoChat(topicId, videoId)
  const { mutate: sendMessage, isPending: isSending } = useSendTopicVideoChatMessage(
    topicId,
    videoId,
  )

  const [value, setValue] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [session?.messages.length])

  function handleSend() {
    const trimmed = value.trim()
    if (!trimmed || isSending) return
    sendMessage({ content: trimmed })
    setValue('')
  }

  return (
    <div className="flex flex-col h-full border-r border-[#232838]">
      <div className="border-b border-[#232838] px-4 py-3">
        <h3 className="text-sm font-semibold text-[#E8EAED]">Ask about this video</h3>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-5 h-5 border-2 border-[#232838] border-t-[#4F9DFF] rounded-full animate-spin" />
          </div>
        ) : session && session.messages.length > 0 ? (
          <>
            {session.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    message.role === 'user'
                      ? 'bg-[#4F9DFF] text-[#0B0E14] rounded-tr-sm'
                      : 'bg-[#12161F] border border-[#232838] text-[#E8EAED] rounded-tl-sm'
                  }`}
                >
                  {message.role === 'user' ? (
                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  ) : (
                    <MessageContent content={message.content} />
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </>
        ) : (
          <p className="text-sm text-[#8B93A7] text-center py-8">
            Ask a question about this video to get started.
          </p>
        )}

        {isSending && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-tl-sm bg-[#12161F] border border-[#232838] px-4 py-3 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B93A7] animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B93A7] animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B93A7] animate-bounce" />
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-[#232838] px-4 py-3">
        <div className="flex items-end gap-2">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            rows={1}
            placeholder="Ask about this video..."
            className="flex-1 resize-none rounded-lg bg-[#12161F] border border-[#232838] px-3 py-2.5 text-sm text-[#E8EAED] placeholder:text-[#8B93A7] focus:outline-none focus:ring-2 focus:ring-[#4F9DFF] transition max-h-32"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={isSending || !value.trim()}
            className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#4F9DFF] text-[#0B0E14] flex items-center justify-center hover:opacity-90 disabled:opacity-40 transition"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
