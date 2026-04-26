import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { translations } from './translations'
import type { Lang, TKey } from './translations'

type Ctx = {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
  t: (key: TKey) => string
}

const LangCtx = createContext<Ctx | null>(null)

const STORAGE_KEY = 'dki.lang'

function detectInitial(): Lang {
  if (typeof window === 'undefined') return 'en'
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'id') return saved
  } catch {
    // ignore
  }
  const nav = window.navigator?.language?.toLowerCase() ?? ''
  return nav.startsWith('id') ? 'id' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitial)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // ignore
    }
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (l: Lang) => setLangState(l)
  const toggle = () => setLangState((p) => (p === 'en' ? 'id' : 'en'))

  const t = (key: TKey): string => {
    const entry = translations[key]
    return entry ? entry[lang] : key
  }

  return (
    <LangCtx.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LangCtx.Provider>
  )
}

export function useT() {
  const ctx = useContext(LangCtx)
  if (!ctx) throw new Error('useT must be used inside <LangProvider>')
  return ctx
}
