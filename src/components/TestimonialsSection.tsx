import { motion } from 'framer-motion'
import { CircularTestimonials } from '@/components/ui/circular-testimonials'
import { circularTestimonials } from '@/data/portfolioData'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

// ── Paletas por tema ──────────────────────────────────────────────────────────

const LIGHT_COLORS = {
  name:                '#0a0a0a',
  designation:         '#454545',
  testimony:           '#171717',
  arrowBackground:     '#141414',
  arrowForeground:     '#f1f1f7',
  arrowHoverBackground:'#D4587E',   // rose-magenta do tema Bem Menina
}

const DARK_COLORS = {
  name:                '#f7f7ff',
  designation:         '#e1e1e1',
  testimony:           '#f1f1f7',
  arrowBackground:     '#C9A96E',   // champanhe dourado do tema Premium
  arrowForeground:     '#141414',
  arrowHoverBackground:'#f7f7ff',
}

// ── TestimonialsSection ───────────────────────────────────────────────────────

export function TestimonialsSection() {
  const { theme } = useTheme()

  const colors = theme === 'dark' ? DARK_COLORS : LIGHT_COLORS

  // Dark mode usa fundo ligeiramente mais profundo que --background (#09090B)
  // para criar separação visual com as seções vizinhas
  const sectionBg = theme === 'dark' ? '#060507' : 'var(--background)'

  return (
    <section
      id="depoimentos"
      className="relative"
      style={{ backgroundColor: sectionBg }}
    >

      {/* Divisor de seção */}
      <div className="portfolio-container">
        <div className="h-px divider-fade" />
      </div>

      {/* Decoração ambiente — espelha o tom da seção hero */}
      <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {theme === 'light' ? (
          // Light: gradiente rosado suave no canto superior esquerdo
          <div className="absolute -top-24 -left-24 w-[35vw] h-[35vw] max-w-lg max-h-lg rounded-full blur-[120px] opacity-[0.07] bg-accent" />
        ) : (
          // Dark: brilho dourado sutil no canto inferior direito
          <div className="absolute -bottom-24 -right-24 w-[40vw] h-[40vw] max-w-xl max-h-xl rounded-full blur-[140px] opacity-[0.04] bg-accent" />
        )}
      </div>

      <div className="portfolio-container py-24 lg:py-32">

        {/* ── Cabeçalho da seção ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14 lg:mb-20"
        >
          <span className="text-[11px] uppercase tracking-label font-medium text-muted-foreground">
            03 — Depoimentos
          </span>
          <h2 className={cn(
            'font-serif font-light text-foreground mt-2',
            'text-display-md tracking-editorial'
          )}>
            O que dizem
            <br />
            <em className="not-italic italic text-accent">sobre o trabalho</em>
          </h2>
        </motion.div>

        {/* ── Componente de depoimentos ── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <CircularTestimonials
            testimonials={circularTestimonials}
            autoplay
            colors={colors}
          />
        </motion.div>

      </div>
    </section>
  )
}
