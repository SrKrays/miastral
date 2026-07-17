import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { AuthContext } from '../context/AuthContext'
import './AuthPages.css'

export default function Login() {
  const [form, setForm]   = useState({ email:'', password:'' })
  const [error, setError] = useState('')
  const { login, isLoading } = useContext(AuthContext)
  const navigate = useNavigate()

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password) { setError('Completá todos los campos.'); return }
    const ok = await login(form.email, form.password)
    if (ok) navigate('/mi-cuenta')
    else setError('Email o contraseña incorrectos.')
  }

  return (
    <>
      <Navbar />
      <section className="auth-section">
        <div className="auth-card anim-scaleIn">
          <div className="auth-logo">DISEÑO HUMANO</div>
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
            <button className="btn-coral auth-submit" type="submit" disabled={isLoading}>
              {isLoading ? 'Ingresando...' : 'Ingresar'}
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
