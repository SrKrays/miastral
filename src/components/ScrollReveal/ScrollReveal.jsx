import { motion } from 'framer-motion'

/**
 * Wrapper de scroll-reveal reutilizable.
 * direction: 'up' | 'down' | 'left' | 'right' | 'scale'
 * delay: segundos
 * once: si la animación corre solo la primera vez que entra en viewport
 */
const VARIANTS = {
  up:    { hidden: { opacity: 0, y: 50 },  show: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -50 }, show: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -60 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 60 },  show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1 } },
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  once = true,
  className = '',
  as: Component = motion.div,
}) {
  const variant = VARIANTS[direction] || VARIANTS.up

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      variants={variant}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  )
}

/**
 * Wrapper para listas con stagger (cards apareciendo en cascada).
 * Usar StaggerGroup envolviendo varios StaggerItem.
 */
export function StaggerGroup({ children, className = '', staggerDelay = 0.12 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '', direction = 'up' }) {
  const variant = VARIANTS[direction] || VARIANTS.up
  return (
    <motion.div className={className} variants={variant} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}
