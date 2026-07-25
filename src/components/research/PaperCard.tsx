import { ExternalLink, CheckCircle2, PlusCircle } from 'lucide-react'
import type { ResearchSearchResult } from '../../types'

interface PaperCardProps {
  paper: ResearchSearchResult
  onIngest: (paper: ResearchSearchResult) => void
  isIngesting?: boolean
}

export default function PaperCard({ paper, onIngest, isIngesting }: PaperCardProps) {
  return (
    <div className="rounded-xl bg-[#12161F] border border-[#232838] p-5 hover:border-[#4F9DFF]/50 transition">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-[#E8EAED] leading-snug">
            {paper.title}
          </h3>
          <p className="text-xs text-[#8B93A7] mt-1">
            {paper.authors.slice(0, 3).join(', ')}
            {paper.authors.length > 3 ? ' et al.' : ''} &middot; {paper.year}
          </p>
        </div>


        <a
          href={paper.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 text-[#8B93A7] hover:text-[#4F9DFF] transition"
          title="View source"
        >
          <ExternalLink size={16} />
        </a>
      </div>

      <p className="text-xs text-[#8B93A7] mt-3 line-clamp-3 leading-relaxed">
        {paper.abstract}
      </p>

      <div className="flex items-center justify-between mt-4">
        <span className="text-[10px] font-medium uppercase tracking-wide text-[#4F9DFF] bg-[#4F9DFF]/10 border border-[#4F9DFF]/20 rounded-full px-2 py-0.5">
          {paper.source.replace('_', ' ')}
        </span>

        {paper.already_ingested ? (
          <span className="flex items-center gap-1.5 text-xs text-[#4F9DFF] font-medium">
            <CheckCircle2 size={14} />
            In library
          </span>
        ) : (
          <button
            type="button"
            onClick={() => onIngest(paper)}
            disabled={isIngesting}
            className="flex items-center gap-1.5 text-xs font-medium text-[#8B93A7] hover:text-[#4F9DFF] disabled:opacity-50 transition"
          >
            <PlusCircle size={14} />
            {isIngesting ? 'Adding...' : 'Add to library'}
          </button>
        )}
      </div>
    </div>
  )
}