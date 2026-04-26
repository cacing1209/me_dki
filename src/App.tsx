import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import aboutTxt from '../aboutme.txt?raw'
import { parseAbout } from './lib/parseAbout'
import { useT } from './lib/i18n'
import Background from './components/Background'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'

function Footer({ email }: { email?: string }) {
  const { t } = useT()
  return (
    <footer className="relative border-t border-white/5 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 font-mono text-xs text-mist-2 md:flex-row">
        <span>
          <span className="text-[#b347ff]">$</span> echo "{t('footer.made')}{' '}
          <span className="text-[#ff3df0]">♥</span> {t('footer.solder')}"
        </span>
        <span className="flex items-center gap-2">
          <motion.span
            className="inline-block h-1.5 w-1.5 rounded-full bg-[#c6ff00]"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            style={{ boxShadow: '0 0 8px #c6ff00' }}
          />
          {email ?? 'dikilmj@gmail.com'}
        </span>
      </div>
    </footer>
  )
}

export default function App() {
  const data = useMemo(() => parseAbout(aboutTxt), [])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1700)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <Loader visible={loading} />
      <Background />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main className="relative">
        <Hero name="diki" />
        <About />
        <Skills />
        <Experience items={data.experience} />
        <Projects items={data.projects} />
        <Contact email={data.contact.email} phone={data.contact.phone} />
      </main>

      <Footer email={data.contact.email} />
    </>
  )
}
