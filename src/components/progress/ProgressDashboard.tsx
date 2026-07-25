import MilestoneTracker from './MilestoneTracker'
import WeaknessReport from './WeaknessReport'
import NextStepRecommender from './NextStepRecommender'
import { useProgressDashboard, useWeaknesses, useNextStep } from '../../hooks/useProgress'
import { useProgressStore } from '../../store/progressStore'

export default function ProgressDashboard() {
  const { data: dashboard, isLoading: isDashboardLoading } = useProgressDashboard()
  const weaknessThreshold = useProgressStore((state) => state.weaknessThreshold)
  const { data: weaknesses, isLoading: isWeaknessesLoading } =
    useWeaknesses(weaknessThreshold)
  const {
    mutate: requestNextStep,
    data: nextStepData,
    isPending: isNextStepLoading,
  } = useNextStep()

  if (isDashboardLoading || !dashboard) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-[#232838] border-t-[#4F9DFF] rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-xl font-semibold text-[#E8EAED] mb-2">Your progress</h1>

      <MilestoneTracker dashboard={dashboard} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeaknessReport weaknesses={weaknesses} isLoading={isWeaknessesLoading} />
        <NextStepRecommender
          recommendation={nextStepData?.recommendation}
          isLoading={isNextStepLoading}
          onRequest={() => requestNextStep({})}
        />
      </div>

      {dashboard.records.length > 0 && (
        <div className="rounded-xl bg-[#12161F] border border-[#232838] p-6">
          <h3 className="text-sm font-semibold text-[#E8EAED] mb-4">
            Module history
          </h3>
          <div className="space-y-2">
            {dashboard.records.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between rounded-lg bg-[#0B0E14] border border-[#232838] px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#E8EAED] truncate">
                    {record.module_title}
                  </p>
                  <p className="text-xs text-[#8B93A7] truncate">
                    {record.learning_path_topic}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {record.score != null && (
                    <span className="text-xs font-semibold text-[#4F9DFF]">
                      {record.score}%
                    </span>
                  )}
                  <span
                    className={`text-[10px] font-medium uppercase tracking-wide rounded-full px-2 py-0.5 border ${
                      record.status === 'completed'
                        ? 'text-[#4F9DFF] bg-[#4F9DFF]/10 border-[#4F9DFF]/20'
                        : record.status === 'in_progress'
                          ? 'text-[#8B93A7] bg-[#12161F] border-[#232838]'
                          : 'text-[#8B93A7] bg-transparent border-[#232838]'
                    }`}
                  >
                    {record.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}