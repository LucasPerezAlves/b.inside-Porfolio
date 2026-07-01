import { motion } from 'framer-motion'
import { MapPin, ArrowDownRight } from 'lucide-react'
import { profile } from '@/data/portfolioData'
import { cn, imgUrl } from '@/lib/utils'
import { RevealLine } from '@/components/ui/reveal-text'
import { VideoShowreel } from '@/components/VideoShowreel'

const EASE = [0.22, 1, 0.36, 1] as const

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.04 } },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0,  transition: { type: 'spring' as const, stiffness: 55, damping: 22 } },
}

export function AboutSection() {
  return (
    <section id="sobre" className="relative bg-background overflow-hidden">

      <div className="portfolio-container">
        <div className="h-px divider-fade" />
      </div>

      <div className="portfolio-container py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 xl:gap-24 items-center">

          {/* ── Coluna da foto — mobile: topo · desktop: esquerda ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative"
          >
            {/* Foto — proporção retrato, responsiva */}
            <div className={cn(
              'relative overflow-hidden rounded-2xl lg:rounded-3xl',
              'aspect-[3/4]',
              'w-full max-w-sm mx-auto lg:max-w-none',
              'bg-muted photo-shadow',
            )}>
              <img
                src={imgUrl('/images/testimonials/imagem kaii.jpg')}
                alt="Kailany Ribeiro — fundadora da b.inside"
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-0 inset-x-0 h-2/5 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

              {/* Badge de localização */}
              <div className={cn(
                'absolute bottom-5 left-5',
                'inline-flex items-center gap-1.5',
                'px-3 py-1.5 rounded-full text-xs font-medium',
                'bg-background/90 backdrop-blur-sm border border-border/50',
                'text-foreground',
              )}>
                <MapPin size={11} strokeWidth={2} className="text-accent" />
                {profile.location}
              </div>
            </div>

            {/* Ornamentos decorativos — desktop apenas */}
            <div
              aria-hidden
              className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full border border-accent/10 pointer-events-none hidden lg:block"
            />
            <div
              aria-hidden
              className="absolute -top-5 -left-5 w-20 h-20 rounded-full border border-accent/[0.06] pointer-events-none hidden lg:block"
            />
          </motion.div>

          {/* ── Coluna de texto ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.span
              variants={fadeUp}
              className="block text-[11px] uppercase tracking-label font-medium text-muted-foreground"
            >
              — Kailany Ribeiro
            </motion.span>

            {/* h2 com reveal por linha — independente do stagger do pai */}
            <h2 className={cn(
              'font-serif font-light tracking-editorial leading-[1.05]',
              'text-display-md',
              'text-foreground mt-3 mb-0',
            )}>
              <RevealLine delay={0.08}>Por trás</RevealLine>
              <RevealLine delay={0.18}>
                do <em className="italic text-accent">olhar</em>
              </RevealLine>
            </h2>

            <motion.div variants={fadeUp} className="mt-5 mb-8">
              <span className={cn(
                'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full',
                'text-[11px] font-medium uppercase tracking-label',
                'bg-accent-subtle text-accent border border-accent/20',
              )}>
                Fundadora · b.inside
              </span>
            </motion.div>

            <div className="space-y-5">
              <motion.p
                variants={fadeUp}
                className="text-[0.95rem] text-muted-foreground leading-[1.78]"
              >
                Tenho 20 anos e sou fundadora da B.Inside, uma agência especializada
                em marketing de conteúdo, gestão de redes sociais e cobertura de eventos.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="text-[0.95rem] text-muted-foreground leading-[1.78]"
              >
                Acredito que uma marca forte vai muito além de posts bonitos: ela precisa
                transmitir propósito, criar conexão e gerar resultados. Foi com essa visão
                que construí a B.Inside, ajudando empresas e profissionais a fortalecerem
                sua presença digital por meio de estratégias criativas e conteúdo autêntico.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="text-[0.95rem] text-muted-foreground leading-[1.78]"
              >
                Além do marketing, sou apaixonada por contar histórias. Seja através das
                redes sociais ou registrando momentos únicos em casamentos, festas de 15
                anos e eventos, meu objetivo é transformar cada detalhe em uma experiência
                memorável.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="text-[0.95rem] text-muted-foreground leading-[1.78]"
              >
                Hoje, dedico meu trabalho a unir criatividade, estratégia e proximidade,
                oferecendo um atendimento personalizado para que cada cliente tenha uma
                comunicação que realmente represente sua essência.
              </motion.p>
            </div>

            {/* CTAs — contato + showreel (se URL configurada) */}
            <motion.div variants={fadeUp} className="mt-9 flex items-center gap-5 flex-wrap">
              <a
                href="#contato"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground group"
              >
                <span className="underline underline-offset-4 decoration-accent/40 group-hover:decoration-accent transition-colors duration-200">
                  Vamos criar algo juntas?
                </span>
                <ArrowDownRight
                  size={16}
                  strokeWidth={1.75}
                  className="text-accent transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </a>

              {/* Botão do showreel — só aparece quando SHOWREEL_URL estiver configurada */}
              <VideoShowreel />
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
