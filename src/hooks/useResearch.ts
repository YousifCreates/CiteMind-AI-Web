import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { searchPapers, ingestPaper, getPaper, searchChunks } from '../api/research'
import type {
  ResearchSearchPayload,
  IngestPaperPayload,
  ChunkSearchPayload,
} from '../types'

const paperKey = (paperId: string) => ['research', 'paper', paperId] as const

export function useSearchPapers() {
  return useMutation({
    mutationFn: (payload: ResearchSearchPayload) => searchPapers(payload),
  })
}

export function useIngestPaper() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: IngestPaperPayload) => ingestPaper(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: paperKey(data.paper_id) })
    },
  })
}

export function usePaper(paperId: string | null, includeChunks = false) {
  return useQuery({
    queryKey: paperId
      ? [...paperKey(paperId), includeChunks]
      : ['research', 'paper', 'none'],
    queryFn: () => getPaper(paperId as string, includeChunks),
    enabled: !!paperId,
  })
}

export function useSearchChunks() {
  return useMutation({
    mutationFn: (payload: ChunkSearchPayload) => searchChunks(payload),
  })
}