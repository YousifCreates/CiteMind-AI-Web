import { useState } from 'react'
import { Languages, FileText } from 'lucide-react'
import { useVideoTranscript } from '../../hooks/useYoutube'

interface VideoTranscriptPanelProps {
  videoId: string
}

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'ur', label: 'Urdu' },
  { code: 'ar', label: 'Arabic' },
  { code: 'hi', label: 'Hindi' },
]

export default function VideoTranscriptPanel({ videoId }: VideoTranscriptPanelProps) {
  const [language, setLanguage] = useState('en')
  const { mutate: fetchTranscript, data: transcript, isPending } = useVideoTranscript()

  function handleFetch(lang: string) {
    setLanguage(lang)
    fetchTranscript({ videoId, payload: { language: lang } })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b border-[#232838] px-4 py-3">
        <h3 className="text-sm font-semibold text-[#E8EAED] flex items-center gap-1.5">
          <FileText size={14} className="text-[#4F9DFF]" />
          Transcript
        </h3>
        <div className="relative">
          <select
            value={language}
            onChange={(e) => handleFetch(e.target.value)}
            className="appearance-none bg-[#12161F] border border-[#232838] rounded-lg pl-7 pr-3 py-1.5 text-xs text-[#E8EAED] focus:outline-none focus:ring-2 focus:ring-[#4F9DFF] transition cursor-pointer"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
          <Languages
            size={13}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-[#8B93A7] pointer-events-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {!transcript && !isPending && (
          <button
            type="button"
            onClick={() => handleFetch(language)}
            className="w-full rounded-lg bg-[#12161F] border border-[#232838] text-[#8B93A7] hover:text-[#E8EAED] hover:border-[#4F9DFF]/50 text-sm py-2.5 transition"
          >
            Load transcript
          </button>
        )}

        {isPending && (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <div className="w-5 h-5 border-2 border-[#232838] border-t-[#4F9DFF] rounded-full animate-spin" />
            <p className="text-xs text-[#8B93A7]">Fetching transcript...</p>
          </div>
        )}

        {transcript && !transcript.available && (
          <p className="text-sm text-[#8B93A7] text-center py-8">
            No transcript available for this video in this language. Try another
            language or video.
          </p>
        )}

        {transcript && transcript.available && transcript.content && (
          <p className="text-sm text-[#8B93A7] leading-relaxed whitespace-pre-wrap">
            {transcript.content}
          </p>
        )}
      </div>
    </div>
  )
}
