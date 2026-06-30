import { useEffect, useRef } from 'react'
import './Starfield.css'

export default function Starfield() {
  const canvasRef = useRef(null)
  const nodesRef  = useRef([])
  const rafRef    = useRef(null)
  const startRef  = useRef(null)   // timestamp del primer frame → animación de entrada
  const lastRef   = useRef(null)   // timestamp del frame anterior → delta time

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width  = window.innerWidth
    let height = window.innerHeight
    let dpr    = Math.min(window.devicePixelRatio || 1, 2)

    const NODE_COLOR     = '#8fa9c9'
    const PULSE_COLOR    = '#e8735a'
    const CONNECT_MIN    = 90    // distancia mínima de conexión (red más "desalineada")
    const CONNECT_MAX    = 230   // distancia máxima de conexión (red más "alineada")
    const BREATHE_SPEED  = 0.00035 // velocidad del pulso de alineación/desalineación
    const INTRO_MS       = prefersReducedMotion ? 0 : 1600  // duración animación de entrada
    const FADE_IN_MS     = 900
    const FADE_OUT_MS    = 1100

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

    function makeNode(spawning = false) {
      return {
        x:          Math.random() * width,
        y:          Math.random() * height,
        vx:         (Math.random() - 0.5) * 0.55,
        vy:         (Math.random() - 0.5) * 0.55,
        r:          Math.random() * 2.3 + 1.2,
        pulse:      Math.random() * Math.PI * 2,
        pulseSpeed: 0.012 + Math.random() * 0.018,
        isActive:   Math.random() < 0.16,
        life:       0,
        maxLife:    6000 + Math.random() * 9000,
        fadePhase:  spawning ? 'in' : 'alive',
        fadeAlpha:  spawning ? 0 : 1,
      }
    }

    function generateNodes() {
      const count = Math.min(72, Math.max(30, Math.round((width * height) / 17000)))
      nodesRef.current = Array.from({ length: count }, () => makeNode(false))
    }

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3)
    }

    function draw(timestamp) {
      // inicializar timestamps en el primer frame
      if (!startRef.current) startRef.current = timestamp
      if (!lastRef.current)  lastRef.current  = timestamp
      const dt = Math.min(timestamp - lastRef.current, 64) // clamp por si la pestaña estuvo en pausa
      lastRef.current = timestamp

      // progreso de la animación de entrada (0 → 1 en INTRO_MS ms)
      const elapsed  = timestamp - startRef.current
      const progress = INTRO_MS > 0 ? Math.min(elapsed / INTRO_MS, 1) : 1
      const eased    = easeOutCubic(progress)

      // pulso de "alineación / desalineación": la distancia de conexión respira
      const breathe = (Math.sin(timestamp * BREATHE_SPEED) + 1) / 2
      const connectDist = CONNECT_MIN + breathe * (CONNECT_MAX - CONNECT_MIN)

      ctx.clearRect(0, 0, width, height)
      const nodes = nodesRef.current

      if (!prefersReducedMotion) {
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i]
          n.x += n.vx
          n.y += n.vy
          n.pulse += n.pulseSpeed
          if (n.x < 0 || n.x > width)  n.vx *= -1
          if (n.y < 0 || n.y > height) n.vy *= -1

          // ciclo de vida: cada nodo nace, vive y se desvanece para que
          // nazcan otros nuevos en su lugar → la red nunca se queda quieta
          n.life += dt
          if (n.fadePhase === 'in') {
            n.fadeAlpha = Math.min(1, n.fadeAlpha + dt / FADE_IN_MS)
            if (n.fadeAlpha >= 1) n.fadePhase = 'alive'
          } else if (n.fadePhase === 'alive' && n.life > n.maxLife) {
            n.fadePhase = 'out'
          } else if (n.fadePhase === 'out') {
            n.fadeAlpha = Math.max(0, n.fadeAlpha - dt / FADE_OUT_MS)
            if (n.fadeAlpha <= 0) nodes[i] = makeNode(true)
          }
        }
      }

      // ── LÍNEAS DE CONEXIÓN ────────────────────────────────────────────────
      // Durante la entrada: cada línea aparece escalonada según su par (i+j)
      // dando sensación de que la red "se forma" progresivamente.
      // Luego de la entrada, la distancia de conexión respira (connectDist)
      // haciendo que la red entera se alinee y desalinee con el tiempo.
      const totalPairs = nodes.length * (nodes.length - 1) / 2
      let pairIdx = 0

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          pairIdx++
          const ni = nodes[i], nj = nodes[j]
          const dx   = ni.x - nj.x
          const dy   = ni.y - nj.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectDist) {
            // progreso escalonado: cada línea "empieza" en un momento distinto
            const lineDelay    = (pairIdx / totalPairs) * 0.6   // 0..0.6
            const lineProgress = Math.max(0, Math.min((eased - lineDelay) / (1 - lineDelay), 1))

            const baseAlpha      = (1 - dist / connectDist) * 0.5
            const isActivePair   = ni.isActive || nj.isActive
            const fadeMul        = ni.fadeAlpha * nj.fadeAlpha
            const finalAlpha     = baseAlpha * lineProgress * fadeMul

            if (finalAlpha <= 0.005) continue

            // longitud de línea animada: empieza desde el nodo i y crece hacia j
            const px = ni.x + (nj.x - ni.x) * lineProgress
            const py = ni.y + (nj.y - ni.y) * lineProgress

            ctx.beginPath()
            ctx.strokeStyle = isActivePair
              ? `rgba(232,115,90,${finalAlpha * 0.8})`
              : `rgba(143,169,201,${finalAlpha})`
            ctx.lineWidth = isActivePair ? 1 : 0.6
            ctx.moveTo(ni.x, ni.y)
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
        const lifeAlpha    = n.fadeAlpha

        if (n.isActive) {
          const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, radius * 5.5)
          halo.addColorStop(0, `rgba(232,115,90,${0.26 * nodeAlphaBase * lifeAlpha})`)
          halo.addColorStop(1, 'rgba(232,115,90,0)')
          ctx.beginPath()
          ctx.fillStyle = halo
          ctx.arc(n.x, n.y, radius * 5.5, 0, Math.PI * 2)
          ctx.fill()

          ctx.beginPath()
          ctx.fillStyle  = PULSE_COLOR
          ctx.globalAlpha = (0.85 + Math.sin(n.pulse) * 0.15) * nodeAlphaBase * lifeAlpha
          ctx.arc(n.x, n.y, radius, 0, Math.PI * 2)
          ctx.fill()
        } else {
          const haloSoft = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, radius * 3)
          haloSoft.addColorStop(0, `rgba(143,169,201,${0.12 * nodeAlphaBase * lifeAlpha})`)
          haloSoft.addColorStop(1, 'rgba(143,169,201,0)')
          ctx.beginPath()
          ctx.fillStyle = haloSoft
          ctx.arc(n.x, n.y, radius * 3, 0, Math.PI * 2)
          ctx.fill()

          ctx.beginPath()
          ctx.fillStyle   = NODE_COLOR
          ctx.globalAlpha = (0.5 + Math.sin(n.pulse) * 0.2) * nodeAlphaBase * lifeAlpha
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
