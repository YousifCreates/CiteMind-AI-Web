import { useState } from 'react'
import { Search } from 'lucide-react'
import PaperCard from '../components/research/PaperCard'
import PaperExplainer from '../components/research/PaperExplainer'
import { useSearchPapers, useIngestPaper, usePaper } from '../hooks/useResearch'
import type { ResearchSearchResult } from '../types'

export default function Research() {
  const [query, setQuery] = useState('')
  const [selectedPaperId, setSelectedPaperId] = useState<string | null>(null)

  const { mutate: search, data: searchResults, isPending: isSearching } =
    useSearchPapers()
  const { mutate: ingest, isPending: isIngesting } = useIngestPaper()
  const { data: selectedPaper } = usePaper(selectedPaperId, true)

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    search({ query: query.trim(), limit: 10 })
  }

  function handleIngest(paper: ResearchSearchResult) {
    ingest(
      { external_id: paper.external_id, source: paper.source },
      {
        onSuccess: (result) => setSelectedPaperId(result.paper_id),
      },
    )
  }

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col min-w-0 border-r border-[#232838]">
        <div className="p-6 border-b border-[#232838]">
          <h1 className="text-lg font-semibold text-[#E8EAED] mb-4">Research</h1>
          <form onSubmit={handleSearch} className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B93A7]"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search papers by topic, title, or author..."
              className="w-full rounded-lg bg-[#12161F] border border-[#232838] pl-10 pr-4 py-2.5 text-sm text-[#E8EAED] placeholder:text-[#8B93A7] focus:outline-none focus:ring-2 focus:ring-[#4F9DFF] transition"
            />
          </form>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {isSearching ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-6 h-6 border-2 border-[#232838] border-t-[#4F9DFF] rounded-full animate-spin" />
            </div>
          ) : searchResults && searchResults.results.length > 0 ? (
            <div className="space-y-3">
              {searchResults.results.map((paper) => (
                <PaperCard
                  key={paper.external_id}
                  paper={paper}
                  onIngest={handleIngest}
                  isIngesting={isIngesting}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#8B93A7] text-center py-12">
              Search for a topic to discover research papers.
            </p>
          )}
        </div>
      </div>

      <div className="w-[420px] flex-shrink-0 overflow-y-auto p-6">
        {selectedPaper ? (
          <PaperExplainer paper={selectedPaper} />
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-full px-4">
            <p className="text-sm text-[#8B93A7]">
              Add a paper to your library to see an explainer here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}