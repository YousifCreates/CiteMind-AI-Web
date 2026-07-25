import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getTopicProgress,
  updateTopicProgress,
  getModuleProgress,
  updateModuleProgress,
  getProgressDashboard,
  getWeaknesses,
  getNextStep,
  getModuleGatingStatus,
} from '../api/progress'
import type { UpdateModuleProgressPayload, NextStepPayload,
  UpdateTopicProgressPayload,
} from '../types'

const moduleProgressKey = (moduleId: string) => ['progress', 'module', moduleId] as const
const DASHBOARD_KEY = ['progress', 'dashboard'] as const
const weaknessesKey = (threshold: number) => ['progress', 'weaknesses', threshold] as const

export function useModuleProgress(moduleId: string | null) {
  return useQuery({
    queryKey: moduleId ? moduleProgressKey(moduleId) : ['progress', 'module', 'none'],
    queryFn: () => getModuleProgress(moduleId as string),
    enabled: !!moduleId,
  })
}

export function useUpdateModuleProgress(moduleId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateModuleProgressPayload) =>
      updateModuleProgress(moduleId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: moduleProgressKey(moduleId) })
      queryClient.invalidateQueries({ queryKey: DASHBOARD_KEY })
    },
  })
}

export function useProgressDashboard() {
  return useQuery({
    queryKey: DASHBOARD_KEY,
    queryFn: getProgressDashboard,
  })
}

export function useWeaknesses(threshold: number) {
  return useQuery({
    queryKey: weaknessesKey(threshold),
    queryFn: () => getWeaknesses(threshold),
  })
}

export function useNextStep() {
  return useMutation({
    mutationFn: (payload: NextStepPayload) => getNextStep(payload),
  })
}
export function useUpdateAnyModuleProgress() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      moduleId,
      payload,
    }: {
      moduleId: string
      payload: UpdateModuleProgressPayload
    }) => updateModuleProgress(moduleId, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: moduleProgressKey(variables.moduleId) })
      queryClient.invalidateQueries({ queryKey: DASHBOARD_KEY })
    },
  })
}

const topicProgressKey = (topicId: string) => ['progress', 'topic', topicId] as const

export function useTopicProgress(topicId: string | null) {
  return useQuery({
    queryKey: topicId ? topicProgressKey(topicId) : ['progress', 'topic', 'none'],
    queryFn: () => getTopicProgress(topicId as string),
    enabled: !!topicId,
  })
}

export function useUpdateAnyTopicProgress() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      topicId,
      payload,
    }: {
      topicId: string
      payload: UpdateTopicProgressPayload
    }) => updateTopicProgress(topicId, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: topicProgressKey(variables.topicId) })
      queryClient.invalidateQueries({ queryKey: DASHBOARD_KEY })
    },
  })
}

const gatingStatusKey = (moduleId: string) => ['progress', 'gating-status', moduleId] as const

export function useGatingStatus(moduleId: string | null) {
  return useQuery({
    queryKey: moduleId ? gatingStatusKey(moduleId) : ['progress', 'gating-status', 'none'],
    queryFn: () => getModuleGatingStatus(moduleId as string),
    enabled: !!moduleId,
  })
}
