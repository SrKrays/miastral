import { useEffect, useRef } from 'react'
import './Starfield.css'

export default function Starfield() {
  const canvasRef = useRef(null)
  const nodesRef  = useRef([])
  const rafRef    = useRef(null)
  const startRef  = useRef(null)   // timestamp del primer frame → animación de entrada

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width  = window.innerWidth
    let height = window.innerHeight
    let dpr    = Math.min(window.devicePixelRatio || 1, 2)

    const NODE_COLOR    = '#7894b5'
    const PULSE_COLOR   = '#e8735a'
    const CONNECT_DIST  = 160
    const INTRO_MS      = prefersReducedMotion ? 0 : 1600  // duración animación de entrada

    function resize() {
      width  = window.innerWidth
      height = window.innerHeight
      canvas.width        = width  * dpr
      canvas.height       = height * dpr
      canvas.style.width  = width  + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      generateNodes()
    }

    function generateNodes() {
      const count = Math.min(70, Math.max(28, Math.round((width * height) / 18000)))
      nodesRef.current = Array.from({ length: count }, () => ({
        x:          Math.random() * width,
        y:          Math.random() * height,
        vx:         (Math.random() - 0.5) * 0.38,
        vy:         (Math.random() - 0.5) * 0.38,
        r:          Math.random() * 2.2 + 1.2,
        pulse:      Math.random() * Math.PI * 2,
        pulseSpeed: 0.012 + Math.random() * 0.018,
        isActive:   Math.random() < 0.12,
      }))
    }

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3)
    }

    function draw(timestamp) {
      // inicializar timestamp en el primer frame
      if (!startRef.current) startRef.current = timestamp

      // progreso de la animación de entrada (0 → 1 en INTRO_MS ms)
      const elapsed  = timestamp - startRef.current
      const progress = INTRO_MS > 0 ? Math.min(elapsed / INTRO_MS, 1) : 1
      const eased    = easeOutCubic(progress)

      ctx.clearRect(0, 0, width, height)
      const nodes = nodesRef.current

      if (!prefersReducedMotion) {
        for (const n of nodes) {
          n.x += n.vx
          n.y += n.vy
          n.pulse += n.pulseSpeed
          if (n.x < 0 || n.x > width)  n.vx *= -1
          if (n.y < 0 || n.y > height) n.vy *= -1
        }
      }

      // ── LÍNEAS DE CONEXIÓN ────────────────────────────────────────────────
      // Durante la entrada: cada línea aparece escalonada según su par (i+j)
      // dando sensación de que la red "se forma" progresivamente.
      const totalPairs = nodes.length * (nodes.length - 1) / 2
      let pairIdx = 0

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          pairIdx++
          const dx   = nodes[i].x - nodes[j].x
          const dy   = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECT_DIST) {
            // progreso escalonado: cada línea "empieza" en un momento distinto
            const lineDelay    = (pairIdx / totalPairs) * 0.6   // 0..0.6
            const lineProgress = Math.max(0, Math.min((eased - lineDelay) / (1 - lineDelay), 1))

            const baseAlpha      = (1 - dist / CONNECT_DIST) * 0.35
            const isActivePair   = nodes[i].isActive || nodes[j].isActive
            const finalAlpha     = baseAlpha * lineProgress

            if (finalAlpha <= 0) continue

            // longitud de línea animada: empieza desde el nodo i y crece hacia j
            const px = nodes[i].x + (nodes[j].x - nodes[i].x) * lineProgress
            const py = nodes[i].y + (nodes[j].y - nodes[i].y) * lineProgress

            ctx.beginPath()
            ctx.strokeStyle = isActivePair
              ? `rgba(232,115,90,${finalAlpha * 0.7})`
              : `rgba(91,125,164,${finalAlpha})`
            ctx.lineWidth = isActivePair ? 0.8 : 0.5
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(px, py)
            ctx.stroke()
          }
        }
      }

      // ── NODOS ─────────────────────────────────────────────────────────────
      // Los nodos aparecen antes que las líneas (primeros 40% del easing)
      const nodeAlphaBase = Math.min(eased / 0.4, 1)

      for (const n of nodes) {
        const pulseFactor = 1 + Math.sin(n.pulse) * 0.3
        const radius      = n.r * pulseFactor

        if (n.isActive) {
          const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, radius * 5)
          halo.addColorStop(0, `rgba(232,115,90,${0.22 * nodeAlphaBase})`)
          halo.addColorStop(1, 'rgba(232,115,90,0)')
          ctx.beginPath()
          ctx.fillStyle = halo
          ctx.arc(n.x, n.y, radius * 5, 0, Math.PI * 2)
          ctx.fill()

          ctx.beginPath()
          ctx.fillStyle  = PULSE_COLOR
          ctx.globalAlpha = (0.85 + Math.sin(n.pulse) * 0.15) * nodeAlphaBase
          ctx.arc(n.x, n.y, radius, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.beginPath()
          ctx.fillStyle   = NODE_COLOR
          ctx.globalAlpha = (0.45 + Math.sin(n.pulse) * 0.2) * nodeAlphaBase
          ctx.arc(n.x, n.y, radius, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.globalAlpha = 1
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="starfield-canvas" aria-hidden="true" />
}
