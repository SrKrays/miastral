import { useState, useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import '../AuthPages.css'

export default function AdminLogin() {
  const [form, setForm] = useState({ email:'', password:'' })
  const [error, setError] = useState('')
  const { loginAdmin, isLoading, user, isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const expirado = searchParams.get('expirado') === '1'

  useEffect(() => {
    if (isAuthenticated() && user?.rol === 'admin') navigate('/admin/productos')
  }, [])

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password) { setError('Completá todos los campos.'); return }
    const ok = await loginAdmin(form.email, form.password)
    if (ok) navigate('/admin/productos')
    else setError('Email o contraseña incorrectos.')
  }

  return (
    <section className="auth-section" style={{ background:'var(--bg-primary)', minHeight:'100vh' }}>
      <div className="auth-card anim-scaleIn">
        <div className="auth-logo">MIASTRAL</div>
        <h1 className="auth-title">Panel de administración</h1>
        <p className="auth-subtitle">Acceso exclusivo para Valentina.</p>

        {expirado && !error && (
          <div className="auth-error">Tu sesión expiró por inactividad. Iniciá sesión de nuevo.</div>
        )}
        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={submit}>
          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input className="auth-input" type="email" name="email" placeholder="tu@email.com" value={form.email} onChange={handle} autoComplete="email" />
          </div>
          <div className="auth-field">
            <label className="auth-label">Contraseña</label>
            <input className="auth-input" type="password" name="password" placeholder="••••••••" value={form.password} onChange={handle} autoComplete="current-password" />
          </div>
          <button className="btn-coral auth-submit" type="submit" disabled={isLoading}>
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </section>
  )
}
