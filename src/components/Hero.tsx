import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useT } from '../lib/i18n'
import type { Lang } from '../lib/translations'

const ROLES: Record<Lang, string[]> = {
  en: [
    'IoT Engineer',
    'Hardware Tinkerer',
    'CTF Player',
    'Maker',
    'MQTT Wizard',
  ],
  id: [
    'Insinyur IoT',
    'Penjelajah Hardware',
    'Pemain CTF',
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

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pt-28 pb-20"
    >
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

        <h1 className="relative font-display text-6xl font-extrabold leading-[0.95] text-white sm:text-7xl md:text-[8.5rem]">
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
