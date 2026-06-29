import { useEffect, type ReactNode } from 'react'
import { ThemeContext } from '@/hooks/useTheme'

// Site exclusivamente Dark Mode — sem alternância de tema.
// A classe `dark` é forçada no <html> via index.html; este provider
// garante a consistência do contexto para qualquer consumidor residual.
export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <ThemeContext.Provider value={{ theme: 'dark', toggle: () => {} }}>
      {children}
    </ThemeContext.Provider>
  )
}
