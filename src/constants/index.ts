export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const TOKEN_STORAGE_KEY = 'citemind_access_token'
export const USER_STORAGE_KEY = 'citemind_user'

export const TEACHING_MODES = {
  DIRECT: 'direct',
  SOCRATIC: 'socratic',
} as const

export type TeachingMode = (typeof TEACHING_MODES)[keyof typeof TEACHING_MODES]

export const RESEARCH_SOURCES = {
  SEMANTIC_SCHOLAR: 'semantic_scholar',
  ARXIV: 'arxiv',
  OPENALEX: 'openalex',
} as const

export type ResearchSource = (typeof RESEARCH_SOURCES)[keyof typeof RESEARCH_SOURCES]

export const ASSESSMENT_TYPES = {
  MCQ: 'mcq',
  CODE: 'code',
} as const

export type AssessmentType = (typeof ASSESSMENT_TYPES)[keyof typeof ASSESSMENT_TYPES]

export const PROGRESS_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
} as const

export type ProgressStatus = (typeof PROGRESS_STATUS)[keyof typeof PROGRESS_STATUS]

export const RECOMMENDATION_TYPES = {
  CONTINUE_MODULE: 'continue_module',
  REVIEW_WEAK_AREA: 'review_weak_area',
  NEW_MODULE: 'new_module',
} as const

export type RecommendationType =
  (typeof RECOMMENDATION_TYPES)[keyof typeof RECOMMENDATION_TYPES]

export const DEFAULT_WEAKNESS_THRESHOLD = 70

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  HOME: '/',
  LEARN: '/learn',
  ROADMAP: '/roadmap',
  ROADMAP_DETAIL: '/roadmap/:pathId',
  RESEARCH: '/research',
  ASSESSMENT: '/assessment/:assessmentId',
  PROGRESS: '/progress',
  TOPIC_VIDEO: '/topics/:topicId/videos/:videoId',
} as const
