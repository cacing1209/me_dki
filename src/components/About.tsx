import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import TiltCard from './TiltCard'
import { useT } from '../lib/i18n'

export default function About() {
  const { t } = useT()

  const facts = [
    {
      label: t('about.fact_discipline'),
      value: t('about.fact_discipline_v'),
      icon: '⌬',
    },
    {
      label: t('about.fact_years'),
      value: t('about.fact_years_v'),
      icon: '⏱',
    },
    {
      label: t('about.fact_learning'),
      value: t('about.fact_learning_v'),
      icon: '📡',
    },
    {
      label: t('about.fact_lang'),
      value: t('about.fact_lang_v'),
      icon: '⚡',
    },
  ]

  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index={t('about.idx')}
          title={t('about.title')}
          subtitle={t('about.subtitle')}
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <TiltCard className="glass glass-hover scanlines relative h-full overflow-hidden rounded-2xl p-8 md:p-10">
              <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-[#b347ff]/30 blur-3xl" />
              <div className="relative">
                <div className="mb-6 flex items-center gap-2 font-mono text-xs text-mist-2">
                  <span className="h-2 w-2 rounded-full bg-[#ff5d5d]" />
                  <span className="h-2 w-2 rounded-full bg-[#ffb84d]" />
                  <span className="h-2 w-2 rounded-full bg-[#5dff8e]" />
                  <span className="ml-3">{t('about.filename')}</span>
                </div>

                <p className="text-lg leading-relaxed text-mist md:text-xl">
                  {t('about.body1_pre')}{' '}
                  <span className="font-semibold text-white">
                    {t('about.body1_role')}
                  </span>{' '}
                  {t('about.body1_post')}{' '}
                  <span className="font-mono text-[#5af7ff]">ESP32</span>,{' '}
                  <span className="font-mono text-[#5af7ff]">ESP8266</span>,{' '}
                  <span className="font-mono text-[#5af7ff]">Arduino Mega</span>
                  {t('about.body1_tail')}
                </p>
                <p className="mt-5 text-base leading-relaxed text-mist-2 md:text-lg">
                  {t('about.body2_pre')}{' '}
                  <em className="text-white">{t('about.body2_emph')}</em>{' '}
                  {t('about.body2_post')}
                </p>

                <div className="mt-8 grid gap-2 font-mono text-sm">
                  <div className="code-line">
                    <span className="kw">const</span>{' '}
                    <span className="fn">stack</span> ={' '}
                    <span className="str">
                      ['c++', 'python', 'arduino', 'esp32', 'mqtt']
                    </span>
                    ;
                  </div>
                  <div className="code-line">
                    <span className="kw">while</span> (alive){' '}
                    <span className="num">{'{'}</span> build(); break(); fix();
                    ship(); <span className="num">{'}'}</span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          <div className="grid gap-4 lg:col-span-5">
            {facts.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <TiltCard className="glass glass-hover group flex items-center gap-4 rounded-xl p-5">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-xl"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(179,71,255,0.3), rgba(90,247,255,0.2))',
                      boxShadow: '0 0 20px rgba(179,71,255,0.25)',
                    }}
                  >
                    {f.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-mist-2">
                      {f.label}
                    </div>
                    <div className="truncate text-base font-semibold text-white">
                      {f.value}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
