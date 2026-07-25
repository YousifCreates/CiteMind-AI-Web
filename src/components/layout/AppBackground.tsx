import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
}

const PARTICLE_COUNT = 45
const CONNECT_DISTANCE = 170
const ACCENT = '79, 157, 255'

export default function AppBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = canvas.clientWidth
    let height = canvas.clientHeight
    let animationFrameId: number

    function resize() {
      if (!canvas) return
      width = canvas.clientWidth
      height = canvas.clientHeight
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx?.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
    }))

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECT_DISTANCE) {
            const opacity = (1 - dist / CONNECT_DISTANCE) * 0.18
            ctx.strokeStyle = `rgba(${ACCENT}, ${opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${ACCENT}, 0.5)`
        ctx.shadowColor = `rgba(${ACCENT}, 0.4)`
        ctx.shadowBlur = 4
        ctx.fill()
        ctx.shadowBlur = 0
      }

      animationFrameId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(#4F9DFF 1px, transparent 1px), linear-gradient(90deg, #4F9DFF 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />
    </>
  )
}