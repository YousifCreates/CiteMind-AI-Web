import { Compass, ArrowRight } from 'lucide-react'
import { RECOMMENDATION_TYPES } from '../../constants'
import type { NextStepRecommendation } from '../../types'

interface NextStepRecommenderProps {
  recommendation: NextStepRecommendation | undefined
  isLoading: boolean
  onRequest: () => void
}

const TYPE_LABELS: Record<string, string> = {
  [RECOMMENDATION_TYPES.CONTINUE_MODULE]: 'Continue module',
  [RECOMMENDATION_TYPES.REVIEW_WEAK_AREA]: 'Review weak area',
  [RECOMMENDATION_TYPES.NEW_MODULE]: 'New module',
}

export default function NextStepRecommender({
  recommendation,
  isLoading,
  onRequest,
}: NextStepRecommenderProps) {
  return (
    <div className="rounded-xl bg-[#12161F] border border-[#232838] p-6">
      <div className="flex items-center gap-2 mb-4">
        <Compass size={16} className="text-[#4F9DFF]" />
        <h3 className="text-sm font-semibold text-[#E8EAED]">What's next</h3>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-8 gap-3">
          <div className="w-5 h-5 border-2 border-[#232838] border-t-[#4F9DFF] rounded-full animate-spin" />
          <p className="text-xs text-[#8B93A7]">
            Thinking about your best next move...
          </p>
        </div>
      ) : recommendation ? (
        <div>
          <span className="inline-block text-[10px] font-medium uppercase tracking-wide text-[#4F9DFF] bg-[#4F9DFF]/10 border border-[#4F9DFF]/20 rounded-full px-2 py-0.5 mb-3">
            {TYPE_LABELS[recommendation.recommendation_type] ??
              recommendation.recommendation_type}
          </span>
          <p className="text-sm font-medium text-[#E8EAED] mb-2">
            {recommendation.module_title}
          </p>
          <p className="text-sm text-[#8B93A7] leading-relaxed mb-4">
            {recommendation.reasoning}
          </p>
          <button
            type="button"
            onClick={onRequest}
            className="flex items-center gap-1.5 text-xs font-medium text-[#4F9DFF] hover:underline"
          >
            Get a new suggestion
            <ArrowRight size={13} />
          </button>
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-sm text-[#8B93A7] mb-4">
            Get a personalized recommendation for what to learn next.
          </p>
          <button
            type="button"
            onClick={onRequest}
            className="rounded-lg bg-[#4F9DFF] text-[#0B0E14] font-medium px-4 py-2 text-sm hover:opacity-90 transition"
          >
            Suggest next step
          </button>
        </div>
      )}
    </div>
  )
}