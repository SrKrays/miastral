import { useContext, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './AdminLayout.css'

export default function AdminLayout({ children }) {
  const { user, isAuthenticated, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const logueadoComoAdmin = isAuthenticated() && user?.rol === 'admin'

  useEffect(() => {
    if (!logueadoComoAdmin) navigate('/admin/login')
  }, [logueadoComoAdmin])

  if (!logueadoComoAdmin) return null

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <span className="admin-logo">miastral · admin</span>
        <nav className="admin-nav">
          <Link to="/admin/productos" className={location.pathname === '/admin/productos' ? 'active' : ''}>Productos</Link>
          <Link to="/admin/ordenes" className={location.pathname === '/admin/ordenes' ? 'active' : ''}>Órdenes</Link>
        </nav>
        <div className="admin-topbar-right">
          <span className="admin-user-name">{user?.nombre}</span>
          <button onClick={handleLogout} className="admin-logout-btn">Cerrar sesión</button>
        </div>
      </header>
      <main className="admin-content">
        {children}
      </main>
    </div>
  )
}
