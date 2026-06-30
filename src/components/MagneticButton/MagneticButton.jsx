import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Wrapper magnético: el botón se "estira" levemente hacia el cursor
 * al acercarse, y vuelve suave a su posición cuando el mouse se aleja.
 * Uso: <MagneticButton><button className="btn-coral">...</button></MagneticButton>
 */
export default function MagneticButton({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const x = useSpring(rawX, { stiffness: 200, damping: 18, mass: 0.6 })
  const y = useSpring(rawY, { stiffness: 200, damping: 18, mass: 0.6 })

  function handleMouseMove(e) {
    const rect   = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width  / 2
    const centerY = rect.top  + rect.height / 2
    rawX.set((e.clientX - centerX) * strength)
    rawY.set((e.clientY - centerY) * strength)
  }

  function handleMouseLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: 'inline-block' }}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}
