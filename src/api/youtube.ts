import axiosInstance from '../lib/axios'
import type {
  GenerateVideosResponse,
  Video,
  VideoTranscript,
  GetTranscriptPayload,
  TopicChatSession,
  SendTopicChatMessagePayload,
  SendTopicChatMessageResponse,
} from '../types'

export async function generateTopicVideos(topicId: string): Promise<GenerateVideosResponse> {
  const { data } = await axiosInstance.post<GenerateVideosResponse>(
    `/api/learning/topics/${topicId}/videos/generate`,
    {},
  )
  return data
}

export async function listTopicVideos(topicId: string): Promise<Video[]> {
  const { data } = await axiosInstance.get<Video[]>(
    `/api/learning/topics/${topicId}/videos`,
  )
  return data
}

export async function getVideoTranscript(
  videoId: string,
  payload: GetTranscriptPayload,
): Promise<VideoTranscript> {
  const { data } = await axiosInstance.post<VideoTranscript>(
    `/api/learning/videos/${videoId}/transcript`,
    payload,
  )
  return data
}

export async function getTopicVideoChat(
  topicId: string,
  videoId: string,
): Promise<TopicChatSession> {
  const { data } = await axiosInstance.get<TopicChatSession>(
    `/api/learning/topics/${topicId}/videos/${videoId}/chat`,
  )
  return data
}

export async function sendTopicVideoChatMessage(
  topicId: string,
  videoId: string,
  payload: SendTopicChatMessagePayload,
): Promise<SendTopicChatMessageResponse> {
  const { data } = await axiosInstance.post<SendTopicChatMessageResponse>(
    `/api/learning/topics/${topicId}/videos/${videoId}/chat/messages`,
    payload,
  )
  return data
}
