import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * Wrapper de tilt 3D: la card rota levemente en perspectiva siguiendo el cursor.
 * Uso: <TiltCard><div className="product-card">...</div></TiltCard>
 */
export default function TiltCard({ children, maxTilt = 10, className = '' }) {
  const ref   = useRef(null)

  const rawX  = useMotionValue(0)
  const rawY  = useMotionValue(0)

  const springX = useSpring(rawX, { stiffness: 150, damping: 20, mass: 0.5 })
  const springY = useSpring(rawY, { stiffness: 150, damping: 20, mass: 0.5 })

  const rotateX = useTransform(springY, [-0.5, 0.5], [ maxTilt, -maxTilt])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-maxTilt,  maxTilt])

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width  - 0.5)
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5)
  }

  function handleMouseLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}
