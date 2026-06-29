import { motion } from 'framer-motion'
import { CircularTestimonials } from '@/components/ui/circular-testimonials'
import { circularTestimonials } from '@/data/portfolioData'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

const DARK_COLORS = {
  name:                '#f5f5f5',
  designation:         '#d4d4d4',
  testimony:           '#f0f0f0',
  arrowBackground:     '#d4d4d4',
  arrowForeground:     '#0a0a0a',
  arrowHoverBackground:'#f5f5f5',
}

export function TestimonialsSection() {
  return (
    <section
      id="depoimentos"
      className="relative"
      style={{ backgroundColor: '#080808' }}
    >

      {/* Divisor de seção */}
      <div className="portfolio-container">
        <div className="h-px divider-fade" />
      </div>

      {/* Decoração ambiente — brilho sutil no canto inferior direito */}
      <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-24 -right-24 w-[40vw] h-[40vw] max-w-xl max-h-xl rounded-full blur-[140px] opacity-[0.04] bg-accent" />
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
            colors={DARK_COLORS}
          />
        </motion.div>

      </div>
    </section>
  )
}
