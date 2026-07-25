import { useState } from 'react'
import type { AssessmentQuestion, AssessmentResultItem } from '../../types'

interface CodeChallengeProps {
  question: AssessmentQuestion
  answer: string | undefined
  onChange: (code: string) => void
  result?: AssessmentResultItem
}

export default function CodeChallenge({
  question,
  answer,
  onChange,
  result,
}: CodeChallengeProps) {
  const [code, setCode] = useState(answer ?? question.starter_code ?? '')
  const isSubmitted = !!result

  function handleChange(value: string) {
    setCode(value)
    onChange(value)
  }

  return (
    <div className="rounded-xl bg-[#12161F] border border-[#232838] p-6">
      <p className="text-sm font-medium text-[#E8EAED] mb-4 leading-relaxed">
        {question.question_text}
      </p>

      <textarea
        value={code}
        onChange={(e) => handleChange(e.target.value)}
        disabled={isSubmitted}
        spellCheck={false}
        rows={10}
        className="w-full rounded-lg bg-[#0B0E14] border border-[#232838] px-4 py-3 text-sm text-[#E8EAED] font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#4F9DFF] disabled:opacity-70 transition resize-y"
      />

      {isSubmitted && (
        <div className="mt-4 space-y-2">
          <p
            className={`text-xs font-medium ${
              result.is_correct ? 'text-[#4F9DFF]' : 'text-red-400'
            }`}
          >
            {result.is_correct ? 'Correct!' : 'Incorrect'}
          </p>
          {!result.is_correct && (
            <div className="text-xs text-[#8B93A7] bg-[#0B0E14] border border-[#232838] rounded-lg px-4 py-3 font-mono whitespace-pre-wrap">
              {result.correct_answer}
            </div>
          )}
        </div>
      )}
    </div>
  )
}