import { motion } from 'framer-motion'
import { useT } from '../lib/i18n'
import type { Lang } from '../lib/translations'

const OPTIONS: { id: Lang; label: string; flag: string }[] = [
  { id: 'en', label: 'EN', flag: '🇬🇧' },
  { id: 'id', label: 'ID', flag: '🇮🇩' },
]

export default function LangToggle() {
  const { lang, setLang } = useT()

  return (
    <div
      className="relative flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 font-mono text-[10px] uppercase tracking-widest"
      role="group"
      aria-label="Language switch"
    >
      {OPTIONS.map((opt) => {
        const active = lang === opt.id
        return (
          <button
            key={opt.id}
            type="button"
            aria-pressed={active}
            onClick={() => setLang(opt.id)}
            className={`relative z-10 flex items-center gap-1 rounded-full px-2.5 py-1 transition-colors ${
              active ? 'text-[#0a0612]' : 'text-mist hover:text-white'
            }`}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #b347ff, #5af7ff)',
                  boxShadow: '0 0 18px rgba(179,71,255,0.55)',
                }}
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              />
            )}
            <span aria-hidden>{opt.flag}</span>
            <span>{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}
