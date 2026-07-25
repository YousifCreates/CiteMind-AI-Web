import { useState, useRef, useEffect } from 'react'
import type { KeyboardEvent } from 'react'
import { Send, Plus, BookOpen, Check } from 'lucide-react'
import { useChatStore } from '../../store/chatStore'

interface InputBarProps {
  onSend: (content: string) => void
  disabled?: boolean
  value?: string
  onValueChange?: (value: string) => void
}

export default function InputBar({
  onSend,
  disabled,
  value,
  onValueChange,
}: InputBarProps) {
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState('')
  const currentValue = isControlled ? value : internalValue

  const [toolsOpen, setToolsOpen] = useState(false)
  const toolsRef = useRef<HTMLDivElement>(null)
  const researchMode = useChatStore((state) => state.researchMode)
  const toggleResearchMode = useChatStore((state) => state.toggleResearchMode)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function updateValue(next: string) {
    if (isControlled) {
      onValueChange?.(next)
    } else {
      setInternalValue(next)
    }
  }

  function handleSend() {
    const trimmed = currentValue.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    updateValue('')
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t border-[#232838] bg-[#0D111A] px-4 py-3">
      <div className="max-w-3xl mx-auto">
        {researchMode && (
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#4F9DFF] mb-2 px-1">
            <BookOpen size={13} />
            Research mode — answers grounded in your papers
          </div>
        )}

        <div className="flex items-end gap-2">
          <div ref={toolsRef} className="relative flex-shrink-0">
            {toolsOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-56 rounded-lg bg-[#12161F] border border-[#232838] shadow-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => {
                    toggleResearchMode()
                    setToolsOpen(false)
                  }}
                  className="w-full flex items-center justify-between gap-2 px-3 py-2.5 text-sm text-[#E8EAED] hover:bg-[#0B0E14] transition"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen size={15} />
                    Research
                  </span>
                  {researchMode && <Check size={14} className="text-[#4F9DFF]" />}
                </button>
              </div>
            )}
            <button
              type="button"
              onClick={() => setToolsOpen((prev) => !prev)}
              className={`w-11 h-11 rounded-xl border flex items-center justify-center transition ${
                researchMode
                  ? 'bg-[#4F9DFF]/10 border-[#4F9DFF]/40 text-[#4F9DFF]'
                  : 'bg-[#12161F] border-[#232838] text-[#8B93A7] hover:text-[#E8EAED]'
              }`}
            >
              <Plus size={18} />
            </button>
          </div>

          <textarea
            value={currentValue}
            onChange={(e) => updateValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            rows={1}
            placeholder="Ask anything..."
            className="flex-1 resize-none rounded-xl bg-[#12161F] border border-[#232838] px-4 py-3 text-sm text-[#E8EAED] placeholder:text-[#8B93A7] focus:outline-none focus:ring-2 focus:ring-[#4F9DFF] transition max-h-40 disabled:opacity-50"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={disabled || !currentValue.trim()}
            className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#4F9DFF] text-[#0B0E14] flex items-center justify-center hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
      <p className="text-[10px] text-[#8B93A7] text-center mt-2">
        Press Enter to send, Shift + Enter for a new line
      </p>
    </div>
  )
}