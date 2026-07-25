import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createAssessment,
  getAssessment,
  submitAssessment,
  generateAssessment,
} from '../api/assessment'
import type {
  CreateAssessmentPayload,
  SubmitAssessmentPayload,
  GenerateAssessmentPayload,
} from '../types'

const assessmentKey = (assessmentId: string) =>
  ['assessment', assessmentId] as const

export function useAssessment(assessmentId: string | null) {
  return useQuery({
    queryKey: assessmentId ? assessmentKey(assessmentId) : ['assessment', 'none'],
    queryFn: () => getAssessment(assessmentId as string),
    enabled: !!assessmentId,
  })
}

export function useCreateAssessment() {
  return useMutation({
    mutationFn: (payload: CreateAssessmentPayload) => createAssessment(payload),
  })
}

export function useSubmitAssessment(assessmentId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: SubmitAssessmentPayload) =>
      submitAssessment(assessmentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assessmentKey(assessmentId) })
    },
  })
}

export function useGenerateAssessment() {
  return useMutation({
    mutationFn: (payload: GenerateAssessmentPayload) => generateAssessment(payload),
  })
}