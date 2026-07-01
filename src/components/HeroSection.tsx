import { motion } from 'framer-motion'
import { ArrowRight, Mail, MapPin } from 'lucide-react'
import { profile } from '@/data/portfolioData'
import { cn, imgUrl } from '@/lib/utils'

// ── Variantes de animação ──────────────────────────────────────────────────

// Framer Motion v12 exige tuple tipada para bezier customizado
const EASE = [0.22, 1, 0.36, 1] as const

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 55, damping: 22 },
  },
}

const fadeIn = {
  hidden:  { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.85, ease: EASE, delay: 0.3 },
  },
}

// ── Component ─────────────────────────────────────────────────────────────

export function HeroSection() {
  const emailSocial    = profile.socials.find(s => s.platform === 'email')
  const whatsappSocial = profile.socials.find(s => s.platform === 'whatsapp')
  const email          = emailSocial?.handle ?? 'ed.kailany@gmail.com'

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Decoração de fundo ── */}
      <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* Borrão de acento no canto superior direito */}
        <div className="absolute -top-32 -right-32 w-[50vw] h-[50vw] max-w-2xl max-h-2xl rounded-full blur-[120px] opacity-[0.12] dark:opacity-[0.06] bg-accent" />
        {/* Borrão suave inferior esquerdo */}
        <div className="absolute -bottom-40 -left-20 w-[35vw] h-[35vw] max-w-xl max-h-xl rounded-full blur-[100px] opacity-[0.08] dark:opacity-[0.04] bg-accent" />
        {/* Grade de pontos decorativa (apenas no modo menina) */}
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="portfolio-container w-full pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-12 lg:gap-16 xl:gap-20 items-center">

          {/* ════════════════════════════════════════
              Lado Esquerdo — Conteúdo
          ════════════════════════════════════════ */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start gap-6 lg:gap-7"
          >

            {/* Badge de disponibilidade */}
            <motion.div variants={fadeUp}>
              <span className={cn(
                'inline-flex items-center gap-2',
                'px-4 py-1.5 rounded-full',
                'text-[11px] font-medium uppercase tracking-label',
                'bg-emerald-950/60 text-emerald-400',
                'border border-emerald-500/25',
                'shadow-[0_0_0_3px_rgba(16,185,129,0.06)]'
              )}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {profile.availability}
              </span>
            </motion.div>

            {/* Título principal */}
            <motion.h1
              variants={fadeUp}
              className={cn(
                'font-serif font-light tracking-editorial',
                'text-display-xl lg:text-display-2xl',
                'text-foreground leading-[1.05]',
                'max-w-[14ch]'
              )}
            >
              b
              <em className="not-italic italic text-accent">.inside</em>
              <br />
              <span className="text-[0.82em] leading-[1.1]">
                Marketing de{' '}
                <span className="relative">
                  Conteúdo
                  {/* Sublinhado ondulado decorativo */}
                  <svg
                    aria-hidden
                    className="absolute left-0 -bottom-1.5 w-full"
                    height="6"
                    viewBox="0 0 200 6"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 3 Q25 0 50 3 Q75 6 100 3 Q125 0 150 3 Q175 6 200 3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-accent opacity-40"
                    />
                  </svg>
                </span>
              </span>
              <br />
              <span className="text-[0.65em] text-muted-foreground font-light tracking-[-0.01em]">
                &amp; Direção Visual
              </span>
            </motion.h1>

            {/* Bio / tagline */}
            <motion.p
              variants={fadeUp}
              className="text-base lg:text-[1.05rem] leading-relaxed text-muted-foreground max-w-[52ch]"
            >
              {profile.tagline}
            </motion.p>

            {/* Localização sutil */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-1.5 text-xs text-muted-foreground -mt-2"
            >
              <MapPin size={12} strokeWidth={1.75} className="text-accent" />
              {profile.location}
            </motion.div>

            {/* ── CTAs ── */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              {/* CTA primário */}
              <motion.a
                href={whatsappSocial?.url ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={cn(
                  'inline-flex items-center gap-2.5',
                  'px-6 py-3 rounded-xl',
                  'bg-accent text-accent-foreground',
                  'text-sm font-medium',
                  'shadow-[0_4px_20px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.40)]',
                  'hover:opacity-90 hover:shadow-[0_6px_28px_rgba(0,0,0,0.20)] dark:hover:shadow-[0_6px_28px_rgba(0,0,0,0.50)]',
                  'transition-[opacity,box-shadow] duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                )}
              >
                Iniciar um Projeto
                <ArrowRight size={15} strokeWidth={2} />
              </motion.a>

              {/* CTA secundário: abre composição no Gmail Web em nova aba */}
              <motion.a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={cn(
                  'inline-flex items-center gap-2.5',
                  'px-5 py-3 rounded-xl',
                  'border border-border bg-transparent',
                  'text-sm font-mono text-muted-foreground',
                  'hover:border-accent/50 hover:text-foreground hover:bg-muted/60',
                  'transition-[color,border-color,background-color] duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  'min-w-[200px] justify-center',
                )}
              >
                <Mail size={13} strokeWidth={1.75} />
                {email}
              </motion.a>
            </motion.div>


          </motion.div>

          {/* ════════════════════════════════════════
              Lado Direito — Foto profissional
          ════════════════════════════════════════ */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="relative self-center order-first lg:order-last"
          >
            {/* Borda decorativa deslocada (offset frame) */}
            <div
              aria-hidden
              className={cn(
                'absolute inset-0 rounded-3xl -z-10',
                'border border-accent/30',
                'translate-x-3.5 translate-y-3.5',
                'transition-[border-color] duration-300'
              )}
            />

            {/* Container da foto */}
            <div
              className={cn(
                'relative overflow-hidden',
                'rounded-3xl',
                'h-[72vw] max-h-80 lg:h-[520px] lg:max-h-none',
                'bg-muted border border-border',
                'photo-shadow',
                'transition-shadow duration-300'
              )}
            >
              {/* Fallback exibido se a foto profissional falhar ao carregar */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-subtle via-muted to-background" />

              {/* Foto real — oculta o placeholder quando o src carrega */}
              <img
                src={imgUrl(profile.avatar)}
                alt={`Foto profissional de ${profile.fullName}`}
                className="absolute inset-0 w-full h-full object-cover object-[center_80%]"
                loading="eager"
                onError={e => (e.currentTarget.style.display = 'none')}
              />

              {/* Gradiente na base da foto (para sobrepor texto, se houver) */}
              <div
                aria-hidden
                className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background/60 to-transparent pointer-events-none"
              />
            </div>


          </motion.div>

        </div>
      </div>
    </section>
  )
}
