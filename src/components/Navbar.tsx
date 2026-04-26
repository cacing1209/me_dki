import { motion } from 'framer-motion'
import { useT } from '../lib/i18n'
import type { TKey } from '../lib/translations'
import LangToggle from './LangToggle'

const linkDefs: { id: string; key: TKey }[] = [
  { id: 'home', key: 'nav.home' },
  { id: 'about', key: 'nav.about' },
  { id: 'skills', key: 'nav.skills' },
  { id: 'experience', key: 'nav.experience' },
  { id: 'projects', key: 'nav.projects' },
  { id: 'contact', key: 'nav.contact' },
]

export default function Navbar() {
  const { t } = useT()

  const links = linkDefs.map((l) => ({ id: l.id, label: t(l.key) }))

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="glass flex items-center gap-1 rounded-full px-2 py-1.5 sm:gap-2 sm:px-3">
        <a
          href="#home"
          className="flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-sm font-bold text-white"
        >
          <span
            className="inline-block h-2 w-2 rounded-full bg-[#c6ff00]"
            style={{ boxShadow: '0 0 10px #c6ff00' }}
          />
          dki<span className="text-[#b347ff]">_</span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="group relative rounded-full px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-mist transition-colors hover:text-white"
            >
              <span className="opacity-50 group-hover:opacity-100 transition-opacity">/</span>
              {l.label}
              <span
                className="absolute inset-x-3 -bottom-px h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-[#b347ff] to-transparent transition-transform duration-300 group-hover:scale-x-100"
              />
            </a>
          ))}
        </div>
        <LangToggle />
        <a href="#contact" className="btn-magnetic ghost ml-1 px-4 py-1.5 text-xs">
          <span>{t('nav.cta')}</span>
        </a>
      </div>
    </motion.nav>
  )
}
