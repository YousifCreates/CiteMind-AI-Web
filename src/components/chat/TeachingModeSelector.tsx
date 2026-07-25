import { BookOpen, MessageCircleQuestion } from 'lucide-react'
import { TEACHING_MODES } from '../../constants'
import type { TeachingMode } from '../../constants'

interface TeachingModeSelectorProps {
  value: TeachingMode | string
  onChange: (mode: TeachingMode | string) => void
}

const OPTIONS = [
  {
    value: TEACHING_MODES.DIRECT,
    label: 'Direct',
    description: 'Straightforward explanations',
    icon: BookOpen,
  },
  {
    value: TEACHING_MODES.SOCRATIC,
    label: 'Socratic',
    description: 'Guided questions to build understanding',
    icon: MessageCircleQuestion,
  },
]

export default function TeachingModeSelector({
  value,
  onChange,
}: TeachingModeSelectorProps) {
  return (
    <div className="flex gap-2">
      {OPTIONS.map((option) => {
        const Icon = option.icon
        const isActive = value === option.value

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            title={option.description}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition border ${
              isActive
                ? 'bg-[#4F9DFF] text-[#0B0E14] border-[#4F9DFF]'
                : 'bg-transparent text-[#8B93A7] border-[#232838] hover:border-[#4F9DFF] hover:text-[#E8EAED]'
            }`}
          >
            <Icon size={14} />
            {option.label}
          </button>
        )
      })}
    </div>
  )
}