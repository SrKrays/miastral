import { Link } from 'react-router-dom'
import { useState } from 'react'
import './Footer.css'

export default function Footer() {
  const [email, setEmail] = useState('')
  return (
    <footer className="footer">
      <div className="container-astral">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-logo">ASTRAL</div>
            <div className="footer-brand-sub">Astrología &amp; Bienestar</div>
            <p className="footer-desc">Tu guía astrológica para navegar cada día con claridad, propósito y conexión con la energía del universo.</p>
            <div className="footer-social">
              {[{icon:'𝕏',label:'Twitter'},{icon:'▶',label:'YouTube'},{icon:'◎',label:'Instagram'},{icon:'♪',label:'Spotify'},{icon:'✈',label:'Telegram'}].map(s => (
                <a key={s.label} href="#" aria-label={s.label}>{s.icon}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="footer-col-title">Explorar</div>
            <ul className="footer-links">
              <li><Link to="/astrologia">Astrología</Link></li>
              <li><Link to="/astrologia#carta">Carta astral gratis</Link></li>
              <li><Link to="/bienestar">Bienestar</Link></li>
              <li><Link to="/tienda">Tienda</Link></li>
              <li><Link to="/conoce">Conoce a Valen</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Mi cuenta</div>
            <ul className="footer-links">
              <li><Link to="/login">Iniciar sesión</Link></li>
              <li><Link to="/registro">Registrarse</Link></li>
              <li><Link to="/mi-cuenta">Mi perfil</Link></li>
              <li><Link to="/carrito">Carrito</Link></li>
              <li><Link to="/contacto">Ayuda y soporte</Link></li>
            </ul>
          </div>
          <div className="footer-newsletter">
            <div className="footer-col-title">Newsletter</div>
            <p>Recibí energía disponible y acceso a promociones exclusivas.</p>
            <div className="footer-input-row">
              <input type="email" placeholder="tu@email.com" value={email} onChange={e => setEmail(e.target.value)} />
              <button type="button">Suscribir</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Astral. Todos los derechos reservados.</p>
          <nav className="footer-legal">
            <Link to="/contacto">Política de privacidad</Link>
            <Link to="/contacto">Términos de uso</Link>
            <Link to="/contacto">Cookies</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
