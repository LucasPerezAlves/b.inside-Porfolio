import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaQuoteRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { imgUrl } from '@/lib/utils'

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
  designation:         '#454545',
  testimony:           '#171717',
  arrowBackground:     '#141414',
  arrowForeground:     '#f1f1f7',
  arrowHoverBackground:'#D4587E',
}

// ── Component ─────────────────────────────────────────────────────────────────

export function CircularTestimonials({
  testimonials,
  autoplay = true,
  colors,
}: CircularTestimonialsProps) {
  const [active,  setActive]  = useState(0)
  const [hovered, setHovered] = useState<'prev' | 'next' | null>(null)
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

  // Autoplay — 5 s
  useEffect(() => {
    if (!autoplay) return
    const id = setInterval(goNext, 5000)
    return () => clearInterval(id)
  }, [autoplay, goNext])

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
    <div ref={containerRef} className="w-full">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-24">

        {/* ── STACKED PHOTO CARDS ────────────────────────────────────────────── */}
        <div
          className="relative flex-shrink-0 w-[260px] h-[340px] sm:w-[300px] sm:h-[390px] lg:w-[320px] lg:h-[420px]"
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
                  // Light: soft shadow with card lift feel
                  // Dark: deeper shadow with glow handled by section bg
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
                  onError={e => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
                {/* Cinema gradient at bottom for depth */}
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
        <div className="flex-1 flex flex-col gap-5 max-w-xl">

          {/* Quote mark */}
          <FaQuoteRight
            size={32}
            style={{ color: c.arrowBackground, opacity: 0.12 }}
            aria-hidden
          />

          {/* Animated quote — word-by-word blur entry */}
          <div
            className="relative"
            style={{ minHeight: 'clamp(9rem, 18vw, 11.5rem)' }}
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
                  position:   'absolute',
                  inset:      0,
                  margin:     0,
                  fontSize:   'clamp(0.88rem, 2vw, 1.02rem)',
                  lineHeight: 1.8,
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

          {/* Author name + designation + navigation ───────────────────────── */}
          <div
            style={{
              display:        'flex',
              alignItems:     'flex-end',
              justifyContent: 'space-between',
              gap:            '1rem',
              paddingTop:     '0.25rem',
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

          {/* Progress indicators */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
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
