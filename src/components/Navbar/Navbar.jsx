import { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { CartContext } from '../../context/CartContext'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Home',             path: '/' },
  { label: 'Diseño Humano',    path: '/diseno-humano' },
  { label: 'Cuántica',         path: '/bienestar' },
  { label: 'Tienda',           path: '/tienda' },
  { label: 'Sobre mí',         path: '/conoce' },
  { label: 'Contacto',         path: '/contacto' },
  { label: 'Material gratuito', path: '/material-gratuito' },
]

const SOCIAL_LINKS = [
  { label: 'WhatsApp',  url: 'https://wa.me/5493512115420', icon: 'whatsapp' },
  { label: 'Instagram', url: 'https://www.instagram.com/byvalentinam__/', icon: 'instagram' },
  { label: 'Spotify',   url: 'https://open.spotify.com/show/0pJ7gr5Rmw0iCiNuYrpiEJ?si=118af6f85aca4fbc', icon: 'spotify' },
  { label: 'YouTube',   url: 'https://www.youtube.com/@byvalentinam', icon: 'youtube' },
]

function SocialIcon({ icon }) {
  switch (icon) {
    case 'whatsapp':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 004.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.81-.11-.42-.13-.95-.31-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.33-.14-.19-1.17-1.55-1.17-2.96 0-1.4.74-2.09 1-2.38.26-.28.57-.35.76-.35s.38 0 .55.01c.18.01.41-.07.64.49.24.57.81 1.98.88 2.12.07.14.12.31.02.5-.09.19-.14.31-.28.47-.14.16-.29.36-.42.48-.14.13-.28.28-.13.55.16.28.7 1.15 1.5 1.86 1.03.92 1.9 1.21 2.17 1.34.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.19-.28.38-.23.63-.14.26.1 1.63.77 1.91.91.28.14.47.21.53.33.07.12.07.68-.17 1.36z"/></svg>
      )
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.71 3.71 0 01-1.38-.9 3.71 3.71 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 2.16c-3.15 0-3.5.01-4.73.07-.96.04-1.48.2-1.83.34-.46.18-.78.39-1.13.73-.34.35-.55.67-.73 1.13-.14.35-.3.87-.34 1.83-.06 1.23-.07 1.58-.07 4.73s.01 3.5.07 4.73c.04.96.2 1.48.34 1.83.18.46.39.78.73 1.13.35.34.67.55 1.13.73.35.14.87.3 1.83.34 1.23.06 1.58.07 4.73.07s3.5-.01 4.73-.07c.96-.04 1.48-.2 1.83-.34.46-.18.78-.39 1.13-.73.34-.35.55-.67.73-1.13.14-.35.3-.87.34-1.83.06-1.23.07-1.58.07-4.73s-.01-3.5-.07-4.73c-.04-.96-.2-1.48-.34-1.83a3.03 3.03 0 00-.73-1.13 3.03 3.03 0 00-1.13-.73c-.35-.14-.87-.3-1.83-.34-1.23-.06-1.58-.07-4.73-.07zm0 3.68a4 4 0 110 8 4 4 0 010-8zm0 2.16a1.84 1.84 0 100 3.68 1.84 1.84 0 000-3.68zm5.09-2.4a.94.94 0 11-1.87 0 .94.94 0 011.87 0z"/></svg>
      )
    case 'spotify':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 14.4a.62.62 0 01-.85.21c-2.33-1.42-5.26-1.75-8.72-.96a.62.62 0 11-.28-1.21c3.79-.87 7.04-.5 9.64 1.1.3.18.39.57.21.86zm1.22-2.72a.78.78 0 01-1.07.26c-2.67-1.64-6.73-2.12-9.88-1.16a.78.78 0 01-.45-1.49c3.6-1.09 8.08-.56 11.14 1.32.37.23.48.72.26 1.07zm.11-2.83c-3.2-1.9-8.49-2.08-11.55-1.15a.93.93 0 11-.54-1.78c3.51-1.06 9.34-.86 13.02 1.33a.93.93 0 11-.93 1.6z"/></svg>
      )
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.5s-.23-1.64-.94-2.36c-.9-.94-1.9-.95-2.36-1C16.9 3 12 3 12 3h-.01s-4.89 0-8.19.14c-.46.05-1.46.06-2.36 1C.73 4.86.5 6.5.5 6.5S.26 8.42.26 10.35v1.83c0 1.93.24 3.85.24 3.85s.23 1.64.94 2.36c.9.94 2.08.91 2.6 1.01C5.9 20.9 12 21 12 21s4.9-.01 8.2-.15c.46-.06 1.46-.07 2.36-1.01.71-.72.94-2.36.94-2.36s.24-1.92.24-3.85v-1.83c0-1.93-.24-3.85-.24-3.85zM9.75 14.85V8.65l6.27 3.1-6.27 3.1z"/></svg>
      )
    default: return null
  }
}

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useContext(AuthContext)
  const { count: cartCount } = useContext(CartContext)
  const logueado = isAuthenticated()

  const handleLogout = () => {
    logout()
    setMobileOpen(false)
    navigate('/')
  }

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
          <div className="navbar-topbar-left">
            {SOCIAL_LINKS.map(s => (
              <a key={s.icon} href={s.url} target="_blank" rel="noopener noreferrer" className="navbar-icon-btn navbar-social-btn" aria-label={s.label} title={s.label}>
                <SocialIcon icon={s.icon} />
              </a>
            ))}
          </div>

          <Link to="/" className="navbar-logo-top">
            By Valentina M.
            <span>Diseño Humano & Física Cuántica</span>
          </Link>

          <div className="navbar-topbar-right">
            {logueado ? (
              <Link to="/mi-cuenta" className="navbar-icon-btn navbar-user-btn" aria-label="Mi cuenta" title={`Hola, ${user?.nombre || ''}`}>
                <span className="navbar-user-avatar">{(user?.nombre || '?').charAt(0).toUpperCase()}</span>
              </Link>
            ) : (
              <Link to="/login" className="navbar-icon-btn" aria-label="Iniciar sesión" title="Iniciar sesión">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>
              </Link>
            )}
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
        <Link to="/" className="navbar-logo-top" style={{ color:'#fff', marginBottom:32, fontSize:20 }}>
          By Valentina M.<span style={{ color:'rgba(255,255,255,0.4)' }}> Diseño Humano & Física Cuántica</span>
        </Link>
        {NAV_LINKS.map(item => <Link key={item.label} to={item.path} className="mobile-nav-link">{item.label}</Link>)}
        <div className="mobile-social-row">
          {SOCIAL_LINKS.map(s => (
            <a key={s.icon} href={s.url} target="_blank" rel="noopener noreferrer" className="navbar-icon-btn navbar-social-btn" aria-label={s.label} title={s.label}>
              <SocialIcon icon={s.icon} />
            </a>
          ))}
        </div>
        <div style={{ marginTop:32, display:'flex', gap:12, flexDirection:'column' }}>
          {logueado ? (
            <>
              <span style={{ color:'#fff', fontSize:14, opacity:0.8 }}>Hola, {user?.nombre}</span>
              <Link to="/mi-cuenta" className="btn-sand" style={{ justifyContent:'center' }}>Mi cuenta</Link>
              <button onClick={handleLogout} className="btn-outline-white" style={{ justifyContent:'center' }}>Cerrar sesión</button>
            </>
          ) : (
            <>
              <Link to="/login"    className="btn-outline-white" style={{ justifyContent:'center' }}>Iniciar sesión</Link>
              <Link to="/registro" className="btn-sand"          style={{ justifyContent:'center' }}>Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
