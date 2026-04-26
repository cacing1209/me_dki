import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  index: string
  title: string
  subtitle?: string
  children?: ReactNode
}

export default function SectionHeading({ index, title, subtitle, children }: Props) {
  return (
    <div className="mb-12 flex flex-col items-start gap-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.4em] text-[#5af7ff]"
      >
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#5af7ff]" />
        <span>{index}</span>
        <span className="text-mist-2">// {subtitle ?? title}</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
      >
        <span className="text-gradient">{title}</span>
      </motion.h2>

      {children}
    </div>
  )
}
