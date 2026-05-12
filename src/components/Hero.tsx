import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useT } from '../lib/i18n'
import { useTheme } from '../lib/theme'
import type { Lang } from '../lib/translations'

const ROLES: Record<Lang, string[]> = {
  en: [
    'IoT Engineer',
    'Hardware Tinkerer',
    'Microcontroller Hacker',
    'Maker',
    'MQTT Wizard',
  ],
  id: [
    'Insinyur IoT',
    'Penjelajah Hardware',
    'Penjinak Microcontroller',
    'Maker',
    'Penyetel MQTT',
  ],
}

function useTyping(words: string[], speed = 90, pause = 1300) {
  const [i, setI] = useState(0)
  const [text, setText] = useState('')
  const [del, setDel] = useState(false)

  // reset when language (word list) changes
  useEffect(() => {
    setI(0)
    setText('')
    setDel(false)
  }, [words])

  useEffect(() => {
    const word = words[i % words.length]
    const t = setTimeout(
      () => {
        if (!del) {
          setText(word.slice(0, text.length + 1))
          if (text.length + 1 === word.length) {
            setTimeout(() => setDel(true), pause)
          }
        } else {
          setText(word.slice(0, Math.max(text.length - 1, 0)))
          if (text.length - 1 <= 0) {
            setDel(false)
            setI((p) => p + 1)
          }
        }
      },
      del ? speed / 2 : speed,
    )
    return () => clearTimeout(t)
  }, [text, del, i, words, speed, pause])

  return text
}

function Letters({ text }: { text: string }) {
  return (
    <span aria-label={text} className="inline-block">
      {text.split('').map((ch, i) => (
        <motion.span
          key={`${text}-${i}`}
          className="inline-block"
          initial={{ y: 80, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{
            delay: 0.7 + i * 0.045,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  )
}

export default function Hero({ name = 'diki' }: { name?: string }) {
  const { t, lang } = useT()
  const role = useTyping(ROLES[lang])
  const heading = `${t('hero.greeting')} ${name}`
  const [theme, toggleTheme] = useTheme()
  const isDark = theme === 'dark'

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pt-28 pb-20"
    >
      {/* celestial toggle — moon (dark) ↔ sun (light) */}
      <div className="absolute top-10 left-1/2 z-20 -translate-x-1/2 sm:top-14 md:top-16">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? 'switch to light mode' : 'switch to dark mode'}
          aria-pressed={!isDark}
          className="group relative block cursor-pointer bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          style={{ width: 120, height: 120 }}
        >
          {/* halo / glow */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full"
            animate={{
              background: isDark
                ? 'radial-gradient(circle, rgba(200,210,255,0.30) 0%, rgba(140,160,220,0.10) 40%, transparent 70%)'
                : 'radial-gradient(circle, rgba(255,220,140,0.55) 0%, rgba(255,170,80,0.20) 40%, transparent 70%)',
              scale: isDark ? 1 : 1.15,
            }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ filter: 'blur(8px)' }}
          />

          {/* the celestial body — rotates as it morphs */}
          <motion.div
            className="absolute inset-0 grid place-items-center"
            animate={{ rotate: isDark ? 0 : 360 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.svg
                  key="moon"
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    filter:
                      'drop-shadow(0 0 18px rgba(200,210,255,0.55)) drop-shadow(0 0 40px rgba(140,160,220,0.35))',
                  }}
                >
                  <defs>
                    <radialGradient id="moon-g" cx="35%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#fbf6ff" />
                      <stop offset="60%" stopColor="#dcd6ff" />
                      <stop offset="100%" stopColor="#9aa3d6" />
                    </radialGradient>
                  </defs>
                  <circle cx="30" cy="30" r="22" fill="url(#moon-g)" />
                  <circle cx="22" cy="24" r="2.4" fill="rgba(120,130,180,0.35)" />
                  <circle cx="36" cy="22" r="1.6" fill="rgba(120,130,180,0.30)" />
                  <circle cx="34" cy="36" r="3" fill="rgba(120,130,180,0.30)" />
                  <circle cx="24" cy="38" r="1.8" fill="rgba(120,130,180,0.25)" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="sun"
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    filter:
                      'drop-shadow(0 0 22px rgba(255,210,127,0.85)) drop-shadow(0 0 50px rgba(255,170,80,0.55))',
                  }}
                >
                  <defs>
                    <radialGradient id="sun-g" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#fff7d6" />
                      <stop offset="60%" stopColor="#ffd27f" />
                      <stop offset="100%" stopColor="#ff9d3d" />
                    </radialGradient>
                  </defs>
                  <motion.g
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 28,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    style={{ transformOrigin: '40px 40px' }}
                  >
                    {Array.from({ length: 8 }).map((_, i) => (
                      <rect
                        key={i}
                        x="38.5"
                        y="4"
                        width="3"
                        height="12"
                        rx="1.5"
                        fill="#ffd27f"
                        transform={`rotate(${i * 45} 40 40)`}
                      />
                    ))}
                  </motion.g>
                  <circle cx="40" cy="40" r="18" fill="url(#sun-g)" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.div>
        </button>
      </div>

      {/* floating orbital icons */}
      <div className="pointer-events-none absolute inset-0">
        {[
          { top: '14%', left: '8%', label: '{ }', delay: 0 },
          { top: '24%', right: '10%', label: '</>', delay: 0.4 },
          { bottom: '22%', left: '12%', label: '⌬', delay: 0.8 },
          { bottom: '18%', right: '14%', label: '⚡', delay: 1.2 },
          { top: '50%', left: '5%', label: '#!', delay: 1.6 },
          { top: '60%', right: '6%', label: '◉', delay: 2 },
        ].map((f, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-2xl text-[#b347ff]/60 sm:text-3xl"
            style={{
              ...f,
              filter: 'drop-shadow(0 0 14px rgba(179,71,255,0.6))',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -14, 0],
              rotate: [0, 8, -8, 0],
            }}
            transition={{
              opacity: { delay: f.delay, duration: 0.6 },
              scale: { delay: f.delay, duration: 0.6 },
              y: { duration: 5 + i, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 8 + i, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            {f.label}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs text-mist"
        >
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full rounded-full bg-[#c6ff00]"
              style={{ animation: 'pulse-ring 1.4s ease-out infinite' }}
            />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c6ff00]" />
          </span>
          {t('hero.badge')}
        </motion.div>

        <h1 className="relative whitespace-nowrap font-display text-[clamp(2rem,9vw,8.5rem)] font-extrabold leading-[0.95] text-white">
          <span
            key={lang}
            className="glitch-text text-gradient"
            data-text={heading}
          >
            <Letters text={heading} />
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.7 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2 font-mono text-base sm:text-lg md:text-xl"
        >
          <span className="text-[#b347ff]">&gt;</span>
          <span className="text-mist">{t('hero.role_label')}</span>
          <span className="text-[#5af7ff]">=</span>
          <span className="text-[#c6ff00]">"</span>
          <span className="terminal-caret min-w-[1ch] text-white">{role}</span>
          <span className="text-[#c6ff00]">"</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 1.9, duration: 0.9 }}
          className="mt-8 max-w-xl text-balance text-base text-mist md:text-lg"
        >
          {t('hero.tagline_pre')}{' '}
          <span className="font-mono text-white">ESP32</span>,{' '}
          <span className="font-mono text-white">Arduino</span>,{' '}
          {t('hero.tagline_and')}{' '}
          <span className="font-mono text-white">Raspberry Pi</span>.{' '}
          {t('hero.tagline_post')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#projects" className="btn-magnetic shine">
            <span>{t('hero.cta_projects')}</span>
            <span aria-hidden>→</span>
          </a>
          <a href="#contact" className="btn-magnetic ghost">
            <span>{t('hero.cta_contact')}</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 0.7 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.div
            className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="h-2 w-1 rounded-full bg-gradient-to-b from-[#b347ff] to-[#5af7ff]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
