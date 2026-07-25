import { useMemo } from 'react'
import type { LearningModule } from '../../types'

interface PrerequisiteTreeProps {
  modules: LearningModule[]
}

interface TreeLevel {
  module: LearningModule
  depth: number
}

function buildLevels(modules: LearningModule[]): TreeLevel[] {
  const moduleMap = new Map(modules.map((m) => [m.id, m]))
  const depthCache = new Map<string, number>()

  function getDepth(moduleId: string, visiting = new Set<string>()): number {
    if (depthCache.has(moduleId)) return depthCache.get(moduleId) as number
    if (visiting.has(moduleId)) return 0 // guard against cycles

    const module = moduleMap.get(moduleId)
    if (!module || module.prerequisite_module_ids.length === 0) {
      depthCache.set(moduleId, 0)
      return 0
    }

    visiting.add(moduleId)
    const maxParentDepth = Math.max(
      ...module.prerequisite_module_ids.map((id) => getDepth(id, visiting)),
    )
    visiting.delete(moduleId)

    const depth = maxParentDepth + 1
    depthCache.set(moduleId, depth)
    return depth
  }

  return modules
    .map((module) => ({ module, depth: getDepth(module.id) }))
    .sort((a, b) => a.depth - b.depth || a.module.order_index - b.module.order_index)
}

export default function PrerequisiteTree({ modules }: PrerequisiteTreeProps) {
  const levels = useMemo(() => buildLevels(modules), [modules])

  const grouped = useMemo(() => {
    const groups = new Map<number, TreeLevel[]>()
    for (const level of levels) {
      const existing = groups.get(level.depth) ?? []
      existing.push(level)
      groups.set(level.depth, existing)
    }
    return Array.from(groups.entries()).sort(([a], [b]) => a - b)
  }, [levels])

  if (modules.length === 0) {
    return (
      <p className="text-sm text-[#8B93A7] text-center py-8">
        No modules to visualize yet.
      </p>
    )
  }

  return (
    <div className="space-y-8">
      {grouped.map(([depth, items], groupIndex) => (
        <div key={depth} className="relative">
          {groupIndex > 0 && (
            <div className="absolute left-1/2 -top-5 w-px h-5 bg-gradient-to-b from-transparent to-[#4F9DFF]/40" />
          )}
          <div className="flex flex-wrap gap-3 justify-center">
            {items.map(({ module }) => (
              <div
                key={module.id}
                className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                  module.is_completed
                    ? 'bg-[#4F9DFF]/10 border-[#4F9DFF]/50 text-[#E8EAED]'
                    : 'bg-[#12161F] border-[#232838] text-[#8B93A7]'
                }`}
              >
                {module.title}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}