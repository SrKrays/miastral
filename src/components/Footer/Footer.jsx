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
            <div className="footer-brand-logo">DISEÑO HUMANO</div>
            <div className="footer-brand-sub">& Física Cuántica</div>
            <p className="footer-desc">Una guía para recordar quién sos: Diseño Humano y Física Cuántica al servicio de tu autoconocimiento, tu energía y tu magnetismo.</p>
          </div>
          <div>
            <div className="footer-col-title">Explorar</div>
            <ul className="footer-links">
              <li><Link to="/diseno-humano">Diseño Humano</Link></li>
              <li><Link to="/bienestar">Bienestar</Link></li>
              <li><Link to="/tienda">Tienda</Link></li>
              <li><Link to="/eventos">Eventos</Link></li>
              <li><Link to="/membresia">Membresía</Link></li>
              <li><Link to="/conoce">Conoce a Valentina</Link></li>
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
            <p>Recibí contenido, guías gratuitas y novedades sobre nuevos espacios.</p>
            <div className="footer-input-row">
              <input type="email" placeholder="tu@email.com" value={email} onChange={e => setEmail(e.target.value)} />
              <button type="button">Suscribir</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Diseño Humano & Física Cuántica. Todos los derechos reservados.</p>
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
