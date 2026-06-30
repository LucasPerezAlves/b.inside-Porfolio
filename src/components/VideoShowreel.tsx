import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X } from 'lucide-react'
import { cn } from '@/lib/utils'

// TODO: substituir pela URL real do showreel da Kailany
// Formato YouTube:  'https://www.youtube.com/embed/VIDEO_ID?autoplay=1&rel=0'
// Formato Vimeo:    'https://player.vimeo.com/video/VIDEO_ID?autoplay=1'
// Deixe vazio ('') para ocultar o botão completamente até a URL ser configurada
const SHOWREEL_URL = ''

const EASE = [0.22, 1, 0.36, 1] as const

// ── Modal ─────────────────────────────────────────────────────────────────────

function ShowreelModal({ onClose }: { onClose: () => void }) {
  // Fecha com ESC
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [onClose])

  // Scroll lock
  useEffect(() => {
    const scrollY = window.scrollY
    const prev = { overflow: document.body.style.overflow, position: document.body.style.position, top: document.body.style.top, width: document.body.style.width }
    document.body.style.overflow  = 'hidden'
    document.body.style.position  = 'fixed'
    document.body.style.top       = `-${scrollY}px`
    document.body.style.width     = '100%'
    return () => {
      Object.assign(document.body.style, prev)
      window.scrollTo(0, scrollY)
    }
  }, [])

  return createPortal(
    <motion.div
      key="showreel-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Showreel"
    >
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/92" />

      {/* Blur backdrop */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />

      {/* Conteúdo — expande do centro */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.93, transition: { duration: 0.18, ease: 'easeIn' } }}
        transition={{ duration: 0.38, ease: EASE }}
        className="relative z-10 w-full max-w-4xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Botão fechar */}
        <button
          onClick={onClose}
          aria-label="Fechar showreel"
          className={cn(
            'absolute -top-12 right-0',
            'inline-flex items-center gap-1.5',
            'text-xs font-medium text-white/60 hover:text-white',
            'transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
          )}
        >
          <X size={14} strokeWidth={2} />
          Fechar
        </button>

        {/* Wrapper responsivo 16:9 */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.8)]" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={SHOWREEL_URL}
            title="Showreel b.inside"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  )
}

// ── Trigger + Modal — componente público ──────────────────────────────────────
// Se SHOWREEL_URL estiver vazio, o componente não renderiza nada

export function VideoShowreel({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)

  // Não renderiza se URL não estiver configurada
  if (!SHOWREEL_URL) return null

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'inline-flex items-center gap-2',
          'text-sm font-medium text-muted-foreground',
          'hover:text-foreground transition-colors duration-200',
          'focus-visible:outline-none focus-visible:underline',
          'group',
          className,
        )}
        aria-label="Abrir showreel em vídeo"
      >
        {/* Ícone play com anel */}
        <span className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full',
          'border border-border group-hover:border-accent/50',
          'flex items-center justify-center',
          'transition-colors duration-200',
        )}>
          <Play size={11} strokeWidth={2} className="ml-[1px] text-accent" />
        </span>
        Ver showreel
      </button>

      <AnimatePresence>
        {open && <ShowreelModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
