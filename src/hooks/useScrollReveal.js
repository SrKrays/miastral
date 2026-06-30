import { useEffect, useRef } from 'react'

export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const { threshold = 0.1, delay = 0 } = options

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('scroll-revealed')
        }, delay)
      }
    }, { threshold })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, delay])

  return ref
}
