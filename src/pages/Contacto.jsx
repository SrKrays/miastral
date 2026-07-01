import { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './Contacto.css'

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', asunto: '', mensaje: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  const validate = () => {
    const e = {}
    if (!form.nombre.trim()) e.nombre = 'Requerido'
    if (!form.email.trim()) e.email = 'Requerido'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email inválido'
    if (!form.asunto.trim()) e.asunto = 'Requerido'
    if (!form.mensaje.trim()) e.mensaje = 'Requerido'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      // TODO: Enviar a backend cuando esté listo
      console.log('Formulario enviado:', form)
      setSubmitted(true)
      setForm({ nombre: '', email: '', asunto: '', mensaje: '' })
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <>
      <Navbar />

      {/* BANNER */}
      <section className="contacto-banner">
        <h1 className="contacto-banner-title">Contacto</h1>
        <p className="contacto-banner-subtitle">¿Preguntas o comentarios? Nos encantaría saber de ti</p>
      </section>

      {/* CONTENIDO */}
      <section className="contacto-section">
        <div className="container-astral">
          <div className="contacto-layout">
            {/* INFO */}
            <div className="contacto-info">
              <h2 className="contacto-subtitle">Ponete en contacto</h2>
              
              <div className="contacto-item">
                <h3 className="contacto-item-title">Email</h3>
                <a href="mailto:valemelchior@gmail.com" className="contacto-link">valemelchior@gmail.com</a>
              </div>

              <div className="contacto-item">
                <h3 className="contacto-item-title">Redes sociales</h3>
                <div className="contacto-socials">
                  <a href="https://www.instagram.com/byvalentinam__/" target="_blank" rel="noopener noreferrer" className="contacto-social-link">Instagram</a>
                  <a href="https://www.tiktok.com/@byvalentinam__" target="_blank" rel="noopener noreferrer" className="contacto-social-link">TikTok</a>
                  <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" className="contacto-social-link">Spotify</a>
                  <a href="https://api.whatsapp.com/send?phone=5493512115420" target="_blank" rel="noopener noreferrer" className="contacto-social-link">WhatsApp</a>
                </div>
              </div>

              <div className="contacto-item">
                <h3 className="contacto-item-title">¿Trabajás en bienestar o Diseño Humano?</h3>
                <p className="contacto-item-text">Si querés colaborar, proponer una mención en el podcast o simplemente escribirme, te espero por WhatsApp:</p>
                <a href="https://api.whatsapp.com/send?phone=5493512115420&text=Hola%21%20me%20interesa%20colaborar..." target="_blank" rel="noopener noreferrer" className="btn-sand" style={{ marginTop:12, fontSize:11 }}>Escribir por WhatsApp</a>
              </div>
            </div>

            {/* FORMULARIO */}
            <div className="contacto-form-wrap">
              {submitted && (
                <div className="contacto-success">
                  <span className="contacto-success-icon">✓</span>
                  <h3>¡Mensaje enviado!</h3>
                  <p>Gracias por ponerte en contacto. Te responderemos pronto.</p>
                </div>
              )}

              {!submitted && (
                <form className="contacto-form" onSubmit={handleSubmit}>
                  <h2 className="contacto-subtitle">Escribinos</h2>

                  <div className="contacto-form-group">
                    <label className="contacto-label">Nombre *</label>
                    <input
                      type="text"
                      name="nombre"
                      value={form.nombre}
                      onChange={handle}
                      className={`contacto-input${errors.nombre ? ' input-error' : ''}`}
                      placeholder="Tu nombre"
                    />
                    {errors.nombre && <span className="contacto-error">{errors.nombre}</span>}
                  </div>

                  <div className="contacto-form-group">
                    <label className="contacto-label">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handle}
                      className={`contacto-input${errors.email ? ' input-error' : ''}`}
                      placeholder="tu@email.com"
                    />
                    {errors.email && <span className="contacto-error">{errors.email}</span>}
                  </div>

                  <div className="contacto-form-group">
                    <label className="contacto-label">Asunto *</label>
                    <input
                      type="text"
                      name="asunto"
                      value={form.asunto}
                      onChange={handle}
                      className={`contacto-input${errors.asunto ? ' input-error' : ''}`}
                      placeholder="¿En qué te podemos ayudar?"
                    />
                    {errors.asunto && <span className="contacto-error">{errors.asunto}</span>}
                  </div>

                  <div className="contacto-form-group">
                    <label className="contacto-label">Mensaje *</label>
                    <textarea
                      name="mensaje"
                      value={form.mensaje}
                      onChange={handle}
                      className={`contacto-textarea${errors.mensaje ? ' input-error' : ''}`}
                      placeholder="Cuéntanos lo que necesitas..."
                      rows="6"
                    />
                    {errors.mensaje && <span className="contacto-error">{errors.mensaje}</span>}
                  </div>

                  <button type="submit" className="btn-coral contacto-submit">
                    Enviar mensaje
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

