import { useEffect, useRef, useState } from 'react'

export function ParallaxElement({ speed = 0.5, children }) {
  const ref = useRef(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const elementTop = ref.current.getBoundingClientRect().top
        const windowHeight = window.innerHeight
        
        if (elementTop < windowHeight) {
          const progress = (windowHeight - elementTop) / windowHeight
          setOffset(progress * 100 * speed)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <div
      ref={ref}
      style={{
        transform: `translateY(${offset}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {children}
    </div>
  )
}
