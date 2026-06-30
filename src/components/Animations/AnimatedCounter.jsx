import { useState, useEffect, useRef } from 'react'

export function AnimatedCounter({ from = 0, to, duration = 2, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(from)
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true
        const start = Date.now()
        
        const animate = () => {
          const elapsed = (Date.now() - start) / 1000
          const progress = Math.min(elapsed / duration, 1)
          const current = Math.floor(from + (to - from) * progress)
          setCount(current)

          if (progress < 1) requestAnimationFrame(animate)
        }

        animate()
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.5 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [from, to, duration])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString('es-AR')}{suffix}
    </span>
  )
}
