import { useState } from 'react'
import TopicList from '../components/roadmap/TopicList'
import RoadmapView from '../components/roadmap/RoadmapView'
import {
  useLearningPaths,
  useLearningPath,
  useGenerateLearningPath,
} from '../hooks/useLearning'
import { useLearningStore } from '../store/learningStore'
import { Sparkles } from 'lucide-react'

export default function Roadmap() {
  const { data, isLoading } = useLearningPaths()
  const activePathId = useLearningStore((state) => state.activeLearningPathId)
  const setActivePathId = useLearningStore((state) => state.setActiveLearningPathId)

  const { data: activePath, isLoading: isPathLoading } = useLearningPath(activePathId)
  const { mutate: generatePath, isPending: isGenerating } = useGenerateLearningPath()

  const [topic, setTopic] = useState('')
  const [showNewPathForm, setShowNewPathForm] = useState(false)

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    if (!topic.trim()) return
    generatePath(
      { topic: topic.trim() },
      {
        onSuccess: (result) => {
          setActivePathId(result.learning_path.id)
          setTopic('')
          setShowNewPathForm(false)
        },
      },
    )
  }

  return (
    <div className="flex h-full">
      <aside className="w-72 flex-shrink-0 border-r border-[#232838]">
        <TopicList
          paths={data?.learning_paths ?? []}
          activePathId={activePathId}
          onSelect={setActivePathId}
          onCreateNew={() => setShowNewPathForm(true)}
          isCreating={isGenerating}
        />
      </aside>

      {showNewPathForm ? (
        <div className="flex-1 flex items-center justify-center px-6">
          <form
            onSubmit={handleGenerate}
            className="w-full max-w-md bg-[#12161F] border border-[#232838] rounded-2xl p-8"
          >
            <div className="w-12 h-12 rounded-full bg-[#4F9DFF]/10 border border-[#4F9DFF]/30 flex items-center justify-center mb-4">
              <Sparkles size={20} className="text-[#4F9DFF]" />
            </div>
            <h3 className="text-lg font-semibold text-[#E8EAED] mb-1">
              Generate a learning path
            </h3>
            <p className="text-sm text-[#8B93A7] mb-5">
              Tell us what you want to learn, and we'll build a structured path
              with modules and prerequisites for you.
            </p>

            <input
              type="text"
              autoFocus
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Distributed systems fundamentals"
              className="w-full rounded-lg bg-[#0B0E14] border border-[#232838] px-3 py-2.5 text-sm text-[#E8EAED] placeholder:text-[#8B93A7] focus:outline-none focus:ring-2 focus:ring-[#4F9DFF] transition mb-4"
            />

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowNewPathForm(false)}
                className="flex-1 rounded-lg border border-[#232838] text-[#E8EAED] font-medium py-2.5 text-sm hover:bg-[#0B0E14] transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isGenerating || !topic.trim()}
                className="flex-1 rounded-lg bg-[#4F9DFF] text-[#0B0E14] font-semibold py-2.5 text-sm hover:opacity-90 disabled:opacity-50 transition"
              >
                {isGenerating ? 'Generating...' : 'Generate'}
              </button>
            </div>

            {isGenerating && (
              <p className="text-xs text-[#8B93A7] text-center mt-4">
                This can take up to 15 seconds — our AI is designing your path.
              </p>
            )}
          </form>
        </div>
      ) : activePathId && activePath ? (
        <RoadmapView path={activePath} />
      ) : isLoading || isPathLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-[#232838] border-t-[#4F9DFF] rounded-full animate-spin" />
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
          <h3 className="text-lg font-semibold text-[#E8EAED] mb-1">
            No learning path selected
          </h3>
          <p className="text-sm text-[#8B93A7] max-w-sm">
            Pick a path from the sidebar or generate a new one to get started.
          </p>
        </div>
      )}
    </div>
  )
}