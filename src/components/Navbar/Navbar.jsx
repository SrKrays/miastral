import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Diseño Humano', path: '/diseno-humano' },
  { label: 'Bienestar',  path: '/bienestar' },
  { label: 'Tienda',     path: '/tienda' },
  { label: 'Conoce a',   path: '/conoce' },
  { label: 'Contacto',   path: '/contacto' },
]

export default function Navbar({ cartCount = 0 }) {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setMobileOpen(false), [location])

  return (
    <header>
      {/* Topbar */}
      <div className="navbar-topbar">
        <div className="navbar-topbar-inner">
          <Link to="/" className="navbar-logo-top">
            DISEÑO HUMANO
            <span>& Física Cuántica</span>
          </Link>

          <div className="navbar-topbar-right">
            <Link to="/login" className="navbar-icon-btn" aria-label="Mi cuenta">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            </Link>
            <Link to="/carrito" className="navbar-icon-btn" aria-label="Carrito">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </div>

      {/* Nav principal */}
      <nav className={`navbar-main${scrolled ? ' scrolled' : ''}`}>
        <div className="navbar-main-inner">
          <div className="navbar-nav-links">
            {NAV_LINKS.map(item => (
              <Link
                key={item.label}
                to={item.path}
                className={`nav-link-astral${location.pathname === item.path ? ' active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <button className="navbar-hamburger" onClick={() => setMobileOpen(true)} aria-label="Menú">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile */}
      <div className={`navbar-mobile-menu${mobileOpen ? ' open' : ''}`}>
        <button className="mobile-close" onClick={() => setMobileOpen(false)}>✕</button>
        <Link to="/" className="navbar-logo-top" style={{ color:'#fff', marginBottom:32, fontSize:24 }}>
          DISEÑO HUMANO<span style={{ color:'rgba(255,255,255,0.4)' }}>& Física Cuántica</span>
        </Link>
        {NAV_LINKS.map(item => <Link key={item.label} to={item.path} className="mobile-nav-link">{item.label}</Link>)}
        <div style={{ marginTop:32, display:'flex', gap:12, flexDirection:'column' }}>
          <Link to="/login"    className="btn-outline-white" style={{ justifyContent:'center' }}>Iniciar sesión</Link>
          <Link to="/registro" className="btn-coral"         style={{ justifyContent:'center' }}>Registrarse</Link>
        </div>
      </div>
    </header>
  )
}
