import type { AssessmentQuestion, AssessmentResultItem } from '../../types'

interface MCQQuestionProps {
  question: AssessmentQuestion
  selectedAnswer: string | undefined
  onSelect: (answer: string) => void
  result?: AssessmentResultItem
}

export default function MCQQuestion({
  question,
  selectedAnswer,
  onSelect,
  result,
}: MCQQuestionProps) {
  const isSubmitted = !!result

  return (
    <div className="rounded-xl bg-[#12161F] border border-[#232838] p-6">
      <p className="text-sm font-medium text-[#E8EAED] mb-4 leading-relaxed">
        {question.question_text}
      </p>

      <div className="space-y-2">
        {question.options?.map((option) => {
          const isSelected = selectedAnswer === option
          const isCorrectAnswer = isSubmitted && result.correct_answer === option
          const isWrongSelection =
            isSubmitted && isSelected && !result.is_correct

          return (
            <button
              key={option}
              type="button"
              disabled={isSubmitted}
              onClick={() => onSelect(option)}
              className={`w-full text-left rounded-lg border px-4 py-3 text-sm transition ${
                isCorrectAnswer
                  ? 'bg-[#4F9DFF]/10 border-[#4F9DFF] text-[#E8EAED]'
                  : isWrongSelection
                    ? 'bg-red-500/10 border-red-500/50 text-[#E8EAED]'
                    : isSelected
                      ? 'bg-[#0B0E14] border-[#4F9DFF] text-[#E8EAED]'
                      : 'bg-[#0B0E14] border-[#232838] text-[#8B93A7] hover:border-[#4F9DFF]/50 hover:text-[#E8EAED]'
              } ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
            >
              {option}
            </button>
          )
        })}
      </div>

      {isSubmitted && (
        <p
          className={`text-xs font-medium mt-4 ${
            result.is_correct ? 'text-[#4F9DFF]' : 'text-red-400'
          }`}
        >
          {result.is_correct
            ? 'Correct!'
            : `Incorrect — the correct answer was "${result.correct_answer}"`}
        </p>
      )}
    </div>
  )
}