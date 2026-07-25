import { useState } from 'react'
import { LayoutGrid, GitBranch, Download } from 'lucide-react'
import ModuleCard from './ModuleCard'
import PrerequisiteTree from './PrerequisiteTree'
import type { LearningModule, LearningPathWithModules } from '../../types'
import { listModuleTopics } from '../../api/learning'
import { exportCurriculumToDocx } from '../../utils/curriculumExport'
import type { Topic } from '../../types'

interface RoadmapViewProps {
  path: LearningPathWithModules
}

type ViewMode = 'list' | 'tree'

function isModuleUnlocked(module: LearningModule, allModules: LearningModule[]): boolean {
  if (module.prerequisite_module_ids.length === 0) return true
  return module.prerequisite_module_ids.every((prereqId) => {
    const prereq = allModules.find((m) => m.id === prereqId)
    return prereq?.is_completed ?? false
  })
}

export default function RoadmapView({ path }: RoadmapViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [isExporting, setIsExporting] = useState(false)

  async function handleExport() {
    setIsExporting(true)
    try {
      const topicsEntries = await Promise.all(
        path.modules.map(async (m) => {
          try {
            const topics = await listModuleTopics(m.id)
            return [m.id, topics] as [string, Topic[]]
          } catch {
            return [m.id, []] as [string, Topic[]]
          }
        }),
      )
      const moduleTopicsMap = Object.fromEntries(topicsEntries)
      await exportCurriculumToDocx(path, moduleTopicsMap)
    } finally {
      setIsExporting(false)
    }
  }

  const sortedModules = [...path.modules].sort((a, b) => a.order_index - b.order_index)

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex items-center justify-between border-b border-[#232838] px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-[#E8EAED]">{path.topic}</h2>
          {path.description && (
            <p className="text-sm text-[#8B93A7] mt-0.5">{path.description}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center gap-1.5 rounded-lg bg-[#12161F] border border-[#232838] px-3 py-1.5 text-xs font-medium text-[#8B93A7] hover:text-[#E8EAED] hover:border-[#4F9DFF]/50 disabled:opacity-50 transition"
        >
          <Download size={14} />
          {isExporting ? 'Exporting...' : 'Export .docx'}
        </button>

        <div className="flex gap-1 bg-[#12161F] border border-[#232838] rounded-lg p-1">
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition ${
              viewMode === 'list'
                ? 'bg-[#4F9DFF] text-[#0B0E14]'
                : 'text-[#8B93A7] hover:text-[#E8EAED]'
            }`}
          >
            <LayoutGrid size={14} />
            List
          </button>
          <button
            type="button"
            onClick={() => setViewMode('tree')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition ${
              viewMode === 'tree'
                ? 'bg-[#4F9DFF] text-[#0B0E14]'
                : 'text-[#8B93A7] hover:text-[#E8EAED]'
            }`}
          >
            <GitBranch size={14} />
            Tree
          </button>
        </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        {sortedModules.length === 0 ? (
          <p className="text-sm text-[#8B93A7] text-center py-12">
            This learning path has no modules yet.
          </p>
        ) : viewMode === 'list' ? (
          <div className="space-y-3 max-w-2xl mx-auto">
            {sortedModules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                pathId={path.id}
                pathTopic={path.topic}
                isLocked={!isModuleUnlocked(module, sortedModules)}
              />
            ))}
          </div>
        ) : (
          <PrerequisiteTree modules={sortedModules} />
        )}
      </div>
    </div>
  )
}