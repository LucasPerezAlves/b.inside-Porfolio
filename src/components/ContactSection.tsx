// TODO: integrar com backend (EmailJS, Resend, Formspree, etc.)
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Mail, ArrowUpRight, ExternalLink, Send, Check } from 'lucide-react'
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
  const [form, setForm]           = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const whatsappSocial  = profile.socials.find(s => s.platform === 'whatsapp')
  const emailSocial     = profile.socials.find(s => s.platform === 'email')
  const instagramSocial = profile.socials.find(s => s.platform === 'instagram')

  const whatsappUrl     = whatsappSocial?.url    ?? '#'
  const email           = emailSocial?.handle    ?? 'ed.kailany@gmail.com'
  const instagramUrl    = instagramSocial?.url   ?? '#'
  const instagramHandle = instagramSocial?.handle ?? '@b.inside'

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
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Divisor de seção */}
      <div className="portfolio-container">
        <div className="h-px divider-fade" />
      </div>

      {/* ── Conteúdo principal ── */}
      <div className="portfolio-container py-16 lg:py-24">
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
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={cn(
                'inline-flex items-center gap-3',
                'px-8 py-4 rounded-2xl',
                'text-base font-medium',
                'bg-foreground text-background',
                'hover:opacity-90',
                'transition-opacity duration-200',
                'shadow-[0_8px_32px_rgba(0,0,0,0.12)]',
                'dark:shadow-[0_8px_40px_rgba(255,255,255,0.04),0_0_0_1px_rgba(255,255,255,0.08)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4',
              )}
            >
              <MessageCircle size={19} strokeWidth={1.75} />
              Falar no WhatsApp
              <ArrowUpRight size={16} strokeWidth={2} />
            </motion.a>
          </motion.div>

          {/* ── Links secundários ── */}
          <motion.div
            variants={fadeUp}
            className="mt-7 flex items-center justify-center flex-wrap gap-3"
          >
            {/* Link de e-mail — abre cliente de e-mail nativo via mailto */}
            <motion.a
              href={`mailto:${email}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={cn(
                'inline-flex items-center gap-2',
                'px-4 py-2.5 rounded-full',
                'border border-border',
                'text-sm font-mono text-muted-foreground',
                'hover:border-accent/40 hover:text-foreground',
                'transition-[color,border-color] duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              )}
            >
              <Mail size={13} strokeWidth={1.75} />
              {email}
            </motion.a>

            <span className="text-border/60" aria-hidden>·</span>

            {/* Link Instagram */}
            <motion.a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={cn(
                'inline-flex items-center gap-2',
                'px-4 py-2.5 rounded-full',
                'border border-border',
                'text-sm text-muted-foreground',
                'hover:border-accent/40 hover:text-foreground',
                'transition-[color,border-color] duration-200 group/ig',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20" height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              {instagramHandle.replace('@', '')}
              <ExternalLink
                size={11}
                strokeWidth={1.75}
                className="opacity-0 group-hover/ig:opacity-60 transition-opacity duration-150"
              />
            </motion.a>
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

          {/* ── Formulário de contato ── */}
          <motion.div
            variants={fadeUp}
            className="mt-12 w-full max-w-lg mx-auto text-left"
          >
            <div className="h-px divider-fade mb-10" />

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center gap-3 py-12 text-center"
                >
                  <span className="w-10 h-10 rounded-full bg-emerald-950/60 border border-emerald-500/25 flex items-center justify-center">
                    <Check size={18} strokeWidth={2} className="text-emerald-400" />
                  </span>
                  <p className="text-base text-foreground font-medium">
                    Mensagem recebida! Responderei em até 24h 🖤
                  </p>
                  <button
                    onClick={() => { setForm({ name: '', email: '', message: '' }); setSubmitted(false) }}
                    className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-150 underline underline-offset-4"
                  >
                    Enviar outra mensagem
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                >
                  {/* Nome */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="text-[11px] uppercase tracking-label font-medium text-muted-foreground/70">
                      Nome *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Seu nome"
                      className={cn(
                        'w-full px-4 py-3 rounded-xl',
                        'bg-transparent border border-border',
                        'text-sm text-foreground placeholder:text-muted-foreground/40',
                        'focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20',
                        'transition-colors duration-150',
                      )}
                    />
                  </div>

                  {/* E-mail */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-email" className="text-[11px] uppercase tracking-label font-medium text-muted-foreground/70">
                      E-mail *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="seu@email.com"
                      className={cn(
                        'w-full px-4 py-3 rounded-xl',
                        'bg-transparent border border-border',
                        'text-sm text-foreground placeholder:text-muted-foreground/40',
                        'focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20',
                        'transition-colors duration-150',
                      )}
                    />
                  </div>

                  {/* Mensagem */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-message" className="text-[11px] uppercase tracking-label font-medium text-muted-foreground/70">
                      Mensagem *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Conte um pouco sobre o seu projeto..."
                      className={cn(
                        'w-full px-4 py-3 rounded-xl resize-none',
                        'bg-transparent border border-border',
                        'text-sm text-foreground placeholder:text-muted-foreground/40',
                        'focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20',
                        'transition-colors duration-150',
                      )}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className={cn(
                      'mt-1 inline-flex items-center justify-center gap-2',
                      'px-6 py-3 rounded-xl',
                      'bg-foreground text-background text-sm font-medium',
                      'hover:opacity-90 active:scale-[0.98]',
                      'transition-[opacity,transform] duration-200',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    )}
                  >
                    Enviar mensagem
                    <Send size={13} strokeWidth={2} />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
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

        {/* ── Créditos do desenvolvedor — card fixo mobile-first ── */}
        <div className="portfolio-container pb-6">
          <div className="h-px bg-border/20 mb-5" />

          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              // Mobile: coluna centralizada | Desktop: linha alinhada à esquerda
              'group w-full flex flex-col sm:flex-row',
              'items-center sm:items-start',
              'gap-4 p-5 sm:p-4',
              'rounded-2xl cursor-default select-none',
              // Light
              'bg-neutral-50 border border-neutral-200/60',
              // Dark
              'dark:bg-[#0c0b0e] dark:border-neutral-800',
            )}
          >
            {/* ── Foto ── */}
            {/* Mobile: 80×80 centralizado | Desktop: 68×68 à esquerda */}
            <div className={cn(
              'flex-shrink-0 overflow-hidden rounded-xl',
              'w-20 h-20 sm:w-[68px] sm:h-[68px]',
              'bg-neutral-200 dark:bg-neutral-800',
            )}>
              <img
                src={imgUrl('/images/criador.jpeg')}
                alt="Lucas Perez"
                className={cn(
                  'w-full h-full object-cover object-center',
                  'grayscale transition-all duration-500 ease-out',
                  'group-hover:grayscale-0',
                )}
                onError={e => {
                  const p = e.currentTarget.parentElement
                  if (p) p.style.background = 'var(--muted)'
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>

            {/* ── Conteúdo ── */}
            {/* Mobile: centralizado | Desktop: alinhado à esquerda */}
            <div className={cn(
              'flex-1 min-w-0 flex flex-col gap-1',
              'items-center text-center',
              'sm:items-start sm:text-left',
            )}>

              <p className="text-[10px] uppercase tracking-[0.09em] font-medium text-neutral-400 dark:text-neutral-500">
                Design &amp; Engenharia de Software
              </p>

              <p className="font-semibold text-[0.875rem] leading-tight text-neutral-900 dark:text-white">
                Lucas Perez
              </p>

              <p className="text-[11px] leading-snug text-neutral-600 dark:text-neutral-300">
                Software Developer · Especialista em Manutenção de Sistemas
              </p>

              {/* Bio — visível a partir de sm */}
              <p className="hidden sm:block text-[11px] leading-[1.72] text-neutral-600 dark:text-neutral-400 mt-1">
                Mente técnica por trás da engenharia deste portfólio, transformando
                designs complexos e visões de negócios em código performático, fluido e pixel-perfect.
              </p>

              <a
                href="https://github.com/LucasPerezAlves"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center gap-1 mt-2',
                  'text-[11px] font-medium',
                  'text-neutral-400 dark:text-neutral-500',
                  'hover:text-neutral-900 dark:hover:text-white',
                  'transition-colors duration-150 group/gh',
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
          </motion.div>
        </div>
      </footer>

    </section>
  )
}
