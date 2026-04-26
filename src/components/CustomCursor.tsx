import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const dotX = useSpring(x, { damping: 35, stiffness: 800, mass: 0.3 })
  const dotY = useSpring(y, { damping: 35, stiffness: 800, mass: 0.3 })
  const ringX = useSpring(x, { damping: 22, stiffness: 220, mass: 0.6 })
  const ringY = useSpring(y, { damping: 22, stiffness: 220, mass: 0.6 })

  const [hover, setHover] = useState(false)
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches
    if (isTouch) {
      setEnabled(false)
      return
    }
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const interactive = t.closest('a, button, input, textarea, [data-cursor="hover"]')
      setHover(Boolean(interactive))
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{ x: dotX, y: dotY }}
      >
        <div
          className="rounded-full bg-white"
          style={{
            width: hover ? 14 : 8,
            height: hover ? 14 : 8,
            transform: 'translate(-50%, -50%)',
            transition: 'width 0.18s, height 0.18s',
          }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{ x: ringX, y: ringY }}
      >
        <div
          className="rounded-full"
          style={{
            width: hover ? 56 : 36,
            height: hover ? 56 : 36,
            transform: 'translate(-50%, -50%)',
            border: '1.5px solid rgba(179,71,255,0.8)',
            boxShadow: '0 0 24px rgba(179,71,255,0.45)',
            transition: 'width 0.25s, height 0.25s',
            backdropFilter: 'invert(0.05)',
          }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9990]"
        style={{ x: ringX, y: ringY }}
      >
        <div
          className="rounded-full"
          style={{
            width: 320,
            height: 320,
            transform: 'translate(-50%, -50%)',
            background:
              'radial-gradient(circle, rgba(179,71,255,0.18) 0%, rgba(90,247,255,0.06) 35%, transparent 65%)',
            filter: 'blur(2px)',
          }}
        />
      </motion.div>
    </>
  )
}
