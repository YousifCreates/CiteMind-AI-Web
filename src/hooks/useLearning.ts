import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  listModuleTopics,
  generateTopics,
  createLearningPath,
  listLearningPaths,
  getLearningPath,
  createModule,
  updateModule,
  deleteModule,
  generateLearningPath,
} from '../api/learning'
import type {
  CreateLearningPathPayload,
  CreateModulePayload,
  UpdateModulePayload,
  GenerateLearningPathPayload,
  GenerateTopicsPayload,
} from '../types'

const LEARNING_PATHS_KEY = ['learning', 'paths'] as const
const learningPathKey = (pathId: string) => ['learning', 'path', pathId] as const

export function useLearningPaths() {
  return useQuery({
    queryKey: LEARNING_PATHS_KEY,
    queryFn: listLearningPaths,
  })
}

export function useLearningPath(pathId: string | null) {
  return useQuery({
    queryKey: pathId ? learningPathKey(pathId) : ['learning', 'path', 'none'],
    queryFn: () => getLearningPath(pathId as string),
    enabled: !!pathId,
  })
}

export function useCreateLearningPath() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateLearningPathPayload) => createLearningPath(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LEARNING_PATHS_KEY })
    },
  })
}

export function useCreateModule(pathId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateModulePayload) => createModule(pathId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: learningPathKey(pathId) })
    },
  })
}

export function useUpdateModule(pathId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      moduleId,
      payload,
    }: {
      moduleId: string
      payload: UpdateModulePayload
    }) => updateModule(moduleId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: learningPathKey(pathId) })
    },
  })
}

export function useDeleteModule(pathId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (moduleId: string) => deleteModule(moduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: learningPathKey(pathId) })
    },
  })
}

export function useGenerateLearningPath() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: GenerateLearningPathPayload) =>
      generateLearningPath(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LEARNING_PATHS_KEY })
    },
  })
}
const moduleTopicsKey = (moduleId: string) => ['learning', 'topics', moduleId] as const

export function useModuleTopics(moduleId: string | null) {
  return useQuery({
    queryKey: moduleId ? moduleTopicsKey(moduleId) : ['learning', 'topics', 'none'],
    queryFn: () => listModuleTopics(moduleId as string),
    enabled: !!moduleId,
  })
}

export function useGenerateTopics(moduleId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: GenerateTopicsPayload) => generateTopics(moduleId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: moduleTopicsKey(moduleId) })
    },
  })
}
