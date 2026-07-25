import axiosInstance from '../lib/axios'
import type {
  Assessment,
  CreateAssessmentPayload,
  SubmitAssessmentPayload,
  SubmitAssessmentResponse,
  GenerateAssessmentPayload,
  GenerateAssessmentResponse,
} from '../types'

export async function createAssessment(
  payload: CreateAssessmentPayload,
): Promise<Assessment> {
  const { data } = await axiosInstance.post<Assessment>('/api/assessment/', payload)
  return data
}

export async function getAssessment(assessmentId: string): Promise<Assessment> {
  const { data } = await axiosInstance.get<Assessment>(
    `/api/assessment/${assessmentId}`,
  )
  return data
}

export async function submitAssessment(
  assessmentId: string,
  payload: SubmitAssessmentPayload,
): Promise<SubmitAssessmentResponse> {
  const { data } = await axiosInstance.post<SubmitAssessmentResponse>(
    `/api/assessment/${assessmentId}/submit`,
    payload,
  )
  return data
}

export async function generateAssessment(
  payload: GenerateAssessmentPayload,
): Promise<GenerateAssessmentResponse> {
  const { data } = await axiosInstance.post<GenerateAssessmentResponse>(
    '/api/assessment/generate',
    payload,
  )
  return data
}