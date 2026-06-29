import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

const SPRING = { type: 'spring' as const, stiffness: 55, damping: 22 }

/**
 * RevealLine — clip-mask slide-up para títulos e labels curtos.
 * O conteúdo sobe de dentro de um container overflow:hidden,
 * criando o efeito de "surgir por baixo de uma linha invisível".
 */
export function RevealLine({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden', display: 'block' }}>
      <motion.div
        initial={{ opacity: 0, y: 44 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 44 }}
        transition={{ ...SPRING, delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/**
 * RevealWords — divide uma string em palavras e revela cada uma
 * individualmente com física de mola escalonada.
 * Ideal para parágrafos e subtítulos.
 */
export function RevealWords({
  text,
  delay = 0,
  stagger = 0.04,
  className,
}: {
  text: string
  delay?: number
  stagger?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <span ref={ref} className={className}>
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          style={{
            display:       'inline-block',
            overflow:      'hidden',
            verticalAlign: 'bottom',
            marginRight:   '0.3em',
          }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ ...SPRING, delay: delay + i * stagger }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
