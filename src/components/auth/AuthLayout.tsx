import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import NeuralNetworkCanvas from './NeuralNetworkCanvas'

const TAGLINES = [
  ['Read', 'papers.', 'Learn', 'faster.'],
  ['Every', 'answer,', 'traced', 'to', 'its', 'source.'],
  ['Turn', 'papers', 'into', 'real', 'understanding.'],
]

function AnimatedTagline() {
  const [index, setIndex] = useState(0)
  const [key, setKey] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TAGLINES.length)
      setKey((prev) => prev + 1)
    }, 4200)
    return () => clearInterval(interval)
  }, [])

  const words = TAGLINES[index]

  return (
    <h1 key={key} className="text-5xl xl:text-6xl font-extrabold leading-tight">
      {words.map((word, i) => (
        <span
          key={i}
          className="animate-word-reveal animate-shimmer inline-block mr-3 bg-gradient-to-r from-[#E8EAED] via-[#4F9DFF] to-[#E8EAED] bg-clip-text text-transparent"
          style={{ animationDelay: `${i * 0.09}s` }}
        >
          {word}
        </span>
      ))}
    </h1>
  )
}

const STATS = [
  { value: '12.4k', label: 'PAPERS' },
  { value: '3.1k', label: 'MODULES' },
  { value: '84k', label: 'CITATIONS' },
]

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#0B0E14] overflow-hidden">
      <NeuralNetworkCanvas />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left: brand + tagline + stats */}
        <div className="flex-1 max-w-xl">
          <div className="flex items-center gap-3 mb-10">
            <img src="/logo/logo-icon-dark.png" alt="CiteMind" className="w-8 h-8" />
            <span className="text-xl font-bold text-[#E8EAED]">CiteMind</span>
            <span className="text-xs font-medium text-[#8B93A7] border border-[#232838] rounded-full px-2 py-0.5">
              APP
            </span>
          </div>

          <AnimatedTagline />

          <p className="mt-6 text-[#8B93A7] text-lg leading-relaxed max-w-md">
            A citation-grounded workspace for reading papers, building learning
            paths, and testing what you actually understand.
          </p>

          <div className="flex gap-8 mt-12">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-[#E8EAED]">{stat.value}</div>
                <div className="text-xs tracking-wide text-[#8B93A7] mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 mt-16 text-sm text-[#8B93A7]">
            <span className="w-2 h-2 rounded-full bg-[#4F9DFF] animate-pulse" />
            api.citemind.com &middot; online
          </div>
        </div>

        {/* Right: floating card */}
        <div className="w-full max-w-md">
          <div className="bg-[#12161F]/90 backdrop-blur-xl border border-[#232838] rounded-2xl shadow-[0_0_60px_-10px_rgba(79,157,255,0.25)] px-8 py-10">
            {children}
          </div>
          <p className="text-center text-xs text-[#8B93A7] mt-6">
            By continuing you agree to the{' '}
            <a href="#" className="hover:text-[#4F9DFF] hover:underline">
              Terms
            </a>{' '}
            &middot;{' '}
            <a href="#" className="hover:text-[#4F9DFF] hover:underline">
              Privacy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}