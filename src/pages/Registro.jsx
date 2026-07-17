import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { AuthContext } from '../context/AuthContext'
import './AuthPages.css'

export default function Registro() {
  const [form, setForm]   = useState({ nombre:'', apellido:'', email:'', telefono:'', password:'', confirm:'' })
  const [error, setError] = useState('')
  const { register, isLoading } = useContext(AuthContext)
  const navigate = useNavigate()

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    setError('')
    if (!form.nombre || !form.apellido || !form.email || !form.password) { setError('Completá todos los campos.'); return }
    if (form.password !== form.confirm) { setError('Las contraseñas no coinciden.'); return }
    if (form.password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres.'); return }
    const ok = await register({
      nombre: form.nombre, apellido: form.apellido, email: form.email,
      password: form.password, telefono: form.telefono || undefined,
    })
    if (ok) navigate('/mi-cuenta')
    else setError('Ya existe una cuenta con ese email, o hubo un error al crearla.')
  }

  return (
    <>
      <Navbar />
      <section className="auth-section">
        <div className="auth-card anim-scaleIn">
          <div className="auth-logo">DISEÑO HUMANO</div>
          <h1 className="auth-title">Crear cuenta</h1>
          <p className="auth-subtitle">Unite a nuestra tribu de Diseño Humano.</p>

          {error && <div className="auth-error">{error}</div>}

          <form className="auth-form" onSubmit={submit}>
            <div className="auth-field">
              <label className="auth-label">Nombre</label>
              <input className="auth-input" type="text" name="nombre" placeholder="Tu nombre" value={form.nombre} onChange={handle} />
            </div>
            <div className="auth-field">
              <label className="auth-label">Apellido</label>
              <input className="auth-input" type="text" name="apellido" placeholder="Tu apellido" value={form.apellido} onChange={handle} />
            </div>
            <div className="auth-field">
              <label className="auth-label">Email</label>
              <input className="auth-input" type="email" name="email" placeholder="tu@email.com" value={form.email} onChange={handle} autoComplete="email" />
            </div>
            <div className="auth-field">
              <label className="auth-label">Teléfono (opcional)</label>
              <input className="auth-input" type="tel" name="telefono" placeholder="Tu WhatsApp" value={form.telefono} onChange={handle} />
            </div>
            <div className="auth-field">
              <label className="auth-label">Contraseña</label>
              <input className="auth-input" type="password" name="password" placeholder="Mínimo 6 caracteres" value={form.password} onChange={handle} />
            </div>
            <div className="auth-field">
              <label className="auth-label">Confirmar contraseña</label>
              <input className="auth-input" type="password" name="confirm" placeholder="Repetí tu contraseña" value={form.confirm} onChange={handle} />
            </div>
            <button className="btn-coral auth-submit" type="submit" disabled={isLoading}>
              {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>

          <div className="auth-divider"><span>o</span></div>

          <div className="auth-switch">
            ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
