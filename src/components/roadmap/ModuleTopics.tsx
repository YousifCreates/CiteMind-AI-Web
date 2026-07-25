import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import TopicItem from './TopicItem'
import { useModuleTopics, useGenerateTopics } from '../../hooks/useLearning'

interface ModuleTopicsProps {
  moduleId: string
}

export default function ModuleTopics({ moduleId }: ModuleTopicsProps) {
  const [expanded, setExpanded] = useState(false)
  const { data: topics, isLoading } = useModuleTopics(expanded ? moduleId : null)
  const { mutate: generate, isPending: isGenerating } = useGenerateTopics(moduleId)

  return (
    <div className="mt-3 pt-3 border-t border-[#232838]">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="flex items-center gap-1.5 text-xs font-medium text-[#8B93A7] hover:text-[#E8EAED] transition"
      >
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {expanded ? 'Hide topics' : 'Show topics'}
      </button>

      {expanded && (
        <div className="mt-3 space-y-2">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="w-4 h-4 border-2 border-[#232838] border-t-[#4F9DFF] rounded-full animate-spin" />
            </div>
          ) : topics && topics.length > 0 ? (
            topics
              .sort((a, b) => a.order_index - b.order_index)
              .map((topic) => <TopicItem key={topic.id} topic={topic} />)
          ) : (
            <div className="text-center py-4">
              <p className="text-xs text-[#8B93A7] mb-3">
                No topics yet for this module.
              </p>
              <button
                type="button"
                onClick={() => generate({})}
                disabled={isGenerating}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#4F9DFF]/10 border border-[#4F9DFF]/30 text-[#4F9DFF] text-xs font-medium px-3 py-1.5 hover:bg-[#4F9DFF]/20 disabled:opacity-50 transition"
              >
                <Sparkles size={13} />
                {isGenerating ? 'Generating topics...' : 'Generate topics'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}