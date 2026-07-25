import { CheckCircle2, Circle, CircleDot } from 'lucide-react'
import type { ProgressDashboardResponse } from '../../types'

interface MilestoneTrackerProps {
  dashboard: ProgressDashboardResponse
}

export default function MilestoneTracker({ dashboard }: MilestoneTrackerProps) {
  const { total_modules, completed_modules, in_progress_modules, not_started_modules } =
    dashboard

  const completionPercent =
    total_modules > 0 ? Math.round((completed_modules / total_modules) * 100) : 0

  return (
    <div className="rounded-xl bg-[#12161F] border border-[#232838] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#E8EAED]">Overall progress</h3>
        <span className="text-lg font-bold text-[#4F9DFF]">{completionPercent}%</span>
      </div>

      <div className="h-2 rounded-full bg-[#0B0E14] overflow-hidden mb-6">
        <div
          className="h-full bg-[#4F9DFF] rounded-full transition-all duration-500"
          style={{ width: `${completionPercent}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center gap-1.5">
          <CheckCircle2 size={18} className="text-[#4F9DFF]" />
          <span className="text-lg font-bold text-[#E8EAED]">{completed_modules}</span>
          <span className="text-[10px] text-[#8B93A7] uppercase tracking-wide">
            Completed
          </span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <CircleDot size={18} className="text-[#8B93A7]" />
          <span className="text-lg font-bold text-[#E8EAED]">{in_progress_modules}</span>
          <span className="text-[10px] text-[#8B93A7] uppercase tracking-wide">
            In progress
          </span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <Circle size={18} className="text-[#8B93A7]" />
          <span className="text-lg font-bold text-[#E8EAED]">{not_started_modules}</span>
          <span className="text-[10px] text-[#8B93A7] uppercase tracking-wide">
            Not started
          </span>
        </div>
      </div>
    </div>
  )
}