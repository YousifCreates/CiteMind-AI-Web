import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react'
import QuizCard from '../components/assessment/QuizCard'
import { useAssessment, useSubmitAssessment } from '../hooks/useAssessment'

export default function Assessment() {
  const { assessmentId } = useParams<{ assessmentId: string }>()
  const { data: assessment, isLoading } = useAssessment(assessmentId ?? null)
  const {
    mutate: submit,
    data: submission,
    isPending: isSubmitting,
  } = useSubmitAssessment(assessmentId ?? '')

  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [currentIndex, setCurrentIndex] = useState(0)

  function handleAnswerChange(questionId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  function handleSubmit() {
    if (!assessment) return
    submit({
      answers: assessment.questions.map((q) => ({
        question_id: q.id,
        answer_text: answers[q.id] ?? '',
      })),
    })
  }

  function getResultFor(questionId: string) {
    return submission?.results.find((r) => r.question_id === questionId)
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#232838] border-t-[#4F9DFF] rounded-full animate-spin" />
      </div>
    )
  }

  if (!assessment) {
    return (
      <div className="flex h-full items-center justify-center px-6">
        <p className="text-sm text-[#8B93A7]">Assessment not found.</p>
      </div>
    )
  }

  const totalQuestions = assessment.questions.length
  const currentQuestion = assessment.questions[currentIndex]
  const isFirst = currentIndex === 0
  const isLast = currentIndex === totalQuestions - 1
  const allAnswered = assessment.questions.every((q) => answers[q.id]?.trim())
  const isSubmitted = !!submission
  const answeredCount = assessment.questions.filter((q) => answers[q.id]?.trim()).length
  const progressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0

  return (
    <div className="h-full overflow-y-auto px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-[#E8EAED]">
            {assessment.is_gating ? 'Module Quiz' : 'Assessment'}
          </h1>
          {isSubmitted && (
            <div className="flex items-center gap-2 rounded-lg bg-[#4F9DFF]/10 border border-[#4F9DFF]/30 px-4 py-2">
              <CheckCircle2 size={16} className="text-[#4F9DFF]" />
              <span className="text-sm font-semibold text-[#E8EAED]">
                Score: {submission.score}%
              </span>
            </div>
          )}
        </div>

        {!isSubmitted && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-[#8B93A7] mb-1.5">
              <span>
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              <span>{answeredCount} answered</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#12161F] border border-[#232838] overflow-hidden">
              <div
                className="h-full bg-[#4F9DFF] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {isSubmitted ? (
          <div className="space-y-6">
            {assessment.questions.map((question, index) => (
              <QuizCard
                key={question.id}
                question={question}
                index={index}
                answer={answers[question.id]}
                onAnswerChange={handleAnswerChange}
                result={getResultFor(question.id)}
              />
            ))}
          </div>
        ) : (
          <>
            <QuizCard
              question={currentQuestion}
              index={currentIndex}
              answer={answers[currentQuestion.id]}
              onAnswerChange={handleAnswerChange}
            />

            <div className="flex items-center justify-between mt-6">
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={isFirst}
                className="flex items-center gap-1.5 rounded-lg border border-[#232838] text-[#E8EAED] font-medium px-4 py-2 text-sm hover:bg-[#12161F] disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              {isLast ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!allAnswered || isSubmitting}
                  className="rounded-lg bg-[#4F9DFF] text-[#0B0E14] font-semibold px-6 py-2 text-sm hover:opacity-90 disabled:opacity-50 transition"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit assessment'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                  className="flex items-center gap-1.5 rounded-lg bg-[#4F9DFF] text-[#0B0E14] font-semibold px-4 py-2 text-sm hover:opacity-90 transition"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
