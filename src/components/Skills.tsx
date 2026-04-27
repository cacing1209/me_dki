import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { useT } from '../lib/i18n'

type Skill = {
  name: string
  glyph: string
  color: string
  category: 'lang' | 'hw' | 'proto' | 'tool'
}

const skills: Skill[] = [
  { name: 'C++', glyph: 'C++', color: '#00599C', category: 'lang' },
  { name: 'C', glyph: 'C', color: '#A8B9CC', category: 'lang' },
  { name: 'Python', glyph: 'Py', color: '#FFD43B', category: 'lang' },
  { name: 'TypeScript', glyph: 'TS', color: '#3178C6', category: 'lang' },
  { name: 'ESP32', glyph: '⌬32', color: '#E7352C', category: 'hw' },
  { name: 'ESP8266', glyph: '⌬86', color: '#0066B3', category: 'hw' },
  { name: 'Arduino', glyph: '◑', color: '#00979D', category: 'hw' },
  { name: 'Raspberry Pi', glyph: '🍓', color: '#A22846', category: 'hw' },
  { name: 'MQTT', glyph: '≋', color: '#660066', category: 'proto' },
  { name: 'AES', glyph: '⚿', color: '#c6ff00', category: 'proto' },
  { name: 'RFID', glyph: '))) ', color: '#5af7ff', category: 'proto' },
  { name: 'Docker', glyph: '🐳', color: '#2496ED', category: 'tool' },
  { name: 'EasyEDA', glyph: '⚒', color: '#1762a8', category: 'tool' },
  { name: 'LCSC', glyph: '⎘', color: '#ff3df0', category: 'tool' },
  { name: 'Linux', glyph: '🐧', color: '#FCC624', category: 'tool' },
]

const orbitItems = ['ESP32', 'Arduino', 'Python', 'C++', 'MQTT', 'RFID']

export default function Skills() {
  const { t } = useT()
  return (
    <section id="skills" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index={t('skills.idx')}
          title={t('skills.title')}
          subtitle={t('skills.subtitle')}
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Orbit visual */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto flex aspect-square w-full max-w-[460px] items-center justify-center">
              {/* rings */}
              {[1, 2, 3].map((r) => (
                <div
                  key={r}
                  className="absolute rounded-full border border-white/10"
                  style={{
                    width: `${r * 33}%`,
                    height: `${r * 33}%`,
                  }}
                />
              ))}

              {/* core */}
              <motion.div
                className="absolute z-10 flex h-24 w-24 items-center justify-center rounded-full font-display font-bold text-white"
                style={{
                  background:
                    'radial-gradient(circle, rgba(179,71,255,0.95) 0%, rgba(90,247,255,0.7) 60%, rgba(255,61,240,0.4) 100%)',
                  boxShadow:
                    '0 0 60px rgba(179,71,255,0.7), inset 0 0 30px rgba(255,255,255,0.4)',
                }}
                animate={{
                  rotate: 360,
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                <span className="text-2xl">{'<dki/>'}</span>
              </motion.div>

              {/* orbiting items */}
              {orbitItems.map((item, i) => {
                const radius = 180
                const duration = 18 + (i % 3) * 5
                return (
                  <motion.div
                    key={item}
                    className="absolute"
                    style={{
                      width: 0,
                      height: 0,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: -((duration / orbitItems.length) * i),
                    }}
                  >
                    <motion.div
                      className="glass absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 font-mono text-[11px] text-white whitespace-nowrap"
                      style={{
                        left: radius,
                        boxShadow: '0 0 20px rgba(179,71,255,0.4)',
                      }}
                      animate={{ rotate: -360 }}
                      transition={{
                        duration,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      {item}
                    </motion.div>
                  </motion.div>
                )
              })}

              {/* glow */}
              <div
                className="absolute inset-0 -z-10 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(179,71,255,0.25) 0%, transparent 60%)',
                  filter: 'blur(40px)',
                }}
              />
            </div>
          </div>

          {/* Grid of all skills */}
          <div className="lg:col-span-7">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.04 } },
              }}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
            >
              {skills.map((s) => (
                <motion.div
                  key={s.name}
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.8 },
                    show: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { type: 'spring', stiffness: 260, damping: 18 },
                    },
                  }}
                  whileHover={{ y: -6, scale: 1.05 }}
                  className="glass glass-hover group relative flex aspect-square flex-col items-center justify-center gap-2 overflow-hidden rounded-xl p-3"
                >
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at 50% 30%, ${s.color}30, transparent 65%)`,
                    }}
                  />
                  <div
                    className="font-display text-2xl font-bold transition-transform group-hover:scale-110"
                    style={{
                      color: s.color,
                      textShadow: `0 0 20px ${s.color}`,
                    }}
                  >
                    {s.glyph}
                  </div>
                  <div className="font-mono text-[11px] text-mist transition-colors group-hover:text-white">
                    {s.name}
                  </div>
                  <div
                    className="absolute -bottom-1 left-1/2 h-px w-3/4 -translate-x-1/2 origin-center scale-x-0 transition-transform group-hover:scale-x-100"
                    style={{ background: s.color, boxShadow: `0 0 10px ${s.color}` }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
