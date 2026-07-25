import type {
  TeachingMode,
  ResearchSource,
  AssessmentType,
  ProgressStatus,
  RecommendationType,
} from '../constants'

// ---------- Auth ----------
export interface User {
  id: string
  email: string
  full_name?: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: User
}

export interface RegisterPayload {
  email: string
  password: string
  full_name?: string
}

export interface LoginPayload {
  email: string
  password: string
}

// ---------- Chat ----------
export interface ChatSession {
  id: string
  title: string
  teaching_mode: TeachingMode | string
  created_at: string
  updated_at: string
}
export interface Citation {
  source_type: 'ingested' | 'external'
  paper_id: string | null
  external_id: string | null
  external_source: 'semantic_scholar' | 'arxiv' | 'openalex' | null
  paper_title: string
  chunk_text: string | null
  abstract: string | null
  authors: string[]
  year: number | null
  url: string | null
  score: number | null
}


export interface ChatMessage {
  id: string
  session_id: string
  role: 'user' | 'assistant'
  content: string
  agent_used?: string | null
  created_at: string
  citations?: Citation[] | null
}

export interface ChatSessionWithMessages extends ChatSession {
  messages: ChatMessage[]
}

export interface ChatSessionListResponse {
  sessions: ChatSession[]
  total: number
}

export interface CreateChatSessionPayload {
  title?: string
  teaching_mode?: TeachingMode | string
}

export interface UpdateChatSessionPayload {
  title?: string
  teaching_mode?: TeachingMode | string
}

export interface SendMessagePayload {
  content: string
  mode?: 'direct' | 'socratic' | 'research'
}

export interface SendMessageResponse {
  user_message: ChatMessage
  assistant_message: ChatMessage
}

// ---------- Research ----------
export interface ResearchSearchResult {
  external_id: string
  source: ResearchSource | string
  title: string
  abstract: string
  authors: string[]
  year: number
  url: string
  already_ingested: boolean
}

export interface ResearchSearchPayload {
  query: string
  limit?: number
  source?: ResearchSource | string
}

export interface ResearchSearchResponse {
  query: string
  results: ResearchSearchResult[]
  total: number
}

export interface IngestPaperPayload {
  external_id: string
  source: ResearchSource | string
}

export interface IngestPaperResponse {
  paper_id: string
  title: string
  status: 'ingested' | 'already_exists'
  chunk_count: number
}

export interface PaperChunk {
  id: string
  paper_id: string
  chunk_text: string
  chunk_index?: number
}

export interface Paper {
  id: string
  title: string
  abstract?: string
  authors?: string[]
  year?: number
  url?: string
  source?: ResearchSource | string
  chunks?: PaperChunk[]
}

export interface ChunkSearchPayload {
  query: string
  limit?: number
  rerank?: boolean
}

export interface ChunkSearchResult {
  chunk_id: string
  paper_id: string
  paper_title: string
  chunk_text: string
  score: number
}

export interface ChunkSearchResponse {
  query: string
  results: ChunkSearchResult[]
}

// ---------- Learning ----------
export interface LearningModule {
  id: string
  title: string
  description?: string
  order_index: number
  is_completed: boolean
  prerequisite_module_ids: string[]
}

export interface LearningPath {
  id: string
  topic: string
  description?: string
  created_at?: string
  updated_at?: string
}

export interface LearningPathWithModules extends LearningPath {
  modules: LearningModule[]
}

export interface LearningPathListResponse {
  learning_paths: LearningPath[]
  total: number
}

export interface CreateLearningPathPayload {
  topic: string
  description?: string
}

export interface CreateModulePayload {
  title: string
  description?: string
  order_index?: number
  prerequisite_module_ids?: string[]
}

export interface UpdateModulePayload {
  title?: string
  description?: string
  order_index?: number
  is_completed?: boolean
}

export interface GenerateLearningPathPayload {
  topic: string
  context?: string
}

export interface GenerateLearningPathResponse {
  learning_path: LearningPathWithModules
}

// ---------- Assessment ----------
export interface AssessmentQuestion {
  id: string
  question_text: string
  question_type: AssessmentType | string
  options?: string[]
  starter_code?: string
}

export interface AssessmentQuestionInput {
  question_text: string
  question_type: AssessmentType | string
  options?: string[]
  correct_answer: string
  starter_code?: string
}

export interface Assessment {
  id: string
  module_id?: string | null
  topic_id?: string | null
  assessment_type: AssessmentType | string
  is_gating?: boolean
  questions: AssessmentQuestion[]
}

export interface CreateAssessmentPayload {
  module_id?: string | null
  topic_id?: string | null
  assessment_type: AssessmentType | string
  is_gating?: boolean
  questions: AssessmentQuestionInput[]
}

export interface GatingStatus {
  module_id: string
  has_gating_quiz: boolean
  best_score: number | null
  passing_threshold: number
  has_passed: boolean
}

export interface SubmitAnswerPayload {
  question_id: string
  answer_text: string
}

export interface SubmitAssessmentPayload {
  answers: SubmitAnswerPayload[]
}

export interface AssessmentResultItem {
  question_id: string
  question_text: string
  submitted_answer: string
  correct_answer: string
  is_correct: boolean
}

export interface SubmitAssessmentResponse {
  assessment_id: string
  score: number
  results: AssessmentResultItem[]
}

export interface GenerateAssessmentPayload {
  module_id?: string | null
  topic_id?: string | null
  topic: string
  assessment_type?: AssessmentType | string
  num_questions?: number
  is_gating?: boolean
}

export interface GenerateAssessmentResponse {
  assessment: Assessment
}

// ---------- Progress ----------
export interface ModuleProgress {
  id: string
  user_id: string
  module_id: string
  status: ProgressStatus | string
  score?: number | null
  weakness_notes?: string | null
  updated_at: string
}

export interface UpdateModuleProgressPayload {
  status?: ProgressStatus | string
  score?: number
}

export interface ProgressDashboardRecord extends ModuleProgress {
  module_title: string
  learning_path_id: string
  learning_path_topic: string
}

export interface ProgressDashboardResponse {
  total_modules: number
  completed_modules: number
  in_progress_modules: number
  not_started_modules: number
  average_score: number
  records: ProgressDashboardRecord[]
}

export interface WeaknessArea {
  module_id: string
  module_title: string
  score: number
  weakness_notes?: string | null
}

export interface WeaknessesResponse {
  weak_areas: WeaknessArea[]
  summary: string
}

export interface NextStepRecommendation {
  module_id: string
  module_title: string
  reasoning: string
  recommendation_type: RecommendationType | string
}

export interface NextStepPayload {
  learning_path_id?: string
}

export interface NextStepResponse {
  recommendation: NextStepRecommendation
}

// ---------- Shared API error shape ----------
export interface ApiErrorResponse {
  detail?: string | { msg: string; type: string }[]
}
// ---------- Topics ----------
export interface Topic {
  id: string
  module_id: string
  title: string
  description?: string | null
  order_index: number
  created_at: string
}

export interface ModuleWithTopics extends LearningModule {
  topics: Topic[]
}

export interface GenerateTopicsPayload {
  context?: string
}

export interface GenerateTopicsResponse {
  module: ModuleWithTopics
}

export interface TopicProgress {
  id: string
  user_id: string
  topic_id: string
  status: ProgressStatus | string
  updated_at: string
}

export interface UpdateTopicProgressPayload {
  status: ProgressStatus | string
}

// ---------- YouTube video integration ----------
export interface Video {
  id: string
  topic_id: string
  video_id: string
  title: string
  channel_title?: string | null
  thumbnail_url?: string | null
  url: string
  created_at: string
}

export interface GenerateVideosResponse {
  videos: Video[]
}

export interface VideoTranscript {
  video_id: string
  language: string
  content: string | null
  available: boolean
}

export interface GetTranscriptPayload {
  language: string
}

export interface TopicChatMessage {
  id: string
  session_id: string
  role: 'user' | 'assistant'
  content: string
  created_at: string
}

export interface TopicChatSession {
  id: string
  topic_id: string
  video_id: string
  messages: TopicChatMessage[]
}

export interface SendTopicChatMessagePayload {
  content: string
}

export interface SendTopicChatMessageResponse {
  user_message: TopicChatMessage
  assistant_message: TopicChatMessage
}
