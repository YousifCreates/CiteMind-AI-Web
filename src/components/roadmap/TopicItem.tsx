import { CheckCircle2, Circle, Video } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Topic } from '../../types'
import { useTopicProgress, useUpdateAnyTopicProgress } from '../../hooks/useProgress'
import { ROUTES } from '../../constants'

interface TopicItemProps {
  topic: Topic
}

export default function TopicItem({ topic }: TopicItemProps) {
  const navigate = useNavigate()
  const { data: progress } = useTopicProgress(topic.id)
  const { mutate: updateProgress, isPending } = useUpdateAnyTopicProgress()

  const isCompleted = progress?.status === 'completed'

  function handleToggle() {
    updateProgress({
      topicId: topic.id,
      payload: { status: isCompleted ? 'in_progress' : 'completed' },
    })
  }

  function handleFindOnYouTube() {
    navigate(
      ROUTES.TOPIC_VIDEO.replace(':topicId', topic.id).replace(':videoId', '_'),
    )
  }

  return (
    <div className="flex items-start gap-3 rounded-lg bg-[#0B0E14] border border-[#232838] px-3 py-2.5">
      <button
        type="button"
        onClick={handleToggle}
        disabled={isPending}
        className="flex-shrink-0 mt-0.5 disabled:opacity-50"
      >
        {isCompleted ? (
          <CheckCircle2 size={16} className="text-[#4F9DFF]" />
        ) : (
          <Circle size={16} className="text-[#8B93A7] hover:text-[#4F9DFF] transition" />
        )}
      </button>
      <div className="min-w-0">
        <p
          className={`text-sm ${
            isCompleted ? 'text-[#8B93A7] line-through' : 'text-[#E8EAED]'
          }`}
        >
          {topic.title}
        </p>
        {topic.description && (
          <p className="text-xs text-[#8B93A7] mt-0.5 leading-relaxed">
            {topic.description}
          </p>
        )}
        <button
          type="button"
          onClick={handleFindOnYouTube}
          className="flex items-center gap-1.5 text-xs font-medium text-[#8B93A7] hover:text-[#4F9DFF] mt-2 transition"
        >
          <Video size={13} />
          Find on YouTube
        </button>
      </div>
    </div>
  )
}