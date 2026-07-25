import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createChatSession,
  listChatSessions,
  getChatSession,
  updateChatSession,
  deleteChatSession,
  sendChatMessage,
} from '../api/chat'
import type {
  CreateChatSessionPayload,
  UpdateChatSessionPayload,
  SendMessagePayload,
} from '../types'

const CHAT_SESSIONS_KEY = ['chat', 'sessions'] as const
const chatSessionKey = (sessionId: string) => ['chat', 'session', sessionId] as const

export function useChatSessions() {
  return useQuery({
    queryKey: CHAT_SESSIONS_KEY,
    queryFn: listChatSessions,
  })
}

export function useChatSession(sessionId: string | null) {
  return useQuery({
    queryKey: sessionId ? chatSessionKey(sessionId) : ['chat', 'session', 'none'],
    queryFn: () => getChatSession(sessionId as string),
    enabled: !!sessionId,
  })
}

export function useCreateChatSession() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateChatSessionPayload) => createChatSession(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CHAT_SESSIONS_KEY })
    },
  })
}

export function useUpdateChatSession(sessionId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateChatSessionPayload) =>
      updateChatSession(sessionId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CHAT_SESSIONS_KEY })
      queryClient.invalidateQueries({ queryKey: chatSessionKey(sessionId) })
    },
  })
}

export function useDeleteChatSession() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (sessionId: string) => deleteChatSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CHAT_SESSIONS_KEY })
    },
  })
}

export function useSendChatMessage(sessionId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: SendMessagePayload) => sendChatMessage(sessionId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatSessionKey(sessionId) })
      queryClient.invalidateQueries({ queryKey: CHAT_SESSIONS_KEY })
    },
  })
}