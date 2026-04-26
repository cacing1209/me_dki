import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import TiltCard from './TiltCard'
import InstagramHighlights from './InstagramHighlights'
import type { ProjectItem } from '../lib/parseAbout'
import { useT } from '../lib/i18n'
import { localizeProject } from '../lib/aboutLocales'
import { PROJECT_DEFAULT_LINK } from '../lib/socials'

const accentFor = (i: number) =>
  ['#b347ff', '#5af7ff', '#ff3df0', '#c6ff00'][i % 4]

export default function Projects({ items }: { items: ProjectItem[] }) {
  const { t, lang } = useT()
  return (
    <section id="projects" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index={t('proj.idx')}
          title={t('proj.title')}
          subtitle={t('proj.subtitle')}
        />

        <InstagramHighlights />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid gap-6 md:grid-cols-2"
        >
          {items.map((p, i) => {
            const accent = accentFor(i)
            const local = localizeProject(p, lang)
            return (
              <motion.article
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.95 },
                  show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <TiltCard className="group relative h-full overflow-hidden rounded-2xl">
                  <div
                    className="absolute inset-0 -z-10"
                    style={{
                      background: `linear-gradient(135deg, ${accent}25, transparent 60%)`,
                    }}
                  />
                  <div className="glass glass-hover scanlines relative h-full overflow-hidden rounded-2xl p-7 md:p-8">
                    <div className="mb-6 flex items-center justify-between">
                      <div className="font-mono text-[11px] uppercase tracking-widest text-mist-2">
                        {t('proj.label')}_{String(i + 1).padStart(2, '0')}
                      </div>
                      <motion.div
                        className="font-display text-3xl font-black"
                        style={{
                          color: accent,
                          textShadow: `0 0 20px ${accent}`,
                        }}
                        animate={{
                          rotate: [0, 4, -4, 0],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: i * 0.4,
                        }}
                      >
                        {['⌬', '◉', '⚡', '✦'][i % 4]}
                      </motion.div>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
                      {local.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-mist md:text-[15px]">
                      {local.description}
                    </p>

                    {p.tags.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {p.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border px-2 py-0.5 font-mono text-[10px] transition-all"
                            style={{
                              borderColor: `${accent}40`,
                              color: accent,
                              background: `${accent}10`,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/5 pt-5 font-mono text-xs">
                      <span className="flex items-center gap-2 text-mist-2">
                        <span
                          className="inline-block h-1.5 w-1.5 rounded-full"
                          style={{
                            background: accent,
                            boxShadow: `0 0 8px ${accent}`,
                          }}
                        />
                        <span style={{ color: accent }}>
                          {t('proj.deployed')}
                        </span>
                      </span>
                      <a
                        href={PROJECT_DEFAULT_LINK}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 transition-all hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                        style={{ color: accent }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="12"
                          height="12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <rect x="3" y="3" width="18" height="18" rx="5" />
                          <circle cx="12" cy="12" r="4" />
                          <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
                        </svg>
                        <span>{t('proj.see_on_ig')}</span>
                      </a>
                    </div>

                    <div
                      className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), ${accent}25, transparent 40%)`,
                      }}
                    />
                  </div>
                </TiltCard>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
