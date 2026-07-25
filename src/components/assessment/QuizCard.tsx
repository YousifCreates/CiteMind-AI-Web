import { ASSESSMENT_TYPES } from '../../constants'
import MCQQuestion from './MCQQuestion'
import CodeChallenge from './CodeChallenge'
import type { AssessmentQuestion, AssessmentResultItem } from '../../types'

interface QuizCardProps {
  question: AssessmentQuestion
  index: number
  answer: string | undefined
  onAnswerChange: (questionId: string, answer: string) => void
  result?: AssessmentResultItem
}

export default function QuizCard({
  question,
  index,
  answer,
  onAnswerChange,
  result,
}: QuizCardProps) {
  return (
    <div>
      <div className="text-xs font-medium text-[#8B93A7] mb-2">
        Question {index + 1}
      </div>

      {question.question_type === ASSESSMENT_TYPES.CODE ? (
        <CodeChallenge
          question={question}
          answer={answer}
          onChange={(code) => onAnswerChange(question.id, code)}
          result={result}
        />
      ) : (
        <MCQQuestion
          question={question}
          selectedAnswer={answer}
          onSelect={(option) => onAnswerChange(question.id, option)}
          result={result}
        />
      )}
    </div>
  )
}