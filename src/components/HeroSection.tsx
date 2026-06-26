import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, Copy, MapPin } from 'lucide-react'
import { profile } from '@/data/portfolioData'
import { cn } from '@/lib/utils'

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
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
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
  const [copied, setCopied] = useState(false)

  const emailSocial    = profile.socials.find(s => s.platform === 'email')
  const whatsappSocial = profile.socials.find(s => s.platform === 'whatsapp')
  const email          = emailSocial?.handle ?? 'ed@edilane.com.br'

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {}
  }

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
            backgroundImage: 'radial-gradient(circle, rgba(212,88,126,0.07) 1px, transparent 1px)',
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
                'bg-accent-subtle text-accent',
                'border border-accent/25',
                'shadow-[0_0_0_3px_var(--accent-subtle)]'
              )}>
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
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
              <a
                href={whatsappSocial?.url ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center gap-2.5',
                  'px-6 py-3 rounded-xl',
                  'bg-accent text-accent-foreground',
                  'text-sm font-medium',
                  'shadow-[0_4px_20px_rgba(212,88,126,0.3)] dark:shadow-[0_4px_20px_rgba(201,169,110,0.2)]',
                  'hover:opacity-88 hover:shadow-[0_6px_28px_rgba(212,88,126,0.4)] dark:hover:shadow-[0_6px_28px_rgba(201,169,110,0.3)]',
                  'active:scale-[0.98]',
                  'transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                )}
              >
                Iniciar um Projeto
                <ArrowRight size={15} strokeWidth={2} />
              </a>

              {/* CTA secundário: copiar e-mail */}
              <button
                onClick={handleCopyEmail}
                title="Clique para copiar o e-mail"
                className={cn(
                  'inline-flex items-center gap-2.5',
                  'px-5 py-3 rounded-xl',
                  'border border-border bg-transparent',
                  'text-sm font-mono text-muted-foreground',
                  'hover:border-accent/50 hover:text-foreground hover:bg-muted/60',
                  'active:scale-[0.98]',
                  'transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  'min-w-[200px] justify-center',
                  copied && 'border-accent/40 text-accent bg-accent-subtle'
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, y: 6, scale: 0.85 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.85 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="inline-flex items-center gap-2 text-accent text-sm font-sans font-medium"
                    >
                      <Check size={14} strokeWidth={2.5} />
                      Copiado!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="email"
                      initial={{ opacity: 0, y: 6, scale: 0.85 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.85 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="inline-flex items-center gap-2 truncate max-w-[200px]"
                    >
                      <Copy size={13} strokeWidth={1.75} />
                      {email}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>

            {/* ── Stats row ── */}
            <motion.div
              variants={fadeUp}
              className="pt-4 mt-1 w-full"
            >
              <div className="h-px divider-fade mb-5" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {profile.stats.map((stat, i) => (
                  <div key={i} className="flex flex-col gap-0.5">
                    <span
                      className={cn(
                        'font-serif font-medium leading-none tracking-[-0.02em]',
                        'text-[1.65rem] text-foreground',
                      )}
                    >
                      {stat.value}
                    </span>
                    <span className="text-[11px] uppercase tracking-label text-muted-foreground leading-tight mt-0.5">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
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
              {/* Placeholder visível até a foto real ser adicionada */}
              <div
                className={cn(
                  'absolute inset-0 flex flex-col items-center justify-center gap-4',
                  'bg-gradient-to-br from-accent-subtle via-muted to-background',
                )}
              >
                {/* Avatar com iniciais */}
                <div
                  className={cn(
                    'w-20 h-20 rounded-full',
                    'flex items-center justify-center',
                    'border-2 border-accent/30',
                    'bg-accent/10',
                    'font-sans text-xl font-semibold text-accent tracking-tight',
                  )}
                >
                  {profile.handle}
                </div>

                {/* Instrução para o desenvolvedor/cliente */}
                <div className="text-center px-8">
                  <p className="text-xs font-medium text-muted-foreground">
                    Foto profissional
                  </p>
                  <p className="text-[11px] text-muted-foreground/60 mt-0.5">
                    Substitua <code className="font-mono">/images/avatar-placeholder.jpg</code>
                  </p>
                  <p className="text-[11px] text-muted-foreground/50">
                    Recomendado: 800 × 1060 px
                  </p>
                </div>
              </div>

              {/* Foto real — oculta o placeholder quando o src carrega */}
              <img
                src={profile.avatar}
                alt={`Foto profissional de ${profile.fullName}`}
                className="absolute inset-0 w-full h-full object-cover object-top"
                loading="eager"
                onError={e => (e.currentTarget.style.display = 'none')}
              />

              {/* Gradiente na base da foto (para sobrepor texto, se houver) */}
              <div
                aria-hidden
                className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background/60 to-transparent pointer-events-none"
              />
            </div>

            {/* Badge flutuante sobre a foto */}
            <motion.div
              initial={{ opacity: 0, x: 16, y: 8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'absolute -bottom-3 -left-4 lg:-left-8',
                'flex items-center gap-2.5',
                'px-4 py-2.5 rounded-2xl',
                'bg-card border border-border',
                'shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]',
                'backdrop-blur-sm'
              )}
            >
              <span className="text-xl">✨</span>
              <div className="flex flex-col gap-px">
                <span className="text-xs font-medium text-foreground leading-tight">
                  5+ anos de experiência
                </span>
                <span className="text-[11px] text-muted-foreground">
                  em Conteúdo &amp; Visual
                </span>
              </div>
            </motion.div>

            {/* Badge de resultados */}
            <motion.div
              initial={{ opacity: 0, x: -12, y: -8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'absolute -top-3 -right-4 lg:-right-6',
                'flex items-center gap-2',
                'px-3 py-2 rounded-xl',
                'bg-accent text-accent-foreground',
                'shadow-[0_4px_16px_rgba(212,88,126,0.3)] dark:shadow-[0_4px_16px_rgba(201,169,110,0.2)]',
              )}
            >
              <span className="text-lg leading-none">🚀</span>
              <div className="flex flex-col gap-px">
                <span className="text-[11px] font-bold leading-tight">R$ 500k+</span>
                <span className="text-[10px] opacity-80">em tráfego gerenciado</span>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  )
}
