import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    mass: 0.4,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left"
      style={{
        scaleX,
        background:
          'linear-gradient(90deg, #b347ff, #5af7ff, #ff3df0, #c6ff00)',
        boxShadow: '0 0 14px rgba(179,71,255,0.7)',
      }}
    />
  )
}
