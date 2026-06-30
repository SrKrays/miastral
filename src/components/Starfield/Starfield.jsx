import { useEffect, useRef } from 'react'
import './Starfield.css'

/**
 * Fondo de estrellas fijo, vive detrás de toda la app.
 * Solo se ve donde las secciones tienen fondo oscuro/transparente
 * (las secciones claras lo tapan, que es el comportamiento esperado).
 */
export default function Starfield() {
  const canvasRef = useRef(null)
  const starsRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = window.innerWidth
    let height = window.innerHeight
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const palette = ['#ffffff', '#d1dbe6', '#b3c3d5', '#e8735a']

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      generateStars()
    }

    function generateStars() {
      const area = width * height
      const count = Math.min(220, Math.max(80, Math.round(area / 9000)))
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.3 + 0.3,
        baseAlpha: Math.random() * 0.35 + 0.15,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.008,
        color: palette[Math.random() < 0.92 ? Math.floor(Math.random() * 3) : 3],
        parallax: Math.random() * 0.5 + 0.15,
        flareEvery: Math.random() * 400 + 200, // cada cuánto "destella" fuerte
        flareOffset: Math.random() * 600,
      }))
    }

    function handleMouseMove(e) {
      mouseRef.current.x = (e.clientX / width) - 0.5
      mouseRef.current.y = (e.clientY / height) - 0.5
    }

    let t = 0
    function draw() {
      ctx.clearRect(0, 0, width, height)
      t += 1
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (const star of starsRef.current) {
        // titileo base, siempre activo (prende y apaga solo, sin depender del mouse)
        const baseTwinkle = prefersReducedMotion
          ? star.baseAlpha
          : star.baseAlpha + Math.sin(t * star.speed + star.phase) * 0.3

        // destello ocasional: cada tanto la estrella brilla fuerte un instante
        let flareBoost = 0
        let flareSizeBoost = 0
        if (!prefersReducedMotion) {
          const cycle = (t + star.flareOffset) % star.flareEvery
          if (cycle < 18) {
            const flareT = cycle / 18 // 0 -> 1
            const pulse = Math.sin(flareT * Math.PI) // sube y baja suave
            flareBoost = pulse * 0.65
            flareSizeBoost = pulse * 1.1
          }
        }

        const alpha = Math.max(0, Math.min(1, baseTwinkle + flareBoost))
        const radius = star.r + flareSizeBoost

        const offsetX = mx * 18 * star.parallax
        const offsetY = my * 18 * star.parallax

        ctx.beginPath()
        ctx.fillStyle = flareBoost > 0.3 ? '#ffffff' : star.color
        ctx.globalAlpha = alpha
        ctx.arc(star.x + offsetX, star.y + offsetY, radius, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="starfield-canvas" aria-hidden="true" />
}
