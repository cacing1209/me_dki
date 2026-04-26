import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import SectionHeading from './SectionHeading'
import TiltCard from './TiltCard'
import type { ExperienceItem } from '../lib/parseAbout'
import { useT } from '../lib/i18n'
import { localizeExperience } from '../lib/aboutLocales'
import { EXPERIENCE_LINKS } from '../lib/socials'

export default function Experience({ items }: { items: ExperienceItem[] }) {
  const { t, lang } = useT()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 0.85], ['0%', '100%'])

  return (
    <section id="experience" className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          index={t('exp.idx')}
          title={t('exp.title')}
          subtitle={t('exp.subtitle')}
        />

        <div ref={containerRef} className="relative pl-8 md:pl-16">
          {/* Timeline track */}
          <div className="absolute top-0 bottom-0 left-2 w-px bg-white/10 md:left-6" />
          <motion.div
            className="absolute top-0 left-2 w-px md:left-6"
            style={{
              height: lineHeight,
              background: 'linear-gradient(180deg, #b347ff, #5af7ff, #ff3df0)',
              boxShadow: '0 0 14px rgba(179,71,255,0.8)',
            }}
          />

          <div className="space-y-10">
            {items.map((item, i) => {
              const local = localizeExperience(item, lang)
              const docsLink = EXPERIENCE_LINKS[item.title]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative"
                >
                  {/* node */}
                  <div className="absolute -left-[26px] top-3 md:-left-[42px]">
                    <div className="relative flex h-5 w-5 items-center justify-center">
                      <span
                        className="absolute inline-flex h-full w-full rounded-full bg-[#b347ff]"
                        style={{ animation: 'pulse-ring 2s ease-out infinite' }}
                      />
                      <span
                        className="relative h-3 w-3 rounded-full"
                        style={{
                          background:
                            'radial-gradient(circle, #fff, #b347ff 60%)',
                          boxShadow: '0 0 14px rgba(179,71,255,0.9)',
                        }}
                      />
                    </div>
                  </div>

                  <TiltCard className="glass glass-hover group rounded-xl p-6 md:p-7">
                    <div className="mb-2 flex items-center gap-3">
                      {item.year && (
                        <span
                          className="font-mono text-xs text-[#5af7ff]"
                          style={{ textShadow: '0 0 12px rgba(90,247,255,0.6)' }}
                        >
                          @{item.year}
                        </span>
                      )}
                      <span className="font-mono text-[10px] uppercase tracking-widest text-mist-2">
                        {t('exp.role')}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-white md:text-2xl">
                      {local.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-mist md:text-base">
                      {local.description}
                    </p>

                    {item.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-mist transition-all group-hover:border-[#b347ff]/40 group-hover:text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {docsLink && (
                      <a
                        href={docsLink}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] text-[#5af7ff] transition-all hover:text-white"
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
                        <span>{t('exp.docs')} →</span>
                      </a>
                    )}
                  </TiltCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
