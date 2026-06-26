import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Mail, AtSign, ArrowUpRight, Check, ExternalLink } from 'lucide-react'
import { profile } from '@/data/portfolioData'
import { cn, imgUrl } from '@/lib/utils'

// ── Animações ─────────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

// ── ContactSection ────────────────────────────────────────────────────────────

export function ContactSection() {
  const [emailCopied,  setEmailCopied]  = useState(false)
  const [devCardOpen,  setDevCardOpen]  = useState(false)
  const devCardTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const handleDevMouseEnter = () => {
    clearTimeout(devCardTimer.current)
    setDevCardOpen(true)
  }
  const handleDevMouseLeave = () => {
    devCardTimer.current = setTimeout(() => setDevCardOpen(false), 180)
  }

  const whatsappSocial  = profile.socials.find(s => s.platform === 'whatsapp')
  const emailSocial     = profile.socials.find(s => s.platform === 'email')
  const instagramSocial = profile.socials.find(s => s.platform === 'instagram')

  const whatsappUrl     = whatsappSocial?.url    ?? '#'
  const email           = emailSocial?.handle    ?? 'contato@edkaii.com.br'
  const instagramUrl    = instagramSocial?.url   ?? '#'
  const instagramHandle = instagramSocial?.handle ?? '@b.insidee'

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2200)
    } catch {}
  }

  return (
    <section id="contato" className="relative overflow-hidden bg-background">

      {/* ── Decoração de fundo (espelha a hero, cria bookend visual) ── */}
      <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-40 -right-24 w-[50vw] h-[50vw] max-w-2xl max-h-2xl rounded-full blur-[130px] opacity-[0.1] dark:opacity-[0.05] bg-accent" />
        <div className="absolute top-0 left-0 w-[30vw] h-[30vw] max-w-xl max-h-xl rounded-full blur-[100px] opacity-[0.06] dark:opacity-[0.03] bg-accent" />
        {/* Grade de pontos — apenas modo light */}
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(212,88,126,0.05) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Divisor de seção */}
      <div className="portfolio-container">
        <div className="h-px divider-fade" />
      </div>

      {/* ── Conteúdo principal ── */}
      <div className="portfolio-container py-32 lg:py-48">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-4xl mx-auto text-center"
        >

          {/* Label da seção */}
          <motion.div variants={fadeUp}>
            <span className="text-[11px] uppercase tracking-label font-medium text-muted-foreground">
              04 — Contato
            </span>
          </motion.div>

          {/* ── Título provocativo ── */}
          <motion.h2
            variants={fadeUp}
            className={cn(
              'font-serif font-light tracking-editorial leading-[1.05]',
              'text-display-xl lg:text-display-2xl',
              'text-foreground mt-6 mb-0'
            )}
          >
            Pronta para elevar
            <br />
            o posicionamento
            <br />
            <span className="italic text-accent">da sua marca?</span>
          </motion.h2>

          {/* Subtítulo */}
          <motion.p
            variants={fadeUp}
            className="text-base lg:text-lg text-muted-foreground mt-8 max-w-[46ch] mx-auto leading-relaxed"
          >
            Transformamos estratégia em crescimento mensurável.
            Vamos conversar sobre o próximo nível da sua presença digital.
          </motion.p>

          {/* ── CTA primário ── */}
          {/* bg-foreground = #1A1118 em light (botão escuro/autoridade)
                           = #FAFAFA em dark (botão branco/luxo monochrome) */}
          <motion.div variants={fadeUp} className="mt-10">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-3',
                'px-8 py-4 rounded-2xl',
                'text-base font-medium',
                'bg-foreground text-background',
                'hover:opacity-90 active:scale-[0.98]',
                'transition-all duration-200',
                'shadow-[0_8px_32px_rgba(0,0,0,0.12)]',
                'dark:shadow-[0_8px_40px_rgba(255,255,255,0.04),0_0_0_1px_rgba(255,255,255,0.08)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4'
              )}
            >
              <MessageCircle size={19} strokeWidth={1.75} />
              Falar no WhatsApp
              <ArrowUpRight size={16} strokeWidth={2} />
            </a>
          </motion.div>

          {/* ── Links secundários ── */}
          <motion.div
            variants={fadeUp}
            className="mt-7 flex items-center justify-center flex-wrap gap-3"
          >
            {/* Botão copiar e-mail */}
            <button
              onClick={handleCopyEmail}
              title="Clique para copiar o e-mail"
              className={cn(
                'inline-flex items-center gap-2',
                'px-4 py-2.5 rounded-full',
                'border border-border',
                'text-sm font-mono text-muted-foreground',
                'hover:border-accent/40 hover:text-foreground',
                'active:scale-[0.98]',
                'transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                emailCopied && 'border-accent/40 text-accent bg-accent-subtle/50'
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                {emailCopied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="inline-flex items-center gap-2 text-accent font-sans font-medium"
                  >
                    <Check size={13} strokeWidth={2.5} />
                    Copiado!
                  </motion.span>
                ) : (
                  <motion.span
                    key="email"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="inline-flex items-center gap-2"
                  >
                    <Mail size={13} strokeWidth={1.75} />
                    {email}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <span className="text-border/60" aria-hidden>·</span>

            {/* Link Instagram */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-2',
                'px-4 py-2.5 rounded-full',
                'border border-border',
                'text-sm text-muted-foreground',
                'hover:border-accent/40 hover:text-foreground',
                'transition-all duration-200 group/ig',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              )}
            >
              <AtSign size={13} strokeWidth={1.75} />
              {instagramHandle}
              <ExternalLink
                size={11}
                strokeWidth={1.75}
                className="opacity-0 group-hover/ig:opacity-60 transition-opacity duration-150"
              />
            </a>
          </motion.div>

          {/* Micro-detalhe: disponibilidade */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex items-center justify-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-muted-foreground/70">
              {profile.availability} — respondo em até 24h
            </span>
          </motion.div>

        </motion.div>
      </div>

      {/* ── Footer bar ── */}
      <footer className="border-t border-border" role="contentinfo">
        <div className={cn(
          'portfolio-container py-5',
          'flex items-center justify-between flex-wrap gap-3'
        )}>
          <span className="text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} b.inside. Todos os direitos reservados.
          </span>

          <div className="flex items-center gap-4">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors duration-150"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com/in/ed-kaii"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors duration-150"
            >
              LinkedIn
            </a>
            <span className="text-xs text-muted-foreground/40">
              Feito com{' '}
              <span className="text-accent" aria-label="amor">♥</span>
            </span>
          </div>
        </div>

        {/* ── Créditos do desenvolvedor ── */}
        <div className="portfolio-container pb-5">
          <div className="h-px bg-border/20 mb-4" />

          <div className="flex justify-center">
            <p className="text-[11px] text-muted-foreground/35 tracking-wide select-none">
              Design &amp; Engenharia de Software por{' '}

              {/* Trigger do hover card */}
              <span
                className="relative inline-block"
                onMouseEnter={handleDevMouseEnter}
                onMouseLeave={handleDevMouseLeave}
              >
                <button
                  onClick={() => setDevCardOpen(v => !v)}
                  className={cn(
                    'text-muted-foreground/55 transition-colors duration-200',
                    'hover:text-muted-foreground/85',
                    'underline underline-offset-2 decoration-muted-foreground/20',
                    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm'
                  )}
                  aria-label="Ver perfil do desenvolvedor Lucas Perez"
                  aria-expanded={devCardOpen}
                >
                  Lucas Perez
                </button>

                {/* ── Developer Card ── */}
                <AnimatePresence>
                  {devCardOpen && (
                    <motion.div
                      role="tooltip"
                      aria-label="Perfil de Lucas Perez"
                      onMouseEnter={handleDevMouseEnter}
                      onMouseLeave={handleDevMouseLeave}
                      initial={{ opacity: 0, scale: 0.96, y: 10 }}
                      animate={{ opacity: 1, scale: 1,    y: 0  }}
                      exit={{    opacity: 0, scale: 0.96, y: 8  }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(
                        // Posicionamento: flutua acima do trigger
                        'absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-50',
                        'w-[296px]',
                        // Forma
                        'rounded-2xl overflow-visible',
                        // Light
                        'bg-background border border-border',
                        'shadow-[0_8px_32px_rgba(0,0,0,0.09),0_2px_8px_rgba(0,0,0,0.05)]',
                        // Dark
                        'dark:bg-[#0c0b0e]',
                        'dark:shadow-[0_8px_48px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.07)]',
                      )}
                    >
                      {/* Foto — grayscale → cor */}
                      <div className="relative h-28 overflow-hidden rounded-t-2xl bg-muted/50">
                        <motion.img
                          src={imgUrl('/images/criador.jpeg')}
                          alt="Lucas Perez — Software Developer"
                          className="w-full h-full object-cover object-top"
                          initial={{ filter: 'grayscale(100%)' }}
                          animate={{ filter: 'grayscale(0%)'  }}
                          transition={{ delay: 0.12, duration: 0.55, ease: 'easeOut' }}
                          onError={e => {
                            // Placeholder elegante se a imagem ainda não existir
                            const el = e.currentTarget
                            el.style.display = 'none'
                          }}
                        />
                        {/* Gradiente de profundidade na base da foto */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/70 dark:from-[#0c0b0e]/90 to-transparent pointer-events-none" />
                      </div>

                      {/* Conteúdo */}
                      <div className="px-5 pt-3.5 pb-4 flex flex-col gap-2.5">
                        <div>
                          <p className="font-semibold text-[0.875rem] text-foreground leading-snug">
                            Lucas Perez
                          </p>
                          <p className="text-[11px] text-muted-foreground/60 mt-0.5 leading-snug">
                            Software Developer · Manutenção de Sistemas
                          </p>
                        </div>

                        <p className="text-[11.5px] text-muted-foreground/70 leading-[1.72]">
                          Mente técnica por trás da engenharia deste portfólio,
                          transformando designs complexos e visões de negócios em
                          código performático, fluido e pixel-perfect.
                        </p>

                        <a
                          href="https://github.com/LucasPerezAlves"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            'inline-flex items-center gap-1.5 w-fit',
                            'text-[11px] font-medium',
                            'text-muted-foreground/55 hover:text-foreground',
                            'transition-colors duration-150 group/gh'
                          )}
                        >
                          <span>Ver no GitHub</span>
                          <ArrowUpRight
                            size={11}
                            strokeWidth={2}
                            className="transition-transform duration-150 group-hover/gh:translate-x-0.5 group-hover/gh:-translate-y-0.5"
                          />
                        </a>
                      </div>

                      {/* Triângulo apontando para o nome (seta tooltip) */}
                      <div className={cn(
                        'absolute -bottom-[5px] left-1/2 -translate-x-1/2',
                        'w-[10px] h-[10px] rotate-45',
                        'bg-background border-r border-b border-border',
                        'dark:bg-[#0c0b0e] dark:border-border',
                      )} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </span>
            </p>
          </div>
        </div>
      </footer>

    </section>
  )
}
