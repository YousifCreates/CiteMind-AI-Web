import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CheckCircle2, Circle, Lock, MessageSquarePlus, ShieldCheck, ShieldAlert } from 'lucide-react'
import type { LearningModule } from '../../types'
import ModuleTopics from './ModuleTopics'
import { useStartModuleChat } from '../../hooks/useStartModuleChat'
import { useUpdateModule } from '../../hooks/useLearning'
import { useUpdateAnyModuleProgress, useGatingStatus } from '../../hooks/useProgress'
import { useGenerateAssessment } from '../../hooks/useAssessment'

interface ModuleCardProps {
  module: LearningModule
  pathId: string
  pathTopic: string
  isLocked?: boolean
}

export default function ModuleCard({ module, pathId, pathTopic, isLocked }: ModuleCardProps) {
  const navigate = useNavigate()
  const { startModuleChat } = useStartModuleChat()
  const { mutate: updateModule } = useUpdateModule(pathId)
  const { mutate: updateModuleProgress, isPending: isUpdatingProgress } = useUpdateAnyModuleProgress()
  const { mutate: generateAssessment, isPending: isGeneratingQuiz } = useGenerateAssessment()
  const { data: gatingStatus } = useGatingStatus(isLocked ? null : module.id)

  const [completeError, setCompleteError] = useState<string | null>(null)

  const quizPassed = gatingStatus?.has_passed ?? false
  const quizAttempted = gatingStatus?.has_gating_quiz ?? false

  function handleToggleComplete() {
    const nextCompleted = !module.is_completed
    setCompleteError(null)

    updateModuleProgress(
      {
        moduleId: module.id,
        payload: { status: nextCompleted ? 'completed' : 'in_progress' },
      },
      {
        onSuccess: () => {
          updateModule({
            moduleId: module.id,
            payload: { is_completed: nextCompleted },
          })
        },
        onError: (error) => {
          const detail = axios.isAxiosError(error)
            ? (error.response?.data as { detail?: string } | undefined)?.detail
            : undefined
          setCompleteError(detail ?? 'Unable to update this module right now.')
        },
      },
    )
  }

  function handleTakeQuiz() {
    setCompleteError(null)
    generateAssessment(
      {
        module_id: module.id,
        topic: module.title,
        assessment_type: 'mcq',
        num_questions: 30,
        is_gating: true,
      },
      {
        onSuccess: (result) => {
          navigate(`/assessment/${result.assessment.id}`)
        },
        onError: () => {
          setCompleteError('Could not generate the module quiz. Please try again.')
        },
      },
    )
  }

  return (
    <div
      className={`rounded-xl border px-4 py-4 transition ${
        isLocked
          ? 'bg-[#0D111A] border-[#232838]/60 opacity-60'
          : module.is_completed
            ? 'bg-[#12161F] border-[#4F9DFF]/40'
            : 'bg-[#12161F] border-[#232838] hover:border-[#4F9DFF]/60'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-[#E8EAED]">{module.title}</h4>
          {module.description && (
            <p className="text-xs text-[#8B93A7] mt-1 leading-relaxed">
              {module.description}
            </p>
          )}
        </div>
        {isLocked && (
          <Lock size={18} className="flex-shrink-0 text-[#8B93A7] mt-0.5" />
        )}
      </div>

      {!isLocked && !module.is_completed && (
        <div className="mt-3">
          {quizPassed ? (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#4F9DFF] bg-[#4F9DFF]/10 border border-[#4F9DFF]/20 rounded-full px-2 py-0.5">
              <ShieldCheck size={12} />
              Quiz passed
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#8B93A7] bg-[#0B0E14] border border-[#232838] rounded-full px-2 py-0.5">
              <ShieldAlert size={12} />
              {quizAttempted ? 'Quiz not yet passed' : 'Module quiz required'}
            </span>
          )}
        </div>
      )}

      {!isLocked && (
        <div className="flex flex-wrap gap-2 mt-3">
          {!module.is_completed && !quizPassed && (
            <button
              type="button"
              onClick={handleTakeQuiz}
              disabled={isGeneratingQuiz}
              className="flex items-center gap-1.5 text-xs font-medium rounded-lg px-3 py-1.5 bg-[#4F9DFF]/10 border border-[#4F9DFF]/40 text-[#4F9DFF] hover:bg-[#4F9DFF]/20 disabled:opacity-50 transition"
            >
              <ShieldAlert size={14} />
              {isGeneratingQuiz
                ? 'Preparing quiz...'
                : quizAttempted
                  ? 'Retake module quiz'
                  : 'Take module quiz'}
            </button>
          )}

          <button
            type="button"
            onClick={handleToggleComplete}
            disabled={isUpdatingProgress || (!module.is_completed && !quizPassed)}
            title={
              !module.is_completed && !quizPassed
                ? 'Pass the module quiz first to unlock completion'
                : undefined
            }
            className={`flex items-center gap-1.5 text-xs font-medium rounded-lg px-3 py-1.5 transition disabled:opacity-40 disabled:cursor-not-allowed ${
              module.is_completed
                ? 'bg-[#4F9DFF]/10 border border-[#4F9DFF]/40 text-[#4F9DFF] hover:bg-[#4F9DFF]/20'
                : 'bg-[#0B0E14] border border-[#232838] text-[#8B93A7] hover:border-[#4F9DFF]/60 hover:text-[#E8EAED]'
            }`}
          >
            {module.is_completed ? (
              <>
                <CheckCircle2 size={14} />
                Completed
              </>
            ) : (
              <>
                <Circle size={14} />
                Mark as complete
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => startModuleChat(module, pathTopic)}
            className="flex items-center gap-1.5 text-xs font-medium rounded-lg px-3 py-1.5 bg-[#0B0E14] border border-[#232838] text-[#8B93A7] hover:border-[#4F9DFF]/60 hover:text-[#E8EAED] transition"
          >
            <MessageSquarePlus size={14} />
            Continue in chat
          </button>
        </div>
      )}

      {completeError && (
        <p className="text-[11px] text-red-400 mt-2 leading-relaxed">{completeError}</p>
      )}

      {isLocked && (
        <p className="text-[11px] text-[#8B93A7] mt-3">
          Complete the prerequisite module(s) to unlock this.
        </p>
      )}

      {!isLocked && <ModuleTopics moduleId={module.id} />}
    </div>
  )
}
