import { Plus, BookMarked } from 'lucide-react'
import type { LearningPath } from '../../types'

interface TopicListProps {
  paths: LearningPath[]
  activePathId: string | null
  onSelect: (pathId: string) => void
  onCreateNew: () => void
  isCreating?: boolean
}

export default function TopicList({
  paths,
  activePathId,
  onSelect,
  onCreateNew,
  isCreating,
}: TopicListProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-[#232838]">
        <button
          type="button"
          onClick={onCreateNew}
          disabled={isCreating}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#4F9DFF] text-[#0B0E14] font-medium py-2.5 text-sm hover:opacity-90 disabled:opacity-50 transition"
        >
          <Plus size={16} />
          {isCreating ? 'Creating...' : 'New learning path'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {paths.length === 0 ? (
          <p className="text-xs text-[#8B93A7] text-center px-4 py-8">
            No learning paths yet. Create one to get started.
          </p>
        ) : (
          paths.map((path) => (
            <button
              key={path.id}
              type="button"
              onClick={() => onSelect(path.id)}
              className={`w-full flex items-start gap-2.5 rounded-lg px-3 py-2.5 text-left transition ${
                activePathId === path.id
                  ? 'bg-[#12161F] border border-[#232838] text-[#E8EAED]'
                  : 'text-[#8B93A7] hover:bg-[#12161F] hover:text-[#E8EAED]'
              }`}
            >
              <BookMarked size={15} className="flex-shrink-0 mt-0.5 text-[#4F9DFF]" />
              <div className="min-w-0">
                <div className="text-sm font-medium truncate">{path.topic}</div>
                {path.description && (
                  <div className="text-xs text-[#8B93A7] truncate mt-0.5">
                    {path.description}
                  </div>
                )}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}