import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play } from 'lucide-react'
import { cn, imgUrl } from '@/lib/utils'
import { ALL_MEDIA, type GalleryMedia, type Category } from './gallery-data'

const EASE = [0.22, 1, 0.36, 1] as const

// ── Filtros ───────────────────────────────────────────────────────────────────

type FilterKey = 'all' | Category

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all',          label: 'Todos'        },
  { key: 'fotografia',   label: 'Fotografia'   },
  { key: 'projetos',     label: 'Projetos'     },
  { key: 'social-media', label: 'Social Media' },
  { key: 'video',        label: 'Vídeos'       },
]

// ── Scroll lock (compatível com iOS Safari) ───────────────────────────────────

function useLockBodyScroll() {
  useEffect(() => {
    const scrollY = window.scrollY
    const prev = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top:      document.body.style.top,
      width:    document.body.style.width,
    }
    document.body.style.overflow  = 'hidden'
    document.body.style.position  = 'fixed'
    document.body.style.top       = `-${scrollY}px`
    document.body.style.width     = '100%'
    return () => {
      document.body.style.overflow  = prev.overflow
      document.body.style.position  = prev.position
      document.body.style.top       = prev.top
      document.body.style.width     = prev.width
      window.scrollTo(0, scrollY)
    }
  }, [])
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
// Renderizado via portal no document.body para garantir z-index correto

function Lightbox({ item, onClose }: { item: GalleryMedia; onClose: () => void }) {
  return createPortal(
    <motion.div
      key="lightbox-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10"
      style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/85" />

      {/* Conteúdo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.86, y: 20 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        exit={{ opacity: 0,    scale: 0.86, y: 20 }}
        transition={{ duration: 0.32, ease: EASE }}
        className="relative z-10 flex items-center justify-center"
        onClick={e => e.stopPropagation()}
      >
        {item.type === 'video' ? (
          <video
            src={imgUrl(item.src)}
            controls
            playsInline
            autoPlay
            className="rounded-2xl block shadow-[0_32px_80px_rgba(0,0,0,0.65)]"
            style={{ maxHeight: '85vh', maxWidth: '90vw' }}
            onError={e => (e.currentTarget.style.display = 'none')}
          />
        ) : (
          <img
            src={imgUrl(item.src)}
            alt={item.label}
            className="rounded-2xl block object-contain shadow-[0_32px_80px_rgba(0,0,0,0.65)]"
            style={{ maxHeight: '85vh', maxWidth: '90vw' }}
            onError={e => (e.currentTarget.style.display = 'none')}
          />
        )}

        {/* Botão fechar — canto superior direito do conteúdo */}
        <button
          onClick={onClose}
          aria-label="Fechar"
          className={cn(
            'absolute -top-4 -right-4 md:-top-5 md:-right-5',
            'w-9 h-9 rounded-full',
            'bg-black/50 dark:bg-white/15',
            'backdrop-blur-sm border border-white/25',
            'flex items-center justify-center text-white',
            'hover:bg-black/70 dark:hover:bg-white/25',
            'transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
          )}
        >
          <X size={14} strokeWidth={2.25} />
        </button>

        {/* Legenda */}
        <div className="absolute -bottom-10 inset-x-0 text-center pointer-events-none">
          <span className="text-xs text-white/55 uppercase tracking-[0.1em] font-medium">
            {item.label}
          </span>
          {item.subtitle && (
            <p className="text-[11px] text-white/35 mt-0.5">{item.subtitle}</p>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  )
}

// ── GridCard ──────────────────────────────────────────────────────────────────

function GridCard({ item, index, onClick }: {
  item: GalleryMedia; index: number; onClick: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0,  scale: 1    }}
      transition={{ delay: Math.min(index * 0.03, 0.45), duration: 0.38, ease: EASE }}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`Ampliar: ${item.label}`}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() }
      }}
      className={cn(
        'relative overflow-hidden rounded-2xl cursor-pointer group',
        'border border-neutral-200 dark:border-neutral-800',
        'bg-neutral-100 dark:bg-neutral-900',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400',
        'aspect-[4/3]',
      )}
    >
      {item.type === 'video' ? (
        <video
          ref={videoRef}
          src={imgUrl(item.src)}
          muted playsInline preload="metadata"
          className="w-full h-full object-cover object-center pointer-events-none"
          onError={() => { if (videoRef.current) videoRef.current.style.display = 'none' }}
        />
      ) : (
        <img
          src={imgUrl(item.src)} alt={item.label}
          loading="lazy" draggable={false}
          className="w-full h-full object-cover object-center pointer-events-none transition-transform duration-500 group-hover:scale-[1.05]"
          onError={e => (e.currentTarget.style.display = 'none')}
        />
      )}

      {/* Overlay no hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

      {/* Legenda */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/65 to-transparent p-3 pt-12 pointer-events-none">
        <span className="text-[10px] font-medium text-white/90 uppercase tracking-[0.09em]">
          {item.label}
        </span>
        {item.subtitle && (
          <p className="text-[9px] text-white/55 mt-0.5 leading-tight truncate">
            {item.subtitle}
          </p>
        )}
      </div>

      {/* Badge vídeo */}
      {item.type === 'video' && (
        <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center pointer-events-none">
          <Play size={10} className="text-white fill-white ml-[1px]" />
        </div>
      )}

      {/* Ícone expandir (hover) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M2 12L12 2M12 2H6M12 2V8" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

// ── FullGallery ───────────────────────────────────────────────────────────────

export function FullGallery({ onClose }: { onClose: () => void }) {
  const [visible,  setVisible]  = useState(true)
  const [filter,   setFilter]   = useState<FilterKey>('all')
  const [lightbox, setLightbox] = useState<GalleryMedia | null>(null)

  useLockBodyScroll()

  // Escape: fecha Lightbox primeiro, depois a galeria
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (lightbox) { setLightbox(null); return }
      setVisible(false)
    }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [lightbox])

  const handleClose = useCallback(() => setVisible(false), [])

  const filtered = filter === 'all'
    ? ALL_MEDIA
    : ALL_MEDIA.filter(m => m.category === filter)

  return (
    <>
      {/* ── Modal principal ──────────────────────────────────────────────────── */}
      <AnimatePresence onExitComplete={onClose}>
        {visible && (
          <motion.div
            key="full-gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            className={cn(
              'fixed inset-0 z-50 flex flex-col',
              // Paleta b.inside: branco puro (light) · preto profundo (dark)
              'bg-white dark:bg-[#0c0b0e]',
              'backdrop-blur-md',
            )}
          >
            {/* ── Barra superior ── */}
            <div className={cn(
              'flex items-center justify-between gap-4 flex-shrink-0',
              'px-5 md:px-8 py-4 md:py-5',
              'border-b border-neutral-100 dark:border-neutral-800',
            )}>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.1em] font-medium text-neutral-400 dark:text-neutral-500">
                  b.inside · Portfólio
                </p>
                <h2 className="font-serif font-light text-neutral-900 dark:text-neutral-50 leading-tight mt-0.5 text-lg">
                  Nossas <em className="italic">Histórias</em>
                  <span className="ml-2 text-sm font-sans text-neutral-400 dark:text-neutral-500 font-normal not-italic tabular-nums">
                    ({filtered.length}/{ALL_MEDIA.length})
                  </span>
                </h2>
              </div>

              <button
                onClick={handleClose}
                aria-label="Fechar galeria"
                className={cn(
                  'flex-shrink-0 w-10 h-10 rounded-full',
                  'border border-neutral-200 dark:border-neutral-700',
                  'flex items-center justify-center',
                  'text-neutral-500 dark:text-neutral-400',
                  'hover:text-neutral-900 dark:hover:text-neutral-50',
                  'hover:bg-neutral-100 dark:hover:bg-neutral-800/80',
                  'transition-all duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400',
                )}
              >
                <X size={16} strokeWidth={2} />
              </button>
            </div>

            {/* ── Pills de filtro ── */}
            <div className={cn(
              'flex items-center gap-2 flex-shrink-0',
              'px-5 md:px-8 py-3.5',
              'border-b border-neutral-100/60 dark:border-neutral-800/50',
              'overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
            )}>
              {FILTERS.map(f => {
                const count  = f.key === 'all' ? ALL_MEDIA.length : ALL_MEDIA.filter(m => m.category === f.key).length
                const active = filter === f.key
                return (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={cn(
                      'relative flex-shrink-0 inline-flex items-center gap-1.5',
                      'px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap',
                      'border transition-all duration-150',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400',
                      active
                        ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-transparent'
                        : [
                            'bg-transparent border-neutral-200 dark:border-neutral-700',
                            'text-neutral-500 dark:text-neutral-400',
                            'hover:text-neutral-900 dark:hover:text-neutral-50',
                            'hover:border-neutral-300 dark:hover:border-neutral-600',
                          ].join(' '),
                    )}
                  >
                    {f.label}
                    <span className={cn(
                      'text-[10px] tabular-nums',
                      active ? 'opacity-55' : 'opacity-40',
                    )}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* ── Grid com scroll ── */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-5 md:px-8 py-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={filter}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10"
                >
                  {filtered.map((item, i) => (
                    <GridCard
                      key={item.id}
                      item={item}
                      index={i}
                      onClick={() => setLightbox(item)}
                    />
                  ))}

                  {filtered.length === 0 && (
                    <div className="col-span-full py-24 text-center">
                      <p className="text-sm text-neutral-400 dark:text-neutral-500">
                        Nenhum item nesta categoria.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Lightbox — portal no document.body, z-[60] ─────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            key={`lb-${lightbox.id}`}
            item={lightbox}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
