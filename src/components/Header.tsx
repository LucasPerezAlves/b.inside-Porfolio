import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MessageCircle } from 'lucide-react'
import { profile } from '@/data/portfolioData'
import { cn, imgUrl } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Sobre',    href: '#sobre'    },
  { label: 'Projetos', href: '#galeria'  },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Contato',  href: '#contato'  },
]

// IDs das seções observadas para o indicador ativo
const SECTION_IDS = NAV_LINKS.map(l => l.href.slice(1))

// Altura do header + folga — mantida em sincronia com scroll-padding-top no CSS
const HEADER_OFFSET = 80

// ── Scroll suave com offset de header fixo ────────────────────────────────────
// Usa window.scrollTo para garantir comportamento consistente entre browsers,
// sem depender exclusivamente de scroll-behavior: smooth do CSS.
function scrollToId(id: string) {
  if (!id) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
  window.scrollTo({ top, behavior: 'smooth' })
}

export function Header() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [activeId,    setActiveId]    = useState<string | null>(null)

  const whatsappUrl = profile.socials.find(s => s.platform === 'whatsapp')?.url ?? '#'

  // ── Fundo do header ao fazer scroll ──────────────────────────────────────
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // ── Fecha menu mobile ao redimensionar ───────────────────────────────────
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  // ── IntersectionObserver — detecta seção ativa enquanto o usuário rola ──
  // rootMargin '-80px 0px -45% 0px': ignora a faixa do header e conta apenas
  // seções que ocupam a metade superior do viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        // Dentre as seções visíveis, prioriza a mais próxima ao topo
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { threshold: 0.15, rootMargin: `-${HEADER_OFFSET}px 0px -45% 0px` },
    )

    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // ── Click handler para desktop ───────────────────────────────────────────
  const handleDesktopClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      scrollToId(href.slice(1))
    },
    [],
  )

  // ── Click handler para mobile — fecha menu antes de rolar ────────────────
  // O delay de 300ms aguarda a animação de fechamento do menu (250ms)
  // para que a altura do layout já esteja estabilizada ao calcular a posição.
  const handleMobileClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      setMobileOpen(false)
      setTimeout(() => scrollToId(href.slice(1)), 300)
    },
    [],
  )

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
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <div className="portfolio-container flex items-center justify-between h-16">

        {/* ── Logo ── */}
        <a
          href="#"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className={cn(
            'inline-flex items-center gap-2',
            'font-sans text-[1.1rem] font-medium leading-none',
            'tracking-[-0.02em] text-foreground',
            'hover:opacity-80 transition-opacity duration-200',
            'focus-visible:outline-none focus-visible:underline',
          )}
        >
          <img
            src={imgUrl('/images/imagensReais/Logo.PNG')}
            alt="b.inside"
            className="h-7 w-auto object-contain"
            draggable={false}
          />
          b<span className="text-accent">.inside</span>
        </a>

        {/* ── Navegação desktop ── */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Navegação principal">
          {NAV_LINKS.map(link => {
            const id       = link.href.slice(1)
            const isActive = activeId === id

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={e => handleDesktopClick(e, link.href)}
                className={cn(
                  'relative py-1 text-sm transition-colors duration-200',
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {link.label}

                {/* Indicador ativo — desliza entre links via layoutId */}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}

                {/* Linha de hover sutil (apenas quando não ativo) */}
                {!isActive && (
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent/40 group-hover:w-full transition-all duration-300 ease-out" />
                )}
              </a>
            )
          })}
        </nav>

        {/* ── Ações à direita ── */}
        <div className="flex items-center gap-2.5">

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
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            )}
          >
            <MessageCircle size={13} strokeWidth={2} />
            Falar Agora
          </a>

          {/* Botão menu mobile */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            aria-expanded={mobileOpen}
            aria-label="Abrir menu de navegação"
            className={cn(
              'md:hidden w-9 h-9 flex items-center justify-center rounded-full',
              'text-muted-foreground hover:text-foreground hover:bg-muted',
              'transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0,   scale: 1   }}
                exit={{    opacity: 0, rotate:  45, scale: 0.7 }}
                transition={{ duration: 0.18 }}
                className="flex items-center justify-center"
              >
                {mobileOpen
                  ? <X    size={18} strokeWidth={1.75} />
                  : <Menu size={18} strokeWidth={1.75} />
                }
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
            exit={{    height: 0,    opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden border-t border-border bg-background/95 backdrop-blur-xl"
          >
            <nav className="portfolio-container py-5 flex flex-col gap-1" aria-label="Menu mobile">
              {NAV_LINKS.map(link => {
                const id       = link.href.slice(1)
                const isActive = activeId === id

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={e => handleMobileClick(e, link.href)}
                    className={cn(
                      'py-2.5 px-3 -mx-3 rounded-lg',
                      'text-sm transition-colors duration-150',
                      isActive
                        ? 'text-foreground bg-muted/60'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                    )}
                  >
                    {link.label}
                  </a>
                )
              })}

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
                    'hover:opacity-90 transition-opacity duration-200',
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
