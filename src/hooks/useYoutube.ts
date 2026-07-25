import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  generateTopicVideos,
  listTopicVideos,
  getVideoTranscript,
  getTopicVideoChat,
  sendTopicVideoChatMessage,
} from '../api/youtube'
import type { GetTranscriptPayload, SendTopicChatMessagePayload } from '../types'

const topicVideosKey = (topicId: string) => ['youtube', 'videos', topicId] as const
const topicVideoChatKey = (topicId: string, videoId: string) =>
  ['youtube', 'chat', topicId, videoId] as const

export function useTopicVideos(topicId: string | null) {
  return useQuery({
    queryKey: topicId ? topicVideosKey(topicId) : ['youtube', 'videos', 'none'],
    queryFn: () => listTopicVideos(topicId as string),
    enabled: !!topicId,
  })
}

export function useGenerateTopicVideos(topicId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => generateTopicVideos(topicId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: topicVideosKey(topicId) })
    },
  })
}

export function useVideoTranscript() {
  return useMutation({
    mutationFn: ({
      videoId,
      payload,
    }: {
      videoId: string
      payload: GetTranscriptPayload
    }) => getVideoTranscript(videoId, payload),
  })
}

export function useTopicVideoChat(topicId: string | null, videoId: string | null) {
  return useQuery({
    queryKey:
      topicId && videoId
        ? topicVideoChatKey(topicId, videoId)
        : ['youtube', 'chat', 'none'],
    queryFn: () => getTopicVideoChat(topicId as string, videoId as string),
    enabled: !!topicId && !!videoId,
  })
}

export function useSendTopicVideoChatMessage(topicId: string, videoId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: SendTopicChatMessagePayload) =>
      sendTopicVideoChatMessage(topicId, videoId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: topicVideoChatKey(topicId, videoId) })
    },
  })
}
