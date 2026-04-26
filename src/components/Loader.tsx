import { AnimatePresence, motion } from 'framer-motion'

const lines = [
  '> booting kernel ...',
  '> loading neon palette ...',
  '> connecting MQTT broker ...',
  '> calibrating ESP32 ...',
  '> ready.',
]

export default function Loader({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0a0612]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
        >
          <div className="absolute inset-0 bg-cyber-grid opacity-40" />
          <motion.div
            className="absolute h-[400px] w-[400px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(179,71,255,0.6), transparent 70%)',
              filter: 'blur(60px)',
            }}
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative flex flex-col items-center gap-8">
            <motion.div
              className="relative h-28 w-28"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '2px solid transparent',
                  borderTopColor: '#b347ff',
                  borderRightColor: '#5af7ff',
                  filter: 'drop-shadow(0 0 12px rgba(179,71,255,0.8))',
                }}
              />
              <div
                className="absolute inset-3 rounded-full"
                style={{
                  border: '2px solid transparent',
                  borderBottomColor: '#ff3df0',
                  borderLeftColor: '#c6ff00',
                  animation: 'spin-slow 3s linear infinite reverse',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center font-mono text-2xl text-white">
                ⌬
              </div>
            </motion.div>

            <div className="font-mono text-xs text-mist-2">
              {lines.map((l, i) => (
                <motion.div
                  key={l}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.18, duration: 0.4 }}
                  className="text-[#8a82a8]"
                  style={i === lines.length - 1 ? { color: '#c6ff00' } : undefined}
                >
                  {l}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
