import { createContext, useState, useEffect, useCallback } from 'react'
import { API_URL } from '../config/api'

// Contenido "editable" del sitio (fotos y videos que Vale puede reemplazar
// sola desde el panel admin: Sobre mí, Diseño Humano, video de bienvenida
// del Home, miniaturas de Material Gratuito, etc.).
//
// Se pide una sola vez al arrancar la app, público, sin login — es apenas
// un mapa { clave: url }. Si una clave todavía no fue cargada por Vale,
// simplemente no está en el mapa y cada página usa su valor por defecto.
export const ContenidoContext = createContext({ contenido: {}, loading: true, recargar: () => {} })

export function ContenidoProvider({ children }) {
  const [contenido, setContenido] = useState({})
  const [loading, setLoading] = useState(true)

  const cargar = useCallback(() => {
    setLoading(true)
    fetch(`${API_URL}/api/contenido`)
      .then(res => (res.ok ? res.json() : {}))
      .then(data => setContenido(data && typeof data === 'object' ? data : {}))
      .catch(() => setContenido({}))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { cargar() }, [cargar])

  return (
    <ContenidoContext.Provider value={{ contenido, loading, recargar: cargar }}>
      {children}
    </ContenidoContext.Provider>
  )
}
