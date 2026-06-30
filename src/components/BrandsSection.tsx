import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// TODO: substituir pelos logos SVG/PNG reais dos clientes/parceiros
// Formato esperado de logo: arquivo SVG ou PNG com fundo transparente, ~160×48px
// Coloque os arquivos em /public/images/brands/ e substitua o campo `logo`
const BRANDS = [
  { name: 'Conjuntos do Brasil', logo: null }, // TODO: adicionar logo real
  { name: 'Namook',              logo: null }, // TODO: adicionar logo real
  { name: 'Arte Urbana SP',      logo: null }, // TODO: adicionar logo real
  { name: 'Formalize Eventos',   logo: null }, // TODO: adicionar logo real
  { name: 'KNN Idiomas',         logo: null }, // TODO: adicionar logo real
  { name: 'Towers',              logo: null }, // TODO: adicionar logo real
] as const

const EASE = [0.22, 1, 0.36, 1] as const

// Título configurável — TODO: Kailany pode ajustar o texto
const SECTION_TITLE = 'Marcas que já transformamos'

export function BrandsSection() {
  return (
    <section className="relative bg-background overflow-hidden">

      <div className="portfolio-container">
        <div className="h-px divider-fade" />
      </div>

      <div className="portfolio-container py-12 lg:py-16">

        {/* Cabeçalho minimalista */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center text-[11px] uppercase tracking-label font-medium text-muted-foreground/60 mb-8"
        >
          {SECTION_TITLE}
        </motion.p>

        {/* Grid de logos / word-marks */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4"
        >
          {BRANDS.map((brand, i) => (
            <motion.div
              key={`${brand.name}-${i}`}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: EASE, delay: i * 0.05 }}
              className={cn(
                'group h-14 flex items-center justify-center px-3 rounded-xl',
                'border border-border',
                // Efeito grayscale → colorido no hover (via opacity)
                'opacity-40 hover:opacity-100',
                'transition-opacity duration-300 ease-out',
                'cursor-default select-none',
              )}
            >
              {brand.logo ? (
                // TODO: quando logos reais estiverem disponíveis, usar <img>
                // <img src={brand.logo} alt={brand.name} className="h-6 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" />
                <span className="text-[10px] font-semibold text-foreground uppercase tracking-[0.08em] text-center leading-tight">
                  {brand.name}
                </span>
              ) : (
                <span className="text-[10px] font-semibold text-foreground uppercase tracking-[0.08em] text-center leading-tight">
                  {brand.name}
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
