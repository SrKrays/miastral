import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './MiCuenta.css'

const MOCK_USUARIO = {
  nombre: 'María González',
  email: 'maria@example.com',
  avatar: '👤',
  miembro: true,
  membresia: {
    plan: 'Anual',
    vigencia: '21 de julio 2027',
    estado: 'Activa'
  }
}

const MOCK_ORDENES = [
  { id: 1, producto: 'Horóscopo 2026', fecha: '15 de mayo 2026', monto: 'US$ 45', estado: 'Entregado' },
  { id: 2, producto: 'Guía Manifestación Lunar', fecha: '3 de junio 2026', monto: 'US$ 26', estado: 'Entregado' },
  { id: 3, producto: 'Astrología Práctica', fecha: '28 de junio 2026', monto: 'US$ 59', estado: 'Entregado' },
]

export default function MiCuenta() {
  const [usuario] = useState(MOCK_USUARIO)
  const [tab, setTab] = useState('perfil') // perfil, ordenes, membresia, direcciones

  return (
    <>
      <Navbar />

      {/* HEADER */}
      <section className="cuenta-header">
        <div className="container-astral">
          <div className="cuenta-header-content">
            <span className="cuenta-avatar">{usuario.avatar}</span>
            <div>
              <h1 className="cuenta-nombre">{usuario.nombre}</h1>
              <p className="cuenta-email">{usuario.email}</p>
            </div>
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
                <input type="text" value={usuario.nombre} readOnly />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={usuario.email} readOnly />
              </div>
              <button className="btn-coral" style={{ marginTop: 20 }}>Editar perfil</button>
            </div>
          )}

          {/* ÓRDENES */}
          {tab === 'ordenes' && (
            <div className="tab-content">
              <h2>Historial de compras</h2>
              {MOCK_ORDENES.length > 0 ? (
                <div className="ordenes-tabla">
                  <div className="tabla-header">
                    <div>Producto</div>
                    <div>Fecha</div>
                    <div>Monto</div>
                    <div>Estado</div>
                  </div>
                  {MOCK_ORDENES.map(orden => (
                    <div key={orden.id} className="tabla-row">
                      <div className="tabla-cell">{orden.producto}</div>
                      <div className="tabla-cell">{orden.fecha}</div>
                      <div className="tabla-cell">{orden.monto}</div>
                      <div className="tabla-cell"><span className="estado-badge">{orden.estado}</span></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>No tienes compras aún</p>
                  <Link to="/tienda" className="btn-coral">Ir a la tienda</Link>
                </div>
              )}
            </div>
          )}

          {/* MEMBRESÍA */}
          {tab === 'membresia' && (
            <div className="tab-content">
              <h2>Tu membresía</h2>
              {usuario.miembro ? (
                <div className="membresia-info">
                  <div className="info-item">
                    <span className="label">Plan</span>
                    <span className="value">{usuario.membresia.plan}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Estado</span>
                    <span className="value estado-activa">{usuario.membresia.estado}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Vigencia hasta</span>
                    <span className="value">{usuario.membresia.vigencia}</span>
                  </div>
                  <button className="btn-outline-dark" style={{ marginTop: 20 }}>
                    Cambiar plan
                  </button>
                </div>
              ) : (
                <div className="empty-state">
                  <p>No tienes membresía activa</p>
                  <Link to="/membresia" className="btn-coral">Ver planes</Link>
                </div>
              )}
            </div>
          )}

          {/* DIRECCIONES */}
          {tab === 'direcciones' && (
            <div className="tab-content">
              <h2>Mis direcciones</h2>
              <div className="direcciones-list">
                <div className="direccion-card">
                  <div className="direccion-header">
                    <h3>Casa (Principal)</h3>
                    <button className="btn-small">Editar</button>
                  </div>
                  <p>María González</p>
                  <p>Calle Principal 123, Apto 4</p>
                  <p>5000 Córdoba, Córdoba</p>
                  <p>📞 +54 9 351 123456</p>
                </div>
              </div>
              <button className="btn-coral" style={{ marginTop: 20 }}>+ Agregar dirección</button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}

