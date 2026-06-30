import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './AuthPages.css'

export default function Login() {
  const [form, setForm]   = useState({ email:'', password:'' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password) { setError('Completá todos los campos.'); return }
    setLoading(true)
    // Simulación — reemplazar con fetch real al backend
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    navigate('/')
  }

  return (
    <>
      <Navbar />
      <section className="auth-section">
        <div className="auth-card anim-scaleIn">
          <div className="auth-logo">ASTRAL</div>
          <h1 className="auth-title">Iniciá sesión</h1>
          <p className="auth-subtitle">Accedé a tu cuenta para continuar.</p>

          {error && <div className="auth-error">{error}</div>}

          <form className="auth-form" onSubmit={submit}>
            <div className="auth-field">
              <label className="auth-label">Email</label>
              <input
                className="auth-input"
                type="email" name="email"
                placeholder="tu@email.com"
                value={form.email} onChange={handle} autoComplete="email"
              />
            </div>
            <div className="auth-field">
              <label className="auth-label">Contraseña</label>
              <input
                className="auth-input"
                type="password" name="password"
                placeholder="••••••••"
                value={form.password} onChange={handle} autoComplete="current-password"
              />
            </div>
            <div className="auth-forgot">
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>
            <button className="btn-coral auth-submit" type="submit" disabled={loading}>
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>

          <div className="auth-divider"><span>o</span></div>

          <div className="auth-switch">
            ¿No tenés cuenta? <Link to="/registro">Registrate gratis</Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
