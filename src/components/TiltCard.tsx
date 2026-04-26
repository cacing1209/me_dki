import { useRef } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  intensity?: number
  className?: string
}

export default function TiltCard({
  children,
  intensity = 8,
  className = '',
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rx = (0.5 - py) * intensity
    const ry = (px - 0.5) * intensity
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`tilt-card ${className}`}
      style={{
        backgroundImage:
          'radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(179,71,255,0.08), transparent 40%)',
      }}
      {...rest}
    >
      {children}
    </div>
  )
}
