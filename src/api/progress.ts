import axiosInstance from '../lib/axios'
import type {
  TopicProgress,
  UpdateTopicProgressPayload,
  ModuleProgress,
  UpdateModuleProgressPayload,
  ProgressDashboardResponse,
  WeaknessesResponse,
  NextStepPayload,
  NextStepResponse,
  GatingStatus,
} from '../types'

export async function getModuleProgress(moduleId: string): Promise<ModuleProgress> {
  const { data } = await axiosInstance.get<ModuleProgress>(
    `/api/progress/module/${moduleId}`,
  )
  return data
}

export async function updateModuleProgress(
  moduleId: string,
  payload: UpdateModuleProgressPayload,
): Promise<ModuleProgress> {
  const { data } = await axiosInstance.patch<ModuleProgress>(
    `/api/progress/module/${moduleId}`,
    payload,
  )
  return data
}

export async function getProgressDashboard(): Promise<ProgressDashboardResponse> {
  const { data } = await axiosInstance.get<ProgressDashboardResponse>(
    '/api/progress/dashboard',
  )
  return data
}

export async function getWeaknesses(threshold = 70): Promise<WeaknessesResponse> {
  const { data } = await axiosInstance.get<WeaknessesResponse>(
    '/api/progress/weaknesses',
    { params: { threshold } },
  )
  return data
}

export async function getNextStep(
  payload: NextStepPayload,
): Promise<NextStepResponse> {
  const { data } = await axiosInstance.post<NextStepResponse>(
    '/api/progress/next-step',
    payload,
  )
  return data
}
export async function getTopicProgress(topicId: string): Promise<TopicProgress> {
  const { data } = await axiosInstance.get<TopicProgress>(
    `/api/progress/topic/${topicId}`,
  )
  return data
}

export async function updateTopicProgress(
  topicId: string,
  payload: UpdateTopicProgressPayload,
): Promise<TopicProgress> {
  const { data } = await axiosInstance.patch<TopicProgress>(
    `/api/progress/topic/${topicId}`,
    payload,
  )
  return data
}

export async function getModuleGatingStatus(moduleId: string): Promise<GatingStatus> {
  const { data } = await axiosInstance.get<GatingStatus>(
    `/api/progress/module/${moduleId}/gating-status`,
  )
  return data
}
