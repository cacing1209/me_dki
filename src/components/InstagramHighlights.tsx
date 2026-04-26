import { motion } from 'framer-motion'
import { useT } from '../lib/i18n'
import { IG_ACCOUNT, IG_HIGHLIGHTS } from '../lib/socials'

const InstagramGlyph = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
)

type Card = {
  href: string
  accent: string
  title: string
  desc: string
  glyph: string
}

export default function InstagramHighlights() {
  const { t } = useT()

  const cards: Card[] = [
    {
      href: IG_HIGHLIGHTS.coding,
      accent: '#b347ff',
      title: t('hl.coding_title'),
      desc: t('hl.coding_desc'),
      glyph: '⌬',
    },
    {
      href: IG_HIGHLIGHTS.medical,
      accent: '#5af7ff',
      title: t('hl.medical_title'),
      desc: t('hl.medical_desc'),
      glyph: '✚',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12"
    >
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-[#ff3df0]">
            {t('hl.eyebrow')}
          </p>
          <h3 className="mt-2 max-w-2xl font-display text-2xl font-bold text-white md:text-3xl">
            {t('hl.title')}
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-mist md:text-base">
            {t('hl.subtitle')}
          </p>
        </div>

        <a
          href={IG_ACCOUNT}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs text-mist transition-all hover:border-[#ff3df0]/60 hover:bg-[#ff3df0]/10 hover:text-white"
        >
          <InstagramGlyph />
          <span>{t('hl.follow')}</span>
        </a>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((c, i) => (
          <motion.a
            key={c.href}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.6,
              delay: 0.1 + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -4 }}
            className="group glass glass-hover relative flex items-center gap-5 overflow-hidden rounded-2xl p-5 md:p-6"
            style={{
              background: `linear-gradient(135deg, ${c.accent}10, transparent 60%), rgba(255,255,255,0.02)`,
            }}
          >
            {/* animated story ring */}
            <div className="relative shrink-0">
              <motion.span
                aria-hidden
                className="absolute -inset-1 rounded-full"
                style={{
                  background: `conic-gradient(from 0deg, ${c.accent}, #ff3df0, #c6ff00, ${c.accent})`,
                  filter: 'blur(2px)',
                  opacity: 0.85,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />
              <div
                className="relative grid h-14 w-14 place-items-center rounded-full bg-[#0a0612] font-display text-2xl"
                style={{
                  color: c.accent,
                  textShadow: `0 0 18px ${c.accent}`,
                  boxShadow: `inset 0 0 0 2px ${c.accent}40`,
                }}
              >
                {c.glyph}
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-mist-2">
                <InstagramGlyph />
                <span>highlight</span>
              </div>
              <div className="mt-1 truncate font-display text-lg font-bold text-white md:text-xl">
                {c.title}
              </div>
              <div className="mt-1 line-clamp-2 text-xs text-mist md:text-sm">
                {c.desc}
              </div>
            </div>

            <span
              className="hidden shrink-0 font-mono text-xs transition-transform sm:block group-hover:translate-x-1"
              style={{ color: c.accent }}
            >
              {t('hl.open')}
            </span>

            {/* hover sweep */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full opacity-0 transition-all duration-700 group-hover:translate-x-0 group-hover:opacity-100"
              style={{
                background: `linear-gradient(115deg, transparent 30%, ${c.accent}25 50%, transparent 70%)`,
              }}
            />
          </motion.a>
        ))}
      </div>
    </motion.div>
  )
}
