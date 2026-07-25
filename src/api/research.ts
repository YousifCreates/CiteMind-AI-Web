import axiosInstance from '../lib/axios'
import type {
  ResearchSearchPayload,
  ResearchSearchResponse,
  IngestPaperPayload,
  IngestPaperResponse,
  Paper,
  ChunkSearchPayload,
  ChunkSearchResponse,
} from '../types'

export async function searchPapers(
  payload: ResearchSearchPayload,
): Promise<ResearchSearchResponse> {
  const { data } = await axiosInstance.post<ResearchSearchResponse>(
    '/api/research/search',
    payload,
  )
  return data
}

export async function ingestPaper(
  payload: IngestPaperPayload,
): Promise<IngestPaperResponse> {
  const { data } = await axiosInstance.post<IngestPaperResponse>(
    '/api/research/ingest',
    payload,
  )
  return data
}

export async function getPaper(
  paperId: string,
  includeChunks = false,
): Promise<Paper> {
  const { data } = await axiosInstance.get<Paper>(`/api/research/${paperId}`, {
    params: { include_chunks: includeChunks },
  })
  return data
}

export async function searchChunks(
  payload: ChunkSearchPayload,
): Promise<ChunkSearchResponse> {
  const { data } = await axiosInstance.post<ChunkSearchResponse>(
    '/api/research/chunks/search',
    payload,
  )
  return data
}