import { useState, useEffect, useContext } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { AuthContext } from '../context/AuthContext'
import { API_URL } from '../config/api'
import './Carrito.css'

const formatARS = (n) => `$${Number(n || 0).toLocaleString('es-AR')}`

const ESTADO_INFO = {
  pagado: {
    icon: '✓',
    title: '¡Pago confirmado!',
    desc: (orden) => `Tu pedido #${orden.id} por ${formatARS(orden.total)} quedó pagado. Nos vamos a poner en contacto para coordinar el envío.`,
  },
  pendiente: {
    icon: '⏳',
    title: 'Estamos confirmando tu pago',
    desc: (orden) => `Tu pedido #${orden.id} quedó registrado. Mercado Pago todavía está procesando el pago — te vamos a avisar por mail apenas se confirme.`,
  },
  cancelado: {
    icon: '✕',
    title: 'El pago no se pudo completar',
    desc: (orden) => `Tu pedido #${orden.id} quedó guardado, pero el pago no se acreditó. Podés volver al carrito para reintentarlo.`,
  },
}

export default function ConfirmacionPedido() {
  const [searchParams] = useSearchParams()
  const { token } = useContext(AuthContext)
  const ordenId = searchParams.get('orden')
  const [orden, setOrden] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!ordenId || !token) { setLoading(false); setError(true); return }
    let cancelado = false
    let intentos = 0

    const consultar = async () => {
      try {
        const res = await fetch(`${API_URL}/api/pagos/ordenes/${ordenId}/estado`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error()
        const data = await res.json()
        if (cancelado) return

        // El webhook de MercadoPago puede tardar unos segundos en llegar — si todavía
        // figura "pendiente" reintentamos unas cuantas veces antes de resignarnos a
        // mostrar el estado "en proceso" tal cual.
        if (data.estado === 'pendiente' && intentos < 5) {
          intentos++
          setTimeout(consultar, 2000)
          return
        }
        setOrden(data)
        setLoading(false)
      } catch {
        if (!cancelado) { setError(true); setLoading(false) }
      }
    }
    consultar()
    return () => { cancelado = true }
  }, [ordenId, token])

  const info = orden ? (ESTADO_INFO[orden.estado] || ESTADO_INFO.pendiente) : null

  return (
    <>
      <Navbar />
      <section className="confirm-section">
        <div className="confirm-card anim-scaleIn">
          {loading ? (
            <>
              <div className="confirm-icon">⏳</div>
              <h2 className="confirm-title">Confirmando tu pago...</h2>
              <p className="confirm-desc">Esto puede tardar unos segundos.</p>
            </>
          ) : error || !orden ? (
            <>
              <div className="confirm-icon">?</div>
              <h2 className="confirm-title">No pudimos confirmar el estado del pedido</h2>
              <p className="confirm-desc">Si ya pagaste, no te preocupes — nos vamos a poner en contacto igual. Si tenés dudas, escribinos.</p>
            </>
          ) : (
            <>
              <div className="confirm-icon">{info.icon}</div>
              <h2 className="confirm-title">{info.title}</h2>
              <p className="confirm-desc">{info.desc(orden)}</p>
            </>
          )}
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap', marginTop:32 }}>
            <Link to="/" className="btn-outline-white">Ir al inicio</Link>
            {orden?.estado === 'cancelado'
              ? <Link to="/carrito" className="btn-coral">Volver al carrito</Link>
              : <Link to="/tienda" className="btn-coral">Seguir comprando</Link>
            }
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
