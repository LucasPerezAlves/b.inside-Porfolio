import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight, ChevronRight, Play } from 'lucide-react'
import { projects, type Project, type MediaItem } from '@/data/portfolioData'
import { cn, imgUrl } from '@/lib/utils'

// ── Constantes ────────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const

const COL_SPAN_CLASSES = [
  'md:col-span-3',  // row 1 — largo
  'md:col-span-2',  // row 1 — estreito
  'md:col-span-2',  // row 2 — estreito
  'md:col-span-3',  // row 2 — largo
  'md:col-span-3',  // row 3 — largo
  'md:col-span-2',  // row 3 — estreito
] as const

const CATEGORY_GRADIENT: Record<string, string> = {
  'Branding & Social Media': 'var(--card-gradient-branding)',
  'Tráfego Pago':            'var(--card-gradient-traffic)',
  'Estratégia de Conteúdo':  'var(--card-gradient-content)',
  'Lançamentos Digitais':    'var(--card-gradient-launch)',
}

const CATEGORY_SYMBOL: Record<string, string> = {
  'Branding & Social Media': '✦',
  'Tráfego Pago':            '◈',
  'Estratégia de Conteúdo':  '◇',
  'Lançamentos Digitais':    '◉',
}

// Proporções para itens da galeria
const ASPECT_CLASS: Record<string, string> = {
  portrait:  'aspect-[4/5]',
  landscape: 'aspect-video',
  square:    'aspect-square',
}

// ── MediaCard — item individual da galeria expandida ─────────────────────────

interface MediaCardProps {
  item:  MediaItem
  index: number
}

function MediaCard({ item, index }: MediaCardProps) {
  const [imgError, setImgError] = useState(false)
  const aspectClass = ASPECT_CLASS[item.aspect ?? 'landscape']

  if (item.type === 'video') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 + index * 0.07, duration: 0.4, ease: EASE }}
        // Vídeos sempre ocupam as 2 colunas — melhor usabilidade para controls
        className="sm:col-span-2 overflow-hidden rounded-2xl border border-border bg-black dark:bg-black"
      >
        <video
          src={imgUrl(item.url)}
          poster={item.poster ? imgUrl(item.poster) : undefined}
          controls
          preload="metadata"
          playsInline
          className={cn(
            'w-full object-contain',
            // Reels/vertical: limita altura; landscape: aspect-video natural
            item.aspect === 'portrait' ? 'max-h-[480px]' : aspectClass
          )}
        />
        {item.caption && (
          <p className="text-xs text-muted-foreground px-4 py-2.5 leading-relaxed border-t border-border/50">
            {item.caption}
          </p>
        )}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12 + index * 0.07, duration: 0.4, ease: EASE }}
      className="overflow-hidden rounded-xl border border-border bg-muted"
    >
      <div className={cn('overflow-hidden relative', aspectClass, 'bg-muted')}>
        {!imgError ? (
          <img
            src={imgUrl(item.url)}
            alt={item.caption ?? ''}
            loading="lazy"
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          // Placeholder visual quando o arquivo ainda não existe
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-muted-foreground/40 font-mono">
              {item.url.split('/').pop()}
            </span>
          </div>
        )}
      </div>
      {item.caption && (
        <p className="text-xs text-muted-foreground px-3 py-2 leading-relaxed border-t border-border/50">
          {item.caption}
        </p>
      )}
    </motion.div>
  )
}

// ── ProjectCard — card do grid principal ─────────────────────────────────────

interface CardProps {
  project: Project
  index: number
  onClick: () => void
}

function ProjectCard({ project, index, onClick }: CardProps) {
  const videoRef   = useRef<HTMLVideoElement>(null)
  const mainMetric = project.metrics[0]

  const handleMouseEnter = useCallback(() => {
    if (project.type === 'video' && videoRef.current) {
      videoRef.current.play().catch(() => {/* poster permanece se autoplay bloqueado */})
    }
  }, [project.type])

  const handleMouseLeave = useCallback(() => {
    if (project.type === 'video' && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [project.type])

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: EASE, delay: (index % 2) * 0.1 }}
      className={COL_SPAN_CLASSES[index] ?? 'md:col-span-2'}
    >
      <button
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'group relative w-full overflow-hidden rounded-2xl lg:rounded-3xl',
          'h-64 sm:h-72 lg:h-[420px]',
          'text-left cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        )}
      >
        {/* Gradiente por categoria — fallback sempre renderizado abaixo da mídia */}
        <div
          className="absolute inset-0"
          style={{ background: CATEGORY_GRADIENT[project.category] ?? 'var(--muted)' }}
        />

        {/* ── Mídia de capa ── */}
        {project.type === 'video' ? (
          <video
            ref={videoRef}
            src={imgUrl(project.mediaUrl)}
            poster={project.poster ? imgUrl(project.poster) : undefined}
            muted
            loop
            playsInline
            preload="metadata"
            // pointer-events-none: o button captura hover/click sem interferência do video
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        ) : (
          <img
            src={imgUrl(project.mediaUrl)}
            alt={project.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            onError={e => (e.currentTarget.style.display = 'none')}
          />
        )}

        {/* Badge de vídeo (desaparece no hover quando o vídeo já está a jogar) */}
        {project.type === 'video' && (
          <div
            aria-label="Projeto em vídeo"
            className={cn(
              'absolute top-4 right-14 z-10',
              'w-7 h-7 rounded-full flex items-center justify-center',
              'bg-black/40 backdrop-blur-sm border border-white/20 text-white',
              'transition-opacity duration-300',
              'group-hover:opacity-0'
            )}
          >
            <Play size={11} strokeWidth={2} className="ml-0.5" />
          </div>
        )}

        {/* Overlay de base */}
        <div className="absolute bottom-0 inset-x-0 h-3/4 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />

        {/* ── Conteúdo textual do card ── */}
        <div className="absolute inset-0 flex flex-col justify-between p-5 lg:p-6">

          {/* Topo: categoria + ano */}
          <div className="flex items-center justify-between">
            <span className={cn(
              'inline-flex items-center gap-1.5',
              'px-3 py-1 rounded-full',
              'text-[10px] uppercase tracking-label font-medium',
              'bg-white/15 backdrop-blur-sm text-white/90 border border-white/20',
            )}>
              <span className="opacity-70">{CATEGORY_SYMBOL[project.category]}</span>
              {project.category}
            </span>
            <span className="text-[11px] text-white/60 font-mono">{project.year}</span>
          </div>

          {/* Base: métrica + título + cliente */}
          <div className="flex flex-col gap-2">
            <div className={cn(
              'self-start inline-flex items-center gap-1.5',
              'px-3 py-1 rounded-full',
              'text-[11px] font-bold tracking-tight',
              'bg-accent/90 text-accent-foreground backdrop-blur-sm',
              'transition-transform duration-200 group-hover:scale-[1.03]'
            )}>
              {mainMetric.value}
              {mainMetric.delta && (
                <span className="font-normal opacity-75">{mainMetric.delta}</span>
              )}
              <span className="font-normal opacity-60 text-[10px] ml-0.5">
                {mainMetric.label}
              </span>
            </div>

            <h3 className={cn(
              'font-serif font-light text-white leading-[1.15]',
              'text-lg lg:text-xl line-clamp-2'
            )}>
              {project.title}
            </h3>

            <div className="flex items-center justify-between">
              <span className="text-xs text-white/60">{project.client}</span>
              <span className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center',
                'bg-white/10 backdrop-blur-sm border border-white/20 text-white/80',
                'transition-all duration-200',
                'group-hover:bg-accent group-hover:border-accent group-hover:text-accent-foreground',
                'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
              )}>
                <ArrowUpRight size={14} strokeWidth={1.75} />
              </span>
            </div>
          </div>
        </div>

        {/* Borda de hover */}
        <div className="absolute inset-0 rounded-2xl lg:rounded-3xl border border-transparent group-hover:border-accent/30 transition-colors duration-300 pointer-events-none" />
      </button>
    </motion.article>
  )
}

// ── ProjectModal ──────────────────────────────────────────────────────────────

interface ModalProps {
  project: Project
  onClose: () => void
}

function ProjectModal({ project, onClose }: ModalProps) {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  // Para projetos de vídeo: mostra o poster na capa (o vídeo completo fica na galeria)
  const coverSrc = project.poster ?? project.mediaUrl

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0',
          'bg-foreground/50 dark:bg-black/75',
          'backdrop-blur-sm',
        )}
        onClick={onClose}
        aria-label="Fechar modal"
      />

      {/* Caixa do modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        exit={{    opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.3, ease: EASE }}
        className={cn(
          'relative z-10 flex flex-col overflow-hidden',
          'w-full max-w-2xl max-h-[90svh]',
          'rounded-2xl lg:rounded-3xl',
          'bg-card',
          'shadow-[0_32px_80px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.04)]',
          'dark:shadow-[0_32px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)]',
        )}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >

        {/* ── Capa do modal ── */}
        <div className="relative h-44 sm:h-56 flex-shrink-0 overflow-hidden rounded-t-2xl lg:rounded-t-3xl">
          <div
            className="absolute inset-0"
            style={{ background: CATEGORY_GRADIENT[project.category] ?? 'var(--muted)' }}
          />
          <img
            src={imgUrl(coverSrc)}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={e => (e.currentTarget.style.display = 'none')}
          />
          {project.type === 'video' && (
            <div className={cn(
              'absolute bottom-4 left-5 z-10',
              'inline-flex items-center gap-2',
              'px-3 py-1.5 rounded-full',
              'text-[10px] uppercase tracking-label font-medium text-white',
              'bg-black/40 backdrop-blur-sm border border-white/20'
            )}>
              <Play size={9} strokeWidth={2} className="fill-white" />
              Vídeo disponível na galeria
            </div>
          )}
          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-card to-transparent" />
          <button
            onClick={onClose}
            className={cn(
              'absolute top-4 right-4 z-10',
              'w-8 h-8 rounded-full flex items-center justify-center',
              'bg-white/20 backdrop-blur-sm border border-white/30 text-white',
              'hover:bg-white/30 transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white'
            )}
            aria-label="Fechar"
          >
            <X size={15} strokeWidth={2} />
          </button>
        </div>

        {/* ── Conteúdo scrollável ── */}
        <div className="overflow-y-auto flex-1 px-6 pb-8 pt-4 lg:px-8 lg:pb-10">

          {/* Cabeçalho */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={cn(
              'px-2.5 py-1 rounded-full text-[10px] uppercase tracking-label font-medium',
              'bg-accent-subtle text-accent border border-accent/20'
            )}>
              {project.category}
            </span>
            <span className="text-xs text-muted-foreground font-mono">{project.year}</span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">{project.client}</span>
          </div>

          <h2 className={cn(
            'font-serif font-light text-foreground leading-[1.1] mb-6',
            'text-2xl lg:text-3xl tracking-editorial'
          )}>
            {project.title}
          </h2>

          {/* O Desafio */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <ChevronRight size={14} className="text-accent" strokeWidth={2.5} />
              <h3 className="text-xs uppercase tracking-label font-medium text-muted-foreground">
                O Desafio
              </h3>
            </div>
            <p className="text-sm lg:text-[0.9rem] text-muted-foreground leading-relaxed pl-5">
              {project.challenge}
            </p>
          </div>

          {/* A Estratégia */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <ChevronRight size={14} className="text-accent" strokeWidth={2.5} />
              <h3 className="text-xs uppercase tracking-label font-medium text-muted-foreground">
                A Estratégia
              </h3>
            </div>
            <p className="text-sm lg:text-[0.9rem] text-muted-foreground leading-relaxed pl-5">
              {project.solution}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-8">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full text-[11px] bg-muted text-muted-foreground border border-border"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Os Resultados */}
          <div>
            <div className="h-px divider-fade mb-6" />
            <h3 className="text-xs uppercase tracking-label font-medium text-muted-foreground mb-6">
              Os Resultados
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {project.metrics.map((metric, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.45, ease: EASE }}
                  className={cn(
                    'flex flex-col gap-1 p-4 rounded-xl',
                    'bg-muted/60 border border-border dark:bg-muted/40',
                    i === 0 && 'bg-accent-subtle border-accent/20 dark:bg-accent-subtle'
                  )}
                >
                  <span className={cn(
                    'font-serif font-medium leading-none tracking-[-0.03em]',
                    'text-[1.9rem] lg:text-[2.2rem]',
                    i === 0 ? 'text-accent' : 'text-foreground'
                  )}>
                    {metric.value}
                  </span>
                  {metric.delta && (
                    <span className="text-[10px] text-muted-foreground">{metric.delta}</span>
                  )}
                  <span className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                    {metric.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Galeria de mídias ── */}
          {project.gallery.length > 0 && (
            <div className="mt-10">
              <div className="h-px divider-fade mb-6" />
              <h3 className="text-xs uppercase tracking-label font-medium text-muted-foreground mb-5">
                Materiais do Projeto
              </h3>
              {/* Grid 2-col; vídeos fazem sm:col-span-2 internamente */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.gallery.map((item, i) => (
                  <MediaCard key={i} item={item} index={i} />
                ))}
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </motion.div>
  )
}

// ── SelectedWork (seção principal) ────────────────────────────────────────────

export function SelectedWork() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section id="trabalhos" className="relative bg-background">

      <div className="portfolio-container">
        <div className="h-px divider-fade" />
      </div>

      <div className="portfolio-container py-24 lg:py-32">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex items-end justify-between mb-12 lg:mb-16"
        >
          <div>
            <span className="text-[11px] uppercase tracking-label font-medium text-muted-foreground">
              01 — Cases de Sucesso
            </span>
            <h2 className={cn(
              'font-serif font-light text-foreground mt-2',
              'text-display-md tracking-editorial'
            )}>
              Selected Work
            </h2>
          </div>
          <span className="hidden md:block text-sm text-muted-foreground tabular-nums">
            {projects.length.toString().padStart(2, '0')} projetos
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-5">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>

      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal
            key={selected.id}
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>

    </section>
  )
}
