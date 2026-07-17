import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { AuthContext } from '../context/AuthContext'
import { API_URL } from '../config/api'
import './MiCuenta.css'

const formatARS = (n) => `$${Number(n || 0).toLocaleString('es-AR')}`

const ESTADO_LABEL = {
  pendiente: 'Pendiente de pago',
  pagado: 'Pagado',
  enviado: 'Enviado',
  cancelado: 'Cancelado',
}

export default function MiCuenta() {
  const { user, token, isAuthenticated, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [tab, setTab] = useState('perfil') // perfil, ordenes, membresia, direcciones
  const [ordenes, setOrdenes] = useState([])
  const [loadingOrdenes, setLoadingOrdenes] = useState(true)

  useEffect(() => {
    if (!isAuthenticated()) navigate('/login')
  }, [])

  useEffect(() => {
    if (!token) return
    let cancelado = false
    fetch(`${API_URL}/api/ordenes/mis-ordenes`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => { if (!res.ok) throw new Error('bad response'); return res.json() })
      .then(data => { if (!cancelado && Array.isArray(data)) setOrdenes(data) })
      .catch(() => { /* nos quedamos con la lista vacía */ })
      .finally(() => { if (!cancelado) setLoadingOrdenes(false) })
    return () => { cancelado = true }
  }, [token])

  if (!user) return null

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      <Navbar />

      {/* HEADER */}
      <section className="cuenta-header">
        <div className="container-astral">
          <div className="cuenta-header-content">
            <span className="cuenta-avatar">{user.nombre?.charAt(0).toUpperCase() || '👤'}</span>
            <div>
              <h1 className="cuenta-nombre">¡Bienvenidx, {user.nombre}!</h1>
              <p className="cuenta-email">{user.email}</p>
            </div>
            <button className="btn-outline-white" style={{ marginLeft:'auto' }} onClick={handleLogout}>Cerrar sesión</button>
          </div>
        </div>
      </section>

      {/* TABS */}
      <section className="cuenta-section">
        <div className="container-astral">
          <div className="cuenta-tabs">
            <button className={`tab ${tab === 'perfil' ? 'active' : ''}`} onClick={() => setTab('perfil')}>
              Perfil
            </button>
            <button className={`tab ${tab === 'ordenes' ? 'active' : ''}`} onClick={() => setTab('ordenes')}>
              Mis órdenes
            </button>
            <button className={`tab ${tab === 'membresia' ? 'active' : ''}`} onClick={() => setTab('membresia')}>
              Membresía
            </button>
            <button className={`tab ${tab === 'direcciones' ? 'active' : ''}`} onClick={() => setTab('direcciones')}>
              Direcciones
            </button>
          </div>

          {/* PERFIL */}
          {tab === 'perfil' && (
            <div className="tab-content">
              <h2>Información personal</h2>
              <div className="form-group">
                <label>Nombre</label>
                <input type="text" value={user.nombre} readOnly />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={user.email} readOnly />
              </div>
              <button className="btn-coral" style={{ marginTop: 20 }} disabled title="Próximamente">Editar perfil</button>
            </div>
          )}

          {/* ÓRDENES */}
          {tab === 'ordenes' && (
            <div className="tab-content">
              <h2>Historial de compras</h2>
              {loadingOrdenes ? (
                <p>Cargando...</p>
              ) : ordenes.length > 0 ? (
                <div className="ordenes-tabla">
                  <div className="tabla-header">
                    <div>Producto</div>
                    <div>Fecha</div>
                    <div>Monto</div>
                    <div>Estado</div>
                  </div>
                  {ordenes.map(orden => (
                    <div key={orden.id} className="tabla-row">
                      <div className="tabla-cell">
                        {orden.items?.map(i => i.producto?.nombre).filter(Boolean).join(', ') || `Pedido #${orden.id}`}
                      </div>
                      <div className="tabla-cell">{new Date(orden.fechaCreacion).toLocaleDateString('es-AR')}</div>
                      <div className="tabla-cell">{formatARS(orden.total)}</div>
                      <div className="tabla-cell"><span className="estado-badge">{ESTADO_LABEL[orden.estado] || orden.estado}</span></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>No tenés compras aún</p>
                  <Link to="/tienda" className="btn-coral">Ir a la tienda</Link>
                </div>
              )}
            </div>
          )}

          {/* MEMBRESÍA — todavía no implementada */}
          {tab === 'membresia' && (
            <div className="tab-content">
              <h2>Tu membresía</h2>
              <div className="empty-state">
                <p>No tenés membresía activa</p>
                <Link to="/membresia" className="btn-coral">Ver planes</Link>
              </div>
            </div>
          )}

          {/* DIRECCIONES — todavía no implementadas */}
          {tab === 'direcciones' && (
            <div className="tab-content">
              <h2>Mis direcciones</h2>
              <div className="empty-state">
                <p>Todavía no cargaste ninguna dirección</p>
                <button className="btn-coral" disabled title="Próximamente">+ Agregar dirección</button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}

