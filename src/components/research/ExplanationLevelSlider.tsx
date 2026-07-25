import { GraduationCap } from 'lucide-react'

export type ExplanationLevel = 'beginner' | 'intermediate' | 'expert'

const LEVELS: { value: ExplanationLevel; label: string }[] = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'expert', label: 'Expert' },
]

interface ExplanationLevelSliderProps {
  value: ExplanationLevel
  onChange: (level: ExplanationLevel) => void
}

export default function ExplanationLevelSlider({
  value,
  onChange,
}: ExplanationLevelSliderProps) {
  const activeIndex = LEVELS.findIndex((level) => level.value === value)

  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs font-medium text-[#8B93A7] mb-2">
        <GraduationCap size={14} />
        Explanation level
      </div>

      <div className="relative flex bg-[#12161F] border border-[#232838] rounded-lg p-1">
        <div
          className="absolute top-1 bottom-1 rounded-md bg-[#4F9DFF] transition-all duration-300 ease-out"
          style={{
            width: `calc(${100 / LEVELS.length}% - 4px)`,
            left: `calc(${(activeIndex * 100) / LEVELS.length}% + 2px)`,
          }}
        />
        {LEVELS.map((level) => (
          <button
            key={level.value}
            type="button"
            onClick={() => onChange(level.value)}
            className={`relative z-10 flex-1 text-xs font-medium py-1.5 rounded-md transition ${
              value === level.value ? 'text-[#0B0E14]' : 'text-[#8B93A7] hover:text-[#E8EAED]'
            }`}
          >
            {level.label}
          </button>
        ))}
      </div>
    </div>
  )
}