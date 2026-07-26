import { useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Sparkles, ArrowLeft } from 'lucide-react'
import TopicVideoChat from '../components/youtube/TopicVideoChat'
import VideoTranscriptPanel from '../components/youtube/VideoTranscriptPanel'
import {
  useTopicVideos,
  useGenerateTopicVideos,
} from '../hooks/useYoutube'
import { ROUTES } from '../constants'

export default function TopicVideo() {
  const { topicId, videoId } = useParams<{ topicId: string; videoId: string }>()
  const navigate = useNavigate()

  const { data: videos, isLoading } = useTopicVideos(topicId ?? null)
  const { mutate: generateVideos, isPending: isGenerating } = useGenerateTopicVideos(
    topicId ?? '',
  )

  const isPlaceholder = videoId === '_'
  const activeVideo = videos?.find((v) => v.video_id === videoId)
  const hasAttemptedAutoGenerate = useRef(false)

  useEffect(() => {
    if (
      isPlaceholder &&
      videos &&
      videos.length === 0 &&
      !isGenerating &&
      !hasAttemptedAutoGenerate.current
    ) {
      hasAttemptedAutoGenerate.current = true
      generateVideos()
    }
  }, [isPlaceholder, videos, isGenerating])

  if (!topicId) return null

  if (isPlaceholder) {
    return (
      <div className="flex flex-col h-full">
        <div className="border-b border-[#232838] px-6 py-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-[#8B93A7] hover:text-[#E8EAED] transition"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-sm font-semibold text-[#E8EAED]">Videos for this topic</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {isLoading || isGenerating ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-6 h-6 border-2 border-[#232838] border-t-[#4F9DFF] rounded-full animate-spin" />
              <p className="text-sm text-[#8B93A7]">Finding videos on YouTube...</p>
            </div>
          ) : videos && videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {videos.map((video) => (
                <button
                  key={video.id}
                  type="button"
                  onClick={() =>
                    navigate(
                      ROUTES.TOPIC_VIDEO.replace(':topicId', topicId).replace(
                        ':videoId',
                        video.video_id,
                      ),
                    )
                  }
                  className="text-left rounded-xl bg-[#12161F] border border-[#232838] overflow-hidden hover:border-[#4F9DFF]/60 transition"
                >
                  {video.thumbnail_url && (
                    <img
                      src={video.thumbnail_url}
                      alt=""
                      className="w-full aspect-video object-cover"
                    />
                  )}
                  <div className="p-3">
                    <p className="text-sm font-medium text-[#E8EAED] line-clamp-2 mb-1">
                      {video.title}
                    </p>
                    {video.channel_title && (
                      <p className="text-xs text-[#8B93A7]">{video.channel_title}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
              <div className="w-12 h-12 rounded-full bg-[#4F9DFF]/10 border border-[#4F9DFF]/30 flex items-center justify-center">
                <Sparkles size={20} className="text-[#4F9DFF]" />
              </div>
              <p className="text-sm text-[#8B93A7] max-w-sm">
                No videos found yet for this topic.
              </p>
              <button
                type="button"
                onClick={() => generateVideos()}
                disabled={isGenerating}
                className="rounded-lg bg-[#4F9DFF] text-[#0B0E14] font-medium px-4 py-2 text-sm hover:opacity-90 disabled:opacity-50 transition"
              >
                Find videos on YouTube
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (!activeVideo) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#232838] border-t-[#4F9DFF] rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="border-b border-[#232838] px-6 py-4 flex items-center gap-3 flex-shrink-0">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-[#8B93A7] hover:text-[#E8EAED] transition"
        >
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-sm font-semibold text-[#E8EAED] truncate">
          {activeVideo.title}
        </h2>
      </div>

      <div className="w-full max-w-3xl mx-auto aspect-video max-h-[45vh] bg-black flex-shrink-0 mt-4">
        <iframe
          src={`https://www.youtube.com/embed/${activeVideo.video_id}`}
          title={activeVideo.title}
          className="w-full h-full"
          allowFullScreen
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl mx-auto w-full p-6">
        <div className="rounded-xl border border-[#232838] overflow-hidden h-[500px]">
          <VideoTranscriptPanel videoId={activeVideo.id} />
        </div>
        <div className="rounded-xl border border-[#232838] overflow-hidden h-[500px]">
          <TopicVideoChat topicId={topicId} videoId={activeVideo.id} />
        </div>
      </div>
    </div>
  )
}
