import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import ExplanationLevelSlider, { type ExplanationLevel } from './ExplanationLevelSlider'
import type { Paper } from '../../types'

interface PaperExplainerProps {
  paper: Paper
}

export default function PaperExplainer({ paper }: PaperExplainerProps) {
  const [level, setLevel] = useState<ExplanationLevel>('intermediate')

  return (
    <div className="rounded-xl bg-[#12161F] border border-[#232838] p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-[#4F9DFF]/10 border border-[#4F9DFF]/30 flex items-center justify-center">
          <Sparkles size={14} className="text-[#4F9DFF]" />
        </div>
        <h3 className="text-sm font-semibold text-[#E8EAED]">Explain this paper</h3>
      </div>

      <ExplanationLevelSlider value={level} onChange={setLevel} />

      <div className="mt-5 pt-5 border-t border-[#232838]">
        <h4 className="text-xs font-medium text-[#8B93A7] uppercase tracking-wide mb-2">
          Abstract
        </h4>
        <p className="text-sm text-[#E8EAED] leading-relaxed mb-4">
          {paper.abstract || 'No abstract available for this paper.'}
        </p>

        {paper.chunks && paper.chunks.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-[#8B93A7] uppercase tracking-wide mb-2">
              Key excerpts
            </h4>
            <div className="space-y-3">
              {paper.chunks.slice(0, 3).map((chunk) => (
                <div
                  key={chunk.id}
                  className="text-sm text-[#8B93A7] bg-[#0B0E14] border border-[#232838] rounded-lg px-4 py-3 leading-relaxed"
                >
                  {chunk.chunk_text}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}