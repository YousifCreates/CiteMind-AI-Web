import axiosInstance from '../lib/axios'
import type {
  Topic,
  GenerateTopicsPayload,
  GenerateTopicsResponse,
  LearningPath,
  LearningPathWithModules,
  LearningPathListResponse,
  CreateLearningPathPayload,
  CreateModulePayload,
  UpdateModulePayload,
  LearningModule,
  GenerateLearningPathPayload,
  GenerateLearningPathResponse,
} from '../types'

export async function createLearningPath(
  payload: CreateLearningPathPayload,
): Promise<LearningPath> {
  const { data } = await axiosInstance.post<LearningPath>('/api/learning/', payload)
  return data
}

export async function listLearningPaths(): Promise<LearningPathListResponse> {
  const { data } = await axiosInstance.get<LearningPathListResponse>('/api/learning/')
  return data
}

export async function getLearningPath(
  pathId: string,
): Promise<LearningPathWithModules> {
  const { data } = await axiosInstance.get<LearningPathWithModules>(
    `/api/learning/${pathId}`,
  )
  return data
}

export async function createModule(
  pathId: string,
  payload: CreateModulePayload,
): Promise<LearningModule> {
  const { data } = await axiosInstance.post<LearningModule>(
    `/api/learning/${pathId}/modules`,
    payload,
  )
  return data
}

export async function updateModule(
  moduleId: string,
  payload: UpdateModulePayload,
): Promise<LearningModule> {
  const { data } = await axiosInstance.patch<LearningModule>(
    `/api/learning/modules/${moduleId}`,
    payload,
  )
  return data
}

export async function deleteModule(moduleId: string): Promise<void> {
  await axiosInstance.delete(`/api/learning/modules/${moduleId}`)
}

export async function generateLearningPath(
  payload: GenerateLearningPathPayload,
): Promise<GenerateLearningPathResponse> {
  const { data } = await axiosInstance.post<GenerateLearningPathResponse>(
    '/api/learning/generate',
    payload,
  )
  return data
}
export async function listModuleTopics(moduleId: string): Promise<Topic[]> {
  const { data } = await axiosInstance.get<Topic[]>(
    `/api/learning/modules/${moduleId}/topics`,
  )
  return data
}

export async function generateTopics(
  moduleId: string,
  payload: GenerateTopicsPayload,
): Promise<GenerateTopicsResponse> {
  const { data } = await axiosInstance.post<GenerateTopicsResponse>(
    `/api/learning/modules/${moduleId}/topics/generate`,
    payload,
  )
  return data
}
