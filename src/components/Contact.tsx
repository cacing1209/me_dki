import { motion } from 'framer-motion'
import { useState } from 'react'
import SectionHeading from './SectionHeading'
import TiltCard from './TiltCard'
import { useT } from '../lib/i18n'
import { IG_ACCOUNT } from '../lib/socials'

type Props = {
  email?: string
  phone?: string
}

type FieldProps = {
  id: string
  label: string
  type?: string
  textarea?: boolean
  value: string
  onChange: (v: string) => void
}

function FloatingField({ id, label, type = 'text', textarea, value, onChange }: FieldProps) {
  const [focus, setFocus] = useState(false)
  const active = focus || value.length > 0

  const common = {
    id,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    className:
      'peer w-full bg-transparent px-4 pt-6 pb-2 font-mono text-sm text-white outline-none placeholder:text-transparent',
    placeholder: label,
  }

  return (
    <div className="relative">
      <div
        className={`relative overflow-hidden rounded-xl border transition-all duration-300 ${
          focus
            ? 'border-[#b347ff]/70 bg-white/[0.04] shadow-[0_0_0_4px_rgba(179,71,255,0.12),0_0_24px_rgba(179,71,255,0.25)]'
            : 'border-white/10 bg-white/[0.02]'
        }`}
      >
        {textarea ? (
          <textarea {...common} rows={5} className={`${common.className} resize-none`} />
        ) : (
          <input {...common} type={type} />
        )}
        <motion.label
          htmlFor={id}
          animate={{
            top: active ? 6 : 16,
            fontSize: active ? 10 : 13,
            color: focus ? '#5af7ff' : active ? '#b347ff' : '#8a82a8',
          }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none absolute left-4 font-mono uppercase tracking-widest"
        >
          {active ? `// ${label}` : label}
        </motion.label>
        <motion.span
          aria-hidden
          className="absolute bottom-0 left-0 h-px"
          initial={{ width: 0 }}
          animate={{ width: focus ? '100%' : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: 'linear-gradient(90deg, #b347ff, #5af7ff, #ff3df0)',
            boxShadow: '0 0 8px rgba(90,247,255,0.6)',
          }}
        />
      </div>
    </div>
  )
}

const socials = [
  { label: 'instagram', glyph: '📸', href: IG_ACCOUNT },
  { label: 'whatsapp', glyph: '💬', href: 'https://wa.me/6285600254072' },
  { label: 'email', glyph: '✉', href: 'mailto:dikilmj@gmail.com' },
  { label: 'github', glyph: '⌥', href: 'https://github.com' },
]

export default function Contact({ email, phone }: Props) {
  const { t } = useT()
  const [name, setName] = useState('')
  const [from, setFrom] = useState('')
  const [msg, setMsg] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(
      `${t('contact.subject_prefix')} ${name || t('contact.new_msg')}`,
    )
    const body = encodeURIComponent(
      `${t('contact.from')} ${from || t('contact.no_email')}\n\n${msg || t('contact.empty')}`,
    )
    window.location.href = `mailto:${email ?? 'dikilmj@gmail.com'}?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 2400)
  }

  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index={t('contact.idx')}
          title={t('contact.title')}
          subtitle={t('contact.subtitle')}
        />

        <div className="grid gap-8 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <TiltCard className="glass glass-hover scanlines relative overflow-hidden rounded-2xl p-8">
              <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[#5af7ff]/25 blur-3xl" />

              <div className="relative">
                <p className="font-mono text-xs uppercase tracking-widest text-[#5af7ff]">
                  {t('contact.hint')}
                </p>
                <h3 className="mt-2 font-display text-3xl font-bold text-white">
                  {t('contact.heading')}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-mist">
                  {t('contact.body')}
                </p>

                <div className="mt-8 space-y-3 font-mono text-sm">
                  {phone && (
                    <a
                      href={`tel:${phone}`}
                      className="group flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 transition-all hover:border-[#b347ff]/50 hover:bg-white/[0.05]"
                    >
                      <span className="grid h-9 w-9 place-items-center rounded-md bg-[#b347ff]/15 text-base text-[#b347ff]">
                        ☏
                      </span>
                      <div className="min-w-0">
                        <div className="text-[10px] uppercase tracking-widest text-mist-2">
                          {t('contact.phone_label')}
                        </div>
                        <div className="truncate text-white group-hover:text-[#5af7ff]">
                          {phone}
                        </div>
                      </div>
                    </a>
                  )}
                  {email && (
                    <a
                      href={`mailto:${email}`}
                      className="group flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 transition-all hover:border-[#5af7ff]/50 hover:bg-white/[0.05]"
                    >
                      <span className="grid h-9 w-9 place-items-center rounded-md bg-[#5af7ff]/15 text-base text-[#5af7ff]">
                        ✉
                      </span>
                      <div className="min-w-0">
                        <div className="text-[10px] uppercase tracking-widest text-mist-2">
                          {t('contact.email_label')}
                        </div>
                        <div className="truncate text-white group-hover:text-[#b347ff]">
                          {email}
                        </div>
                      </div>
                    </a>
                  )}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {socials.map((s, i) => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -4, rotate: [0, -6, 6, 0] }}
                      transition={{
                        delay: 0.2 + i * 0.07,
                        type: 'spring',
                        stiffness: 280,
                        damping: 18,
                      }}
                      className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-sm text-white transition-all hover:border-[#b347ff]/60 hover:bg-[#b347ff]/10 hover:shadow-[0_0_18px_rgba(179,71,255,0.45)]"
                      aria-label={s.label}
                    >
                      {s.glyph}
                    </motion.a>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="neon-border lg:col-span-7"
          >
            <div className="relative z-[2] space-y-5 p-8">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-mist-2">{t('contact.filename')}</span>
                <span className="flex items-center gap-2 text-[#c6ff00]">
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full bg-[#c6ff00]"
                    style={{ boxShadow: '0 0 10px #c6ff00' }}
                  />
                  {t('contact.online')}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FloatingField
                  id="name"
                  label={t('contact.field_name')}
                  value={name}
                  onChange={setName}
                />
                <FloatingField
                  id="from"
                  label={t('contact.field_email')}
                  type="email"
                  value={from}
                  onChange={setFrom}
                />
              </div>

              <FloatingField
                id="msg"
                label={t('contact.field_message')}
                textarea
                value={msg}
                onChange={setMsg}
              />

              <div className="flex items-center justify-between gap-4 pt-2">
                <p className="font-mono text-[11px] text-mist-2">
                  {t('contact.privacy')}
                </p>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="btn-magnetic shine"
                >
                  <span>{sent ? t('contact.sent') : t('contact.transmit')}</span>
                  <span aria-hidden>{sent ? '⚡' : '→'}</span>
                </motion.button>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
