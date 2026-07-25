import axiosInstance from '../lib/axios'
import type {
  ChatSession,
  ChatSessionWithMessages,
  ChatSessionListResponse,
  CreateChatSessionPayload,
  UpdateChatSessionPayload,
  SendMessagePayload,
  SendMessageResponse,
} from '../types'

export async function createChatSession(
  payload: CreateChatSessionPayload,
): Promise<ChatSession> {
  const { data } = await axiosInstance.post<ChatSession>('/api/chat/', payload)
  return data
}

export async function listChatSessions(): Promise<ChatSessionListResponse> {
  const { data } = await axiosInstance.get<ChatSessionListResponse>('/api/chat/')
  return data
}

export async function getChatSession(
  sessionId: string,
): Promise<ChatSessionWithMessages> {
  const { data } = await axiosInstance.get<ChatSessionWithMessages>(
    `/api/chat/${sessionId}`,
  )
  return data
}

export async function updateChatSession(
  sessionId: string,
  payload: UpdateChatSessionPayload,
): Promise<ChatSession> {
  const { data } = await axiosInstance.patch<ChatSession>(
    `/api/chat/${sessionId}`,
    payload,
  )
  return data
}

export async function deleteChatSession(sessionId: string): Promise<void> {
  await axiosInstance.delete(`/api/chat/${sessionId}`)
}

export async function sendChatMessage(
  sessionId: string,
  payload: SendMessagePayload,
): Promise<SendMessageResponse> {
  const { data } = await axiosInstance.post<SendMessageResponse>(
    `/api/chat/${sessionId}/messages`,
    payload,
  )
  return data
}