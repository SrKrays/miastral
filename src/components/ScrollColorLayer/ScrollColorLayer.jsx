import { useEffect, useRef } from 'react'
import './ScrollColorLayer.css'

/**
 * Capa fija detrás de todo el contenido que oscurece el fondo
 * a medida que el usuario scrollea — sin tocar ninguna sección existente.
 * Va desde el azul medio de la paleta (top) hasta casi negro (bottom).
 */
export default function ScrollColorLayer() {
  const layerRef = useRef(null)

  useEffect(() => {
    const layer = layerRef.current

    // colores de la paleta del cliente (de un azul oscuro a casi negro)
    const COLOR_TOP    = { r: 21,  g: 29,  b: 39  }  // azul más oscuro que --c-800, para que las líneas resalten más
    const COLOR_BOTTOM = { r: 9,   g: 13,  b: 16  }  // --c-950

    function lerp(a, b, t) { return a + (b - a) * t }

    function onScroll() {
      const scrollY   = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (maxScroll <= 0) return

      const t = Math.min(scrollY / maxScroll, 1)

      const r = Math.round(lerp(COLOR_TOP.r, COLOR_BOTTOM.r, t))
      const g = Math.round(lerp(COLOR_TOP.g, COLOR_BOTTOM.g, t))
      const b = Math.round(lerp(COLOR_TOP.b, COLOR_BOTTOM.b, t))

      layer.style.backgroundColor = `rgb(${r},${g},${b})`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // estado inicial

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div ref={layerRef} className="scroll-color-layer" aria-hidden="true" />
}
