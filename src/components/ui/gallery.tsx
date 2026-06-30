import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Play, ArrowUpRight } from 'lucide-react'
import { cn, imgUrl } from '@/lib/utils'
import { PREVIEW_MEDIA, ALL_MEDIA, type GalleryMedia } from './gallery-data'

// Carregamento lazy — o bundle do FullGallery só é baixado quando o usuário clica
const FullGallery = lazy(() =>
  import('./FullGallery').then(m => ({ default: m.FullGallery }))
)

const EASE = [0.22, 1, 0.36, 1] as const

// ── Scatter positions ─────────────────────────────────────────────────────────
// Container desktop: 768 × 540 px | cartões: 200 × 280 px | centro: (384, 270)
// Limites: x borda = 384 ± (|x| + 100) | y borda = 270 ± (|y| + 140) — todos ✓

type ScatterPos = { x: number; y: number; rotate: number; z: number }

const DESKTOP_POS: ScatterPos[] = [
  { x: 0,    y: 0,    rotate: -2, z: 5 },   // centro/frente
  { x: -210, y: 55,   rotate:  5, z: 4 },   // esquerda
  { x: 210,  y: -30,  rotate: -4, z: 4 },   // direita
  { x: -80,  y: -95,  rotate:  8, z: 3 },   // superior esquerdo
  { x: 130,  y:  95,  rotate: -6, z: 3 },   // inferior direito
]

// Mobile: card-deck compacto — x ≤ ±10 px para não vazar na tela
const MOBILE_POS: ScatterPos[] = [
  { x: 0,   y: 0,   rotate:  0, z: 5 },
  { x: -7,  y: 6,   rotate: -2, z: 4 },
  { x:  7,  y: 12,  rotate:  2, z: 3 },
  { x: -10, y: 18,  rotate: -1, z: 2 },
  { x:  10, y: 24,  rotate:  1, z: 1 },
]

function useIsMobile(): boolean {
  const [mobile, setMobile] = useState<boolean>(
    () => (typeof window !== 'undefined' ? window.innerWidth < 768 : false)
  )
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn, { passive: true })
    return () => window.removeEventListener('resize', fn)
  }, [])
  return mobile
}

// ── ScatterCard — único componente desta prévia ───────────────────────────────

function ScatterCard({ item, index, isMobile }: {
  item: GalleryMedia; index: number; isMobile: boolean
}) {
  const pos      = (isMobile ? MOBILE_POS : DESKTOP_POS)[index] ?? DESKTOP_POS[0]
  const videoRef = useRef<HTMLVideoElement>(null)

  // Inicia loading/play do vídeo somente quando o card entra no viewport.
  // preload="none" garante que nenhum byte é baixado antes disso.
  useEffect(() => {
    if (item.type !== 'video') return
    const el = videoRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.load()
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [item.type])

  return (
    <motion.div
      drag
      dragElastic={0.06}
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.76, y: 28 }}
      animate={{
        opacity: 1, scale: 1,
        x: pos.x, y: pos.y, rotate: pos.rotate, zIndex: pos.z,
      }}
      transition={{ delay: index * 0.09, duration: 0.7, ease: EASE }}
      whileHover={{ scale: 1.04, zIndex: 40, transition: { duration: 0.2 } }}
      whileDrag={{ scale: 1.06, zIndex: 50, cursor: 'grabbing' }}
      style={{
        position: 'absolute', top: '50%', left: '50%',
        marginLeft: -100, marginTop: -140,
        touchAction: 'none', cursor: 'grab', willChange: 'transform',
      }}
      className={cn(
        'w-[200px] h-[280px] overflow-hidden rounded-3xl select-none',
        'bg-neutral-200 dark:bg-neutral-800',
        'border border-black/[0.08] dark:border-white/[0.08]',
        'shadow-[0_10px_36px_rgba(0,0,0,0.20),0_2px_8px_rgba(0,0,0,0.10)]',
        'dark:shadow-[0_10px_40px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.04)]',
      )}
    >
      {item.type === 'video' ? (
        <video
          ref={videoRef}
          src={imgUrl(item.src)}
          poster={item.poster ? imgUrl(item.poster) : undefined}
          loop muted playsInline preload="none"
          className="w-full h-full object-cover pointer-events-none"
          onError={e => (e.currentTarget.style.display = 'none')}
        />
      ) : (
        <img
          src={imgUrl(item.src)} alt={item.label}
          draggable={false} loading="lazy"
          className="w-full h-full object-cover pointer-events-none"
          onError={e => (e.currentTarget.style.display = 'none')}
        />
      )}

      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/65 to-transparent p-3 pt-12 pointer-events-none">
        <span className="text-[10px] font-medium text-white/90 uppercase tracking-[0.09em]">
          {item.label}
        </span>
      </div>

      {item.type === 'video' && (
        <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center pointer-events-none">
          <Play size={9} className="text-white fill-white ml-[1px]" />
        </div>
      )}
    </motion.div>
  )
}

// ── PhotoGallery — seção da landing page ──────────────────────────────────────

export function PhotoGallery() {
  const [galleryOpen, setGalleryOpen] = useState(false)
  const isMobile = useIsMobile()

  return (
    <section id="galeria" className="relative bg-background overflow-x-hidden">

      <div className="portfolio-container">
        <div className="h-px divider-fade" />
      </div>

      <div className="portfolio-container py-16 lg:py-24">

        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-12 lg:mb-16"
        >
          <span className="text-[11px] uppercase tracking-label font-medium text-muted-foreground">
            ✦ — Stories
          </span>
          <h2 className={cn(
            'font-serif font-light text-foreground mt-2',
            'text-display-md tracking-editorial',
          )}>
            Nossas
            <br />
            <em className="italic text-accent">Histórias</em>
          </h2>
        </motion.div>

        {/* Scatter — 5 itens curados */}
        <div
          className="relative mx-auto overflow-hidden"
          style={{ height: isMobile ? 310 : 540, maxWidth: isMobile ? '100%' : 768 }}
        >
          {PREVIEW_MEDIA.map((item, i) => (
            <ScatterCard key={item.id} item={item} index={i} isMobile={isMobile} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5, ease: EASE }}
          className="mt-10 flex flex-col items-center gap-4 text-center"
        >
          <p className="hidden md:block text-sm text-muted-foreground max-w-[44ch] leading-relaxed">
            Arraste os cards para explorar — ou veja o portfólio completo.
          </p>

          <button
            onClick={() => setGalleryOpen(true)}
            className={cn(
              'inline-flex items-center gap-2.5 px-7 py-3 rounded-xl',
              'bg-foreground text-background text-sm font-medium',
              'hover:opacity-90 active:scale-[0.98] transition-all duration-200',
              'shadow-[0_4px_20px_rgba(0,0,0,0.12)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.40)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            )}
          >
            Ver Todas as Histórias
            <span className="text-xs opacity-55">({ALL_MEDIA.length})</span>
            <ArrowUpRight size={14} strokeWidth={2} />
          </button>
        </motion.div>
      </div>

      {/* Modal completo — lazy, só carrega o bundle quando aberto pela 1ª vez */}
      {galleryOpen && (
        <Suspense fallback={null}>
          <FullGallery onClose={() => setGalleryOpen(false)} />
        </Suspense>
      )}
    </section>
  )
}
