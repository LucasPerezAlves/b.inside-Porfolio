import { useState, useEffect, type ReactNode } from 'react'
import { ThemeContext, type Theme } from '@/hooks/useTheme'

const STORAGE_KEY = 'kaii-theme'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme
      if (stored === 'light' || stored === 'dark') return stored
      // Site inicia sempre no modo Light — dark só por escolha explícita do usuário
    } catch {}
    return 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {}
  }, [theme])

  const toggle = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}
