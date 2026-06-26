import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MessageCircle } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { profile } from '@/data/portfolioData'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Trabalhos', href: '#trabalhos' },
  { label: 'Serviços',  href: '#servicos'  },
  { label: 'Contato',   href: '#contato'   },
]

export function Header() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const whatsappUrl = profile.socials.find(s => s.platform === 'whatsapp')?.url ?? '#'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fecha menu mobile ao redimensionar para desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed top-0 inset-x-0 z-50',
        'transition-all duration-300',
        scrolled
          ? 'bg-background/85 backdrop-blur-xl border-b border-border shadow-[0_1px_12px_rgba(0,0,0,0.04)]'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="portfolio-container flex items-center justify-between h-16">

        {/* ── Logo: marca "b.inside" ── */}
        <a
          href="#"
          className={cn(
            'font-sans text-[1.1rem] font-medium leading-none',
            'tracking-[-0.02em] text-foreground',
            'hover:text-accent transition-colors duration-200',
            'focus-visible:outline-none focus-visible:underline'
          )}
        >
          b
          <span className="text-accent">.inside</span>
        </a>

        {/* ── Navegação desktop ── */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Navegação principal">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="relative group py-1 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
              {/* Underline animado */}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent group-hover:w-full transition-all duration-300 ease-out" />
            </a>
          ))}
        </nav>

        {/* ── Ações à direita ── */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          {/* CTA desktop */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'hidden md:inline-flex items-center gap-2',
              'text-xs font-medium px-4 py-2 rounded-full',
              'border border-border bg-transparent',
              'text-foreground',
              'hover:bg-accent hover:text-accent-foreground hover:border-accent',
              'transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            <MessageCircle size={13} strokeWidth={2} />
            Falar Agora
          </a>

          {/* Botão de menu mobile */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            aria-expanded={mobileOpen}
            aria-label="Abrir menu de navegação"
            className={cn(
              'md:hidden w-9 h-9 flex items-center justify-center rounded-full',
              'text-muted-foreground hover:text-foreground hover:bg-muted',
              'transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                transition={{ duration: 0.18 }}
                className="flex items-center justify-center"
              >
                {mobileOpen ? <X size={18} strokeWidth={1.75} /> : <Menu size={18} strokeWidth={1.75} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── Menu mobile ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden border-t border-border bg-background/95 backdrop-blur-xl"
          >
            <nav className="portfolio-container py-5 flex flex-col gap-1" aria-label="Menu mobile">
              {NAV_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'py-2.5 px-3 -mx-3 rounded-lg',
                    'text-sm text-muted-foreground hover:text-foreground',
                    'hover:bg-muted transition-colors duration-150'
                  )}
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-3 mt-2 border-t border-border">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'inline-flex items-center gap-2',
                    'text-xs font-medium px-5 py-2.5 rounded-full',
                    'bg-accent text-accent-foreground',
                    'hover:opacity-90 transition-opacity duration-200'
                  )}
                >
                  <MessageCircle size={13} strokeWidth={2} />
                  Falar Agora
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
