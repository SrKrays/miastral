import { useState, useEffect, useContext } from 'react'
import AdminLayout from '../../components/AdminLayout/AdminLayout'
import { AuthContext } from '../../context/AuthContext'
import { API_URL } from '../../config/api'
import '../../components/AdminLayout/AdminLayout.css'

const ESTADOS = ['pendiente', 'pagado', 'enviado', 'cancelado']

const formatARS = (n) => `$${Number(n || 0).toLocaleString('es-AR')}`

export default function AdminOrdenes() {
  const { token, authFetch } = useContext(AuthContext)
  const [ordenes, setOrdenes] = useState([])
  const [loading, setLoading] = useState(true)
  const [actualizando, setActualizando] = useState(null) // id de la orden que se está guardando
  const [error, setError] = useState('')

  const cargar = () => {
    setLoading(true)
    setError('')
    authFetch(`${API_URL}/api/ordenes`)
      .then(async res => {
        if (!res.ok) throw new Error(`El servidor respondió ${res.status}. Puede que el backend con este endpoint todavía no esté desplegado en Render.`)
        return res.json()
      })
      .then(data => setOrdenes(Array.isArray(data) ? data : []))
      .catch(err => setError(err.message || 'No pudimos cargar las órdenes.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { if (token) cargar() }, [token])

  const cambiarEstado = async (orden, nuevoEstado) => {
    setActualizando(orden.id)
    setOrdenes(prev => prev.map(o => o.id === orden.id ? { ...o, estado: nuevoEstado } : o))
    try {
      await authFetch(`${API_URL}/api/ordenes/${orden.id}/estado`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado }),
      })
    } finally {
      setActualizando(null)
    }
  }

  const eliminarOrden = async (orden) => {
    if (!window.confirm(`¿Eliminar la orden #${orden.id} definitivamente? Esta acción no se puede deshacer.`)) return
    setActualizando(orden.id)
    try {
      const res = await authFetch(`${API_URL}/api/ordenes/${orden.id}`, { method: 'DELETE' })
      if (!res.ok) { alert('No pudimos eliminar la orden.'); return }
      setOrdenes(prev => prev.filter(o => o.id !== orden.id))
    } finally {
      setActualizando(null)
    }
  }

  return (
    <AdminLayout>
      <div className="admin-header-row">
        <h1 className="admin-title">Órdenes</h1>
      </div>

      {error && <div className="auth-error" style={{ marginBottom:20 }}>{error}</div>}

      {loading ? (
        <p style={{ color:'var(--text-muted)' }}>Cargando...</p>
      ) : error ? null : ordenes.length === 0 ? (
        <div className="admin-empty">Todavía no hay pedidos.</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Fecha</th>
                <th>Comprador</th>
                <th>Items</th>
                <th>Total</th>
                <th>Pago</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ordenes.map(o => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{new Date(o.fechaCreacion).toLocaleDateString('es-AR')}</td>
                  <td>
                    {o.comprador ? (
                      <>
                        <div>{o.comprador.nombre} {o.comprador.apellido}</div>
                        <div style={{ fontSize:11, color:'var(--text-muted)' }}>{o.comprador.email}</div>
                      </>
                    ) : (o.envioNombre || '—')}
                  </td>
                  <td>
                    {o.items?.map(i => (
                      <div key={i.id}>{i.cantidad}× {i.productoNombre || `Producto #${i.productoId}`}</div>
                    ))}
                  </td>
                  <td>{formatARS(o.total)}</td>
                  <td style={{ textTransform:'capitalize' }}>{o.metodoPago || '—'}</td>
                  <td>
                    <select
                      className="admin-estado-select"
                      value={o.estado}
                      disabled={actualizando === o.id}
                      onChange={e => cambiarEstado(o, e.target.value)}
                    >
                      {ESTADOS.map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                  </td>
                  <td>
                    <button
                      className="admin-btn-small admin-btn-danger"
                      disabled={actualizando === o.id}
                      onClick={() => eliminarOrden(o)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  )
}
