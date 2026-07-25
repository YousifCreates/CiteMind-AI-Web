import { Bot, User } from 'lucide-react'
import type { ChatMessage } from '../../types'
import MessageContent from './MessageContent'
import CitationList from './CitationList'

interface MessageBubbleProps {
  message: ChatMessage
  onExplainPaper?: (paperTitle: string) => void
}

export default function MessageBubble({ message, onExplainPaper }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? 'bg-[#4F9DFF] text-[#0B0E14]'
            : 'bg-[#12161F] border border-[#232838] text-[#4F9DFF]'
        }`}
      >
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>

      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-[#4F9DFF] text-[#0B0E14] rounded-tr-sm'
            : 'bg-[#12161F] border border-[#232838] text-[#E8EAED] rounded-tl-sm'
        }`}
      >
        {!isUser && (
          <div className="text-xs font-medium text-[#4F9DFF] mb-1.5 tracking-wide">
            CiteMind
          </div>
        )}

        {isUser ? (
          <p className="whitespace-pre-wrap leading-relaxed text-sm">
            {message.content}
          </p>
        ) : (
          <MessageContent content={message.content} />
        )}

        {!isUser && message.citations && message.citations.length > 0 && (
          <CitationList citations={message.citations} onExplainPaper={onExplainPaper} />
        )}

        <div
          className={`text-[10px] mt-1.5 ${
            isUser ? 'text-[#0B0E14]/60' : 'text-[#8B93A7]'
          }`}
        >
          {new Date(message.created_at).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  )
}