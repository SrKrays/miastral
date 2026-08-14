import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-astral">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-logo">By Valentina M.</div>
            <div className="footer-brand-sub">Diseño Humano & Física Cuántica</div>
            <p className="footer-desc">Una guía para recordar quién sos: Diseño Humano y Física Cuántica al servicio de tu autoconocimiento, tu energía y tu magnetismo.</p>
          </div>
          <div>
            <div className="footer-col-title">Explorar</div>
            <ul className="footer-links">
              <li><Link to="/diseno-humano">Diseño Humano</Link></li>
              <li><Link to="/bienestar">Bienestar</Link></li>
              <li><Link to="/tienda">Tienda</Link></li>
              <li><Link to="/material-gratuito">Material gratuito</Link></li>
              <li><Link to="/conoce">Sobre mí</Link></li>
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
          <div>
            <div className="footer-col-title">Seguime</div>
            <ul className="footer-links">
              <li><a href="https://www.instagram.com/byvalentinam__/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://www.youtube.com/@byvalentinam" target="_blank" rel="noopener noreferrer">YouTube</a></li>
              <li><a href="https://open.spotify.com/show/0pJ7gr5Rmw0iCiNuYrpiEJ?si=118af6f85aca4fbc" target="_blank" rel="noopener noreferrer">Spotify (podcast)</a></li>
              <li><a href="https://api.whatsapp.com/send?phone=5493512115420" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} By Valentina M. Todos los derechos reservados.</p>
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
