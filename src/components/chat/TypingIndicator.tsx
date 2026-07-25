import { Bot } from 'lucide-react'

export default function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#12161F] border border-[#232838] text-[#4F9DFF] flex items-center justify-center">
        <Bot size={16} />
      </div>
      <div className="rounded-2xl rounded-tl-sm bg-[#12161F] border border-[#232838] px-4 py-3 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#8B93A7] animate-bounce [animation-delay:-0.3s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#8B93A7] animate-bounce [animation-delay:-0.15s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#8B93A7] animate-bounce" />
      </div>
    </div>
  )
}