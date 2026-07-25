import { useState } from 'react'
import { BookOpen, ChevronDown, ChevronUp, Globe, Library, Sparkles } from 'lucide-react'
import type { Citation } from '../../types'
import { normalizeScores, relevanceLabel } from '../../utils/citationScore'
import { ingestPaper } from '../../api/research'

interface CitationListProps {
  citations: Citation[]
  onExplainPaper?: (paperTitle: string) => void
}

export default function CitationList({ citations, onExplainPaper }: CitationListProps) {
  const [expanded, setExpanded] = useState(false)
  const [ingestingId, setIngestingId] = useState<string | null>(null)

  if (citations.length === 0) return null

  const normalizedScores = normalizeScores(citations.map((c) => c.score))

  async function handleExplainPaper(citation: Citation) {
    if (!citation.external_id || !citation.external_source) return
    setIngestingId(citation.external_id)
    try {
      await ingestPaper({
        external_id: citation.external_id,
        source: citation.external_source,
      })
      onExplainPaper?.(citation.paper_title)
    } finally {
      setIngestingId(null)
    }
  }

  return (
    <div className="mt-3 pt-3 border-t border-[#232838]">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="flex items-center gap-1.5 text-xs font-medium text-[#4F9DFF] hover:underline"
      >
        <BookOpen size={13} />
        {citations.length} source{citations.length > 1 ? 's' : ''}
        {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
      </button>

      {expanded && (
        <div className="mt-2 space-y-2">
          {citations.map((citation, i) => {
            const isExternal = citation.source_type === 'external'
            const isIngesting = ingestingId === citation.external_id

            return (
              <div
                key={`${citation.paper_id ?? citation.external_id}-${i}`}
                className="rounded-lg bg-[#0B0E14] border border-[#232838] px-3 py-2.5"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <p className="text-xs font-semibold text-[#E8EAED] leading-snug">
                    [{i + 1}] {citation.paper_title}
                  </p>
                  <span
                    className={`flex-shrink-0 flex items-center gap-1 text-[10px] font-medium rounded-full px-1.5 py-0.5 border ${
                      isExternal
                        ? 'text-[#8B93A7] bg-[#12161F] border-[#232838]'
                        : 'text-[#4F9DFF] bg-[#4F9DFF]/10 border-[#4F9DFF]/20'
                    }`}
                  >
                    {isExternal ? <Globe size={10} /> : <Library size={10} />}
                    {isExternal ? 'Live search' : 'Your library'}
                  </span>
                </div>

                {!isExternal && citation.score !== null && (
                  <span className="inline-block text-[10px] text-[#8B93A7] mb-1">
                    Relevance: {relevanceLabel(normalizedScores[i])}
                  </span>
                )}

                {isExternal && citation.authors.length > 0 && (
                  <p className="text-[10px] text-[#8B93A7] mb-1">
                    {citation.authors.slice(0, 3).join(', ')}
                    {citation.authors.length > 3 ? ' et al.' : ''}
                    {citation.year ? ` · ${citation.year}` : ''}
                  </p>
                )}

                <p className="text-xs text-[#8B93A7] leading-relaxed line-clamp-3">
                  {citation.chunk_text ?? citation.abstract}
                </p>

                {isExternal && (
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => handleExplainPaper(citation)}
                      disabled={isIngesting}
                      className="flex items-center gap-1 text-[11px] font-medium text-[#4F9DFF] hover:underline disabled:opacity-50"
                    >
                      <Sparkles size={11} />
                      {isIngesting ? 'Adding to library...' : 'Explain this paper'}
                    </button>
                    {citation.url && (

                        <a
                        href={citation.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-[#8B93A7] hover:text-[#E8EAED] hover:underline"
                      >
                        View source
                      </a>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}