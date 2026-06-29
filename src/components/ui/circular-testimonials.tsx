import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaQuoteRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { cn, imgUrl } from '@/lib/utils'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CircularTestimonialItem {
  quote:       string
  name:        string
  designation: string
  src:         string
}

export interface CircularTestimonialsColors {
  name?:                 string
  designation?:          string
  testimony?:            string
  arrowBackground?:      string
  arrowForeground?:      string
  arrowHoverBackground?: string
}

interface CircularTestimonialsProps {
  testimonials: CircularTestimonialItem[]
  autoplay?:   boolean
  colors?:     CircularTestimonialsColors
}

// ── Responsive gap ────────────────────────────────────────────────────────────

function calculateGap(w: number): number {
  if (w >= 1024) return 22
  if (w >= 768)  return 18
  if (w >= 480)  return 14
  return 10
}

// ── Stack transforms per offset from active card ──────────────────────────────
// offset 0 = active/front  |  offset 1 = behind-1  |  offset 2 = behind-2
// offset 3+ = hidden (animates in/out seamlessly)

interface StackPos {
  rotate:  number
  x:       number
  y:       number
  scale:   number
  opacity: number
  zIndex:  number
}

function getStackPos(offset: number, gap: number): StackPos {
  if (offset === 0) return { rotate: 0,   x: 0,         y: 0,         scale: 1,    opacity: 1,   zIndex: 30 }
  if (offset === 1) return { rotate: -6,  x: gap * 1.5, y: gap * 0.6, scale: 0.95, opacity: 0.9, zIndex: 20 }
  if (offset === 2) return { rotate: -12, x: gap * 3,   y: gap * 1.2, scale: 0.90, opacity: 0.7, zIndex: 10 }
  return               { rotate: -16, x: gap * 4,   y: gap * 1.6, scale: 0.86, opacity: 0,   zIndex: 5  }
}

// ── Default colors ────────────────────────────────────────────────────────────

const DEFAULTS: Required<CircularTestimonialsColors> = {
  name:                '#0a0a0a',
  designation:         '#525252',
  testimony:           '#171717',
  arrowBackground:     '#171717',
  arrowForeground:     '#f5f5f5',
  arrowHoverBackground:'#404040',
}

// ── Component ─────────────────────────────────────────────────────────────────

export function CircularTestimonials({
  testimonials,
  autoplay = true,
  colors,
}: CircularTestimonialsProps) {
  const [active,  setActive]  = useState(0)
  const [hovered, setHovered] = useState<'prev' | 'next' | null>(null)
  const [paused,  setPaused]  = useState(false)
  const [gap,     setGap]     = useState(18)
  const containerRef          = useRef<HTMLDivElement>(null)

  const c     = { ...DEFAULTS, ...colors }
  const total = testimonials.length

  const goNext = useCallback(() => setActive(v => (v + 1) % total), [total])
  const goPrev = useCallback(() => setActive(v => (v - 1 + total) % total), [total])

  // ResizeObserver → responsive gap
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setGap(calculateGap(el.offsetWidth)))
    ro.observe(el)
    setGap(calculateGap(el.offsetWidth))
    return () => ro.disconnect()
  }, [])

  // Autoplay — 9 s; pausa quando o cursor/toque está sobre o componente
  useEffect(() => {
    if (!autoplay || paused) return
    const id = setInterval(goNext, 9000)
    return () => clearInterval(id)
  }, [autoplay, paused, goNext])

  // Keyboard navigation
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [goNext, goPrev])

  const arrowBtn = [
    { id: 'prev' as const, fn: goPrev, Icon: FaChevronLeft,  label: 'Depoimento anterior' },
    { id: 'next' as const, fn: goNext, Icon: FaChevronRight, label: 'Próximo depoimento'  },
  ]

  return (
    <div
      ref={containerRef}
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* gap reduzido no mobile para não desperdiçar espaço vertical */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 xl:gap-24">

        {/* ── STACKED PHOTO CARDS ────────────────────────────────────────────── */}
        <div
          className="relative flex-shrink-0 w-[240px] h-[310px] sm:w-[280px] sm:h-[360px] lg:w-[320px] lg:h-[420px]"
          aria-hidden
        >
          {testimonials.map((t, i) => {
            const offset = (i - active + total) % total
            const s      = getStackPos(offset, gap)

            return (
              <motion.div
                key={i}
                animate={{
                  rotate:  s.rotate,
                  x:       s.x,
                  y:       s.y,
                  scale:   s.scale,
                  opacity: s.opacity,
                }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position:        'absolute',
                  inset:           0,
                  zIndex:          s.zIndex,
                  transformOrigin: '50% 100%',
                  borderRadius:    16,
                  overflow:        'hidden',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.20), 0 2px 8px rgba(0,0,0,0.10)',
                }}
              >
                <img
                  src={imgUrl(t.src)}
                  alt={t.name}
                  loading="lazy"
                  draggable={false}
                  style={{
                    width:      '100%',
                    height:     '100%',
                    objectFit:  'cover',
                    userSelect: 'none',
                    display:    'block',
                  }}
                  onError={e => { e.currentTarget.style.display = 'none' }}
                />
                <div
                  style={{
                    position: 'absolute', left: 0, right: 0, bottom: 0,
                    height: '40%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.45), transparent)',
                    pointerEvents: 'none',
                  }}
                />
              </motion.div>
            )
          })}
        </div>

        {/* ── TESTIMONIAL TEXT ───────────────────────────────────────────────── */}
        {/*
          min-h-0 é obrigatório em flex-children para permitir shrink abaixo
          do content-size — sem isso o flex-item transborda o pai no mobile.
        */}
        <div className="flex-1 min-h-0 flex flex-col gap-4 max-w-xl w-full">

          {/* Quote mark */}
          <FaQuoteRight
            size={26}
            style={{ color: c.arrowBackground, opacity: 0.12, flexShrink: 0 }}
            aria-hidden
          />

          {/*
            CORREÇÃO DO BUG:
            Antes: motion.p era position:absolute;inset:0 → ficava fora do fluxo,
            o pai mantinha apenas minHeight e o texto transbordava sobre o bloco
            de autor + botões abaixo.

            Agora: motion.p é position:relative (participa do fluxo normal).
            AnimatePresence mode="wait" garante que só existe 1 elemento por vez,
            então não há sobreposição durante a transição.
            O wrapper tem max-h controlado por breakpoint + overflow-y-auto com
            scrollbar oculto — texto longo fica contido sem estourar o layout.
          */}
          <div
            className={cn(
              'overflow-y-auto',
              '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
              // Mobile: limita altura para caber em qualquer smartphone
              // Tablet: um pouco mais de espaço
              // Desktop: sem restrição (layout horizontal, não quebra nada)
              'max-h-[152px] md:max-h-[196px] lg:max-h-none',
            )}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                exit={{
                  opacity: 0,
                  filter:  'blur(8px)',
                  y:       -6,
                  transition: { duration: 0.18, ease: 'easeIn' },
                }}
                style={{
                  // position:relative (padrão) — participa do fluxo normal
                  margin:     0,
                  padding:    0,
                  // fonte ligeiramente menor no mobile via clamp
                  fontSize:   'clamp(0.80rem, 1.9vw, 1.02rem)',
                  lineHeight: 1.78,
                  fontWeight: 300,
                  color:      c.testimony,
                }}
              >
                {testimonials[active].quote.split(' ').map((word, wIdx) => (
                  <motion.span
                    key={`${active}-${wIdx}`}
                    initial={{ filter: 'blur(10px)', opacity: 0, y: 8 }}
                    animate={{ filter: 'blur(0px)',  opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.25,
                      ease:     'easeOut',
                      delay:    wIdx * 0.015,
                    }}
                    style={{ display: 'inline-block', marginRight: '0.28em' }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Author name + designation + navigation — flex-shrink:0 impede que
              o bloco seja empurrado para fora da área visível pelo texto acima */}
          <div
            style={{
              display:        'flex',
              alignItems:     'flex-end',
              justifyContent: 'space-between',
              gap:            '1rem',
              paddingTop:     '0.25rem',
              flexShrink:     0,
            }}
          >
            {/* Animated author */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`author-${active}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <p style={{ fontWeight: 600, fontSize: '0.92rem', lineHeight: 1.3, color: c.name }}>
                  {testimonials[active].name}
                </p>
                <p style={{ fontSize: '0.8rem', marginTop: '0.22rem', lineHeight: 1.4, color: c.designation }}>
                  {testimonials[active].designation}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Arrow navigation */}
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              {arrowBtn.map(({ id, fn, Icon, label }) => (
                <button
                  key={id}
                  onClick={fn}
                  onMouseEnter={() => setHovered(id)}
                  onMouseLeave={() => setHovered(null)}
                  aria-label={label}
                  style={{
                    width:           40,
                    height:          40,
                    borderRadius:    '50%',
                    border:          'none',
                    cursor:          'pointer',
                    display:         'flex',
                    alignItems:      'center',
                    justifyContent:  'center',
                    backgroundColor: hovered === id ? c.arrowHoverBackground : c.arrowBackground,
                    color:           c.arrowForeground,
                    transition:      'background-color 0.2s ease',
                    outline:         'none',
                    flexShrink:      0,
                  }}
                >
                  <Icon size={12} />
                </button>
              ))}
            </div>
          </div>

          {/* Progress indicators — flex-shrink:0 garante que sempre apareça */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexShrink: 0 }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Ir para depoimento ${i + 1}`}
                style={{
                  height:          6,
                  width:           i === active ? 22 : 6,
                  borderRadius:    3,
                  border:          'none',
                  cursor:          'pointer',
                  padding:         0,
                  backgroundColor: i === active
                    ? c.arrowBackground
                    : `${c.arrowBackground}30`,
                  transition: 'width 0.35s ease, background-color 0.35s ease',
                }}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
