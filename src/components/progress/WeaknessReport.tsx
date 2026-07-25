import { AlertTriangle } from 'lucide-react'
import type { WeaknessesResponse } from '../../types'

interface WeaknessReportProps {
  weaknesses: WeaknessesResponse | undefined
  isLoading: boolean
}

export default function WeaknessReport({ weaknesses, isLoading }: WeaknessReportProps) {
  return (
    <div className="rounded-xl bg-[#12161F] border border-[#232838] p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle size={16} className="text-[#4F9DFF]" />
        <h3 className="text-sm font-semibold text-[#E8EAED]">Weak areas</h3>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="w-5 h-5 border-2 border-[#232838] border-t-[#4F9DFF] rounded-full animate-spin" />
        </div>
      ) : !weaknesses || weaknesses.weak_areas.length === 0 ? (
        <p className="text-sm text-[#8B93A7] py-4">
          No weak areas detected — great work so far.
        </p>
      ) : (
        <>
          <p className="text-sm text-[#8B93A7] leading-relaxed mb-4">
            {weaknesses.summary}
          </p>
          <div className="space-y-3">
            {weaknesses.weak_areas.map((area) => (
              <div
                key={area.module_id}
                className="rounded-lg bg-[#0B0E14] border border-[#232838] px-4 py-3"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-[#E8EAED]">
                    {area.module_title}
                  </span>
                  <span className="text-xs font-semibold text-red-400">
                    {area.score}%
                  </span>
                </div>
                {area.weakness_notes && (
                  <p className="text-xs text-[#8B93A7] leading-relaxed">
                    {area.weakness_notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}