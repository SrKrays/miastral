import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <section style={{
        minHeight: '70vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '60px 24px', position: 'relative', zIndex: 2
      }}>
        <p style={{ fontFamily: 'var(--font-label)', fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent-sand)', textTransform: 'uppercase', marginBottom: 24 }}>Error 404</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,8vw,6rem)', fontStyle: 'italic', fontWeight: 400, color: '#fff', marginBottom: 16, lineHeight: 1.1 }}>
          Esta página<br />no existe.
        </h1>
        <p style={{ color: 'var(--c-300)', maxWidth: 360, marginBottom: 40, lineHeight: 1.7 }}>
          Quizás el link cambió o la URL tiene un error. Volvé al inicio y desde ahí encontrás todo.
        </p>
        <Link to="/" className="btn-coral">Volver al inicio</Link>
      </section>
      <Footer />
    </>
  )
}
