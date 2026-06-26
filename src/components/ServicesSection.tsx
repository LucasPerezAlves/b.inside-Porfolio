import { motion } from 'framer-motion'
import { LayoutGrid, TrendingUp, FileText, Lightbulb, Rocket, ArrowUpRight } from 'lucide-react'
import { services, profile, type Service } from '@/data/portfolioData'
import { cn } from '@/lib/utils'

// ── Constantes ────────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const

const ICON_MAP = { LayoutGrid, TrendingUp, FileText, Lightbulb, Rocket }

// ── ServiceRow ────────────────────────────────────────────────────────────────

interface ServiceRowProps {
  service: Service
  index: number
  whatsappUrl: string
}

function ServiceRow({ service, index, whatsappUrl }: ServiceRowProps) {
  const IconName = service.icon as keyof typeof ICON_MAP
  const Icon = ICON_MAP[IconName] ?? LayoutGrid

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.06 }}
      className="list-none border-b border-border last:border-b-0"
    >
      <div
        className={cn(
          'group relative -mx-3 px-3 lg:-mx-5 lg:px-5',
          'py-8 lg:py-10 rounded-xl',
          'transition-colors duration-200',
          'hover:bg-muted/40',
          service.highlight && 'bg-accent-subtle/15 hover:bg-accent-subtle/25'
        )}
      >
        {/* Linha de acento esquerda: sempre visível no highlight, animada no hover */}
        <span
          aria-hidden
          className={cn(
            'absolute left-0 top-3 bottom-3 w-[2px] rounded-full bg-accent',
            'transition-all duration-500 ease-out origin-top',
            service.highlight
              ? 'opacity-100 scale-y-100'
              : 'opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100'
          )}
        />

        <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-12">

          {/* ── Coluna esquerda: número + ícone + nome ── */}
          <div className="flex items-start gap-4 lg:w-[40%]">
            <span className={cn(
              'font-mono text-3xl lg:text-4xl font-light tabular-nums leading-none pt-0.5 select-none min-w-[2.5rem]',
              service.highlight ? 'text-accent/30' : 'text-muted-foreground/20'
            )}>
              {(index + 1).toString().padStart(2, '0')}
            </span>

            <div className="flex-1">
              <div className="flex items-center gap-2.5 flex-wrap mb-3">
                {/* Ícone */}
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                  'border',
                  service.highlight
                    ? 'bg-accent/10 border-accent/25 text-accent'
                    : 'bg-muted border-border text-muted-foreground group-hover:bg-accent/10 group-hover:border-accent/20 group-hover:text-accent',
                  'transition-colors duration-200'
                )}>
                  <Icon size={15} strokeWidth={1.75} />
                </div>

                {/* Nome */}
                <h3 className="font-serif text-xl lg:text-2xl text-foreground font-light tracking-[-0.02em]">
                  {service.name}
                </h3>

                {/* Badge de destaque */}
                {service.highlight && (
                  <span className={cn(
                    'px-2.5 py-0.5 rounded-full',
                    'text-[10px] font-semibold uppercase tracking-label',
                    'bg-accent text-accent-foreground'
                  )}>
                    ★ Mais Procurado
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ── Coluna direita: descrição + tags + CTA ── */}
          <div className={cn(
            'flex-1 flex flex-col gap-5',
            'lg:border-l lg:border-border lg:pl-10'
          )}>
            <p className="text-sm lg:text-[0.9rem] text-muted-foreground leading-relaxed">
              {service.description}
            </p>

            {/* Entregáveis */}
            <div className="flex flex-wrap gap-1.5">
              {service.deliverables.map(tag => (
                <span
                  key={tag}
                  className={cn(
                    'px-2.5 py-1 rounded-full',
                    'text-[11px] text-muted-foreground',
                    'bg-muted border border-border',
                    'transition-colors duration-150',
                    service.highlight && 'bg-accent-subtle border-accent/20 text-accent/80'
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center gap-1.5 group/cta',
                  'text-sm font-medium',
                  'text-muted-foreground hover:text-foreground',
                  'transition-colors duration-200',
                  'focus-visible:outline-none focus-visible:underline',
                  service.highlight && 'text-accent/80 hover:text-accent'
                )}
              >
                Solicitar Orçamento
                <ArrowUpRight
                  size={14}
                  strokeWidth={2}
                  className="transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                />
              </a>
            </div>
          </div>

        </div>
      </div>
    </motion.li>
  )
}

// ── ServicesSection ───────────────────────────────────────────────────────────

export function ServicesSection() {
  const whatsappUrl = profile.socials.find(s => s.platform === 'whatsapp')?.url ?? '#'

  return (
    <section id="servicos" className="bg-background">

      <div className="portfolio-container">
        <div className="h-px divider-fade" />
      </div>

      <div className="portfolio-container py-24 lg:py-32">

        {/* ── Cabeçalho da seção ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex items-end justify-between mb-10 lg:mb-14"
        >
          <div>
            <span className="text-[11px] uppercase tracking-label font-medium text-muted-foreground">
              02 — Serviços
            </span>
            <h2 className={cn(
              'font-serif font-light text-foreground mt-2',
              'text-display-md tracking-editorial'
            )}>
              O que posso fazer
              <br className="hidden lg:block" />
              {' '}pela sua marca
            </h2>
          </div>

          <span className="hidden md:flex items-center gap-1.5 text-sm text-muted-foreground tabular-nums">
            {services.length.toString().padStart(2, '0')} serviços disponíveis
          </span>
        </motion.div>

        {/* ── Lista de serviços ── */}
        <ul className="border-t border-border p-0 m-0">
          {services.map((service, i) => (
            <ServiceRow
              key={service.id}
              service={service}
              index={i}
              whatsappUrl={whatsappUrl}
            />
          ))}
        </ul>

        {/* Nota de rodapé da seção */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-xs text-muted-foreground/60 text-center"
        >
          Todos os projetos incluem relatório de performance e acompanhamento estratégico contínuo.
        </motion.p>

      </div>
    </section>
  )
}
