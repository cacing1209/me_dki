import { useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'

function useParticles(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 2 + 0.6,
        delay: Math.random() * -25,
        duration: 18 + Math.random() * 22,
        hue: Math.random() > 0.5 ? '#b347ff' : '#5af7ff',
        opacity: 0.25 + Math.random() * 0.55,
      })),
    [count],
  )
}

function StarCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.2,
      tw: Math.random() * Math.PI * 2,
      sp: 0.005 + Math.random() * 0.015,
    }))

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        s.tw += s.sp
        const alpha = 0.4 + Math.sin(s.tw) * 0.4
        ctx.beginPath()
        ctx.fillStyle = `rgba(220, 210, 255, ${alpha})`
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-60"
    />
  )
}

export default function Background() {
  const particles = useParticles(28)

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div className="absolute inset-0 bg-aurora" />
      <div className="absolute inset-0 bg-cyber-grid" />
      <StarCanvas />

      {/* drifting particles */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              bottom: '-20px',
              width: p.size * 4,
              height: p.size * 4,
              background: p.hue,
              opacity: p.opacity,
              boxShadow: `0 0 ${p.size * 8}px ${p.hue}`,
              animation: `drift ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* big floating blurs */}
      <motion.div
        className="absolute -top-24 -left-24 h-[480px] w-[480px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(179,71,255,0.45), transparent 70%)',
          filter: 'blur(70px)',
        }}
        animate={{ x: [0, 60, -40, 0], y: [0, 40, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 right-0 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(90,247,255,0.35), transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{ x: [0, -80, 40, 0], y: [0, -50, 30, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* moving scanline */}
      <motion.div
        className="absolute left-0 right-0 h-[3px]"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(90,247,255,0.55), transparent)',
          boxShadow: '0 0 30px rgba(90,247,255,0.45)',
        }}
        animate={{ y: ['-10vh', '110vh'] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
      />

      {/* noise overlay */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay bg-noise" />
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%)',
        }}
      />
    </div>
  )
}
