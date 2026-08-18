import { useState, useContext } from 'react'
import AdminLayout from '../../components/AdminLayout/AdminLayout'
import { AuthContext } from '../../context/AuthContext'
import { ContenidoContext } from '../../context/ContenidoContext'
import { API_URL } from '../../config/api'
import '../../components/AdminLayout/AdminLayout.css'

// Todo lo que hoy es "fijo" en el código del sitio (fotos y videos hardcodeados)
// y que Vale puede reemplazar sola desde acá, sin tocar código. Si se agrega
// una foto/video nuevo al sitio en el futuro, alcanza con sumarlo a esta lista
// y usar la misma clave en la página correspondiente (vía ContenidoContext).
const SLOTS = [
  { clave: 'sobreMiFoto', tipo: 'imagen', seccion: 'Sobre Mí',
    label: 'Foto de portada', desc: 'La foto que aparece en la página "Sobre Mí".' },
  { clave: 'disenoHumanoImagen', tipo: 'imagen', seccion: 'Diseño Humano',
    label: 'Imagen de ejemplo', desc: 'Imagen debajo de "¿Qué es Diseño Humano?".' },
  { clave: 'dhVideoBodygraph', tipo: 'video', seccion: 'Diseño Humano',
    label: 'Video "Cómo interpretar tu BodyGraph"', desc: 'Video al final de la página de Diseño Humano.' },
  { clave: 'homeVideoBienvenida', tipo: 'video', seccion: 'Inicio',
    label: 'Video de bienvenida', desc: 'Video en la sección "De la mente a la conciencia corporal" del Inicio.' },
  { clave: 'materialVideo1', tipo: 'imagen', seccion: 'Material Gratuito',
    label: 'Miniatura — El poder de la palabra', desc: 'Portada del primer video en Material Gratuito.' },
  { clave: 'materialVideo2', tipo: 'imagen', seccion: 'Material Gratuito',
    label: 'Miniatura — Diseño Humano y manifestación', desc: 'Portada del segundo video en Material Gratuito.' },
  { clave: 'materialVideo3', tipo: 'imagen', seccion: 'Material Gratuito',
    label: 'Miniatura — Reconectá con tu verdad', desc: 'Portada del tercer video en Material Gratuito.' },
]

function SlotCard({ slot, urlActual, authFetch, onUpdated }) {
  const [archivo, setArchivo] = useState(null)
  const [subiendo, setSubiendo] = useState(false)
  const [error, setError] = useState('')

  const elegirArchivo = (e) => {
    const f = e.target.files?.[0]
    if (f) { setArchivo(f); setError('') }
  }

  const subir = async () => {
    if (!archivo) return
    setSubiendo(true)
    setError('')
    try {
      const body = new FormData()
      body.append('archivo', archivo)
      const res = await authFetch(`${API_URL}/api/contenido/${slot.clave}`, { method: 'PUT', body })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.message || 'No pudimos subir el archivo.')
      onUpdated(slot.clave, data.url)
      setArchivo(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubiendo(false)
    }
  }

  return (
    <div className="admin-form-panel" style={{ marginBottom: 20 }}>
      <p className="admin-form-section-title" style={{ marginTop: 0 }}>{slot.seccion}</p>
      <h3 style={{ margin: '0 0 4px', fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 18 }}>{slot.label}</h3>
      <p style={{ margin: '0 0 14px', fontSize: 13, color: 'var(--text-muted)' }}>{slot.desc}</p>

      <div className="admin-img-preview" style={{ height: slot.tipo === 'video' ? 160 : 140 }}>
        {urlActual ? (
          slot.tipo === 'video'
            ? <video src={urlActual} controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <img src={urlActual} alt={slot.label} />
        ) : (
          <span>Sin {slot.tipo === 'video' ? 'video' : 'imagen'} — usa el valor por defecto del sitio</span>
        )}
      </div>

      <div className="admin-img-upload-row">
        <label className="admin-btn-small admin-file-btn">
          📁 Elegir {slot.tipo === 'video' ? 'video' : 'imagen'}
          <input type="file" accept={slot.tipo === 'video' ? 'video/*' : 'image/*'} onChange={elegirArchivo} hidden />
        </label>
        <button
          type="button"
          className="admin-btn-small admin-btn-upload"
          onClick={subir}
          disabled={!archivo || subiendo}
        >
          {subiendo ? 'Subiendo...' : `☁️ Subir a Ferozo${archivo ? `: ${archivo.name}` : ''}`}
        </button>
      </div>
      {slot.tipo === 'video' && (
        <p style={{ margin: '8px 0 0', fontSize: 11, color: 'var(--text-muted)' }}>Máximo 150 MB (MP4, WEBM o MOV).</p>
      )}
      {error && <p className="auth-error" style={{ marginTop: 8 }}>{error}</p>}
      {urlActual && <p className="admin-img-url-readonly">{urlActual}</p>}
    </div>
  )
}

export default function AdminContenido() {
  const { authFetch } = useContext(AuthContext)
  const { contenido, recargar } = useContext(ContenidoContext)
  const [overrides, setOverrides] = useState({})

  const valorDe = (clave) => overrides[clave] ?? contenido[clave]

  const handleUpdated = (clave, url) => {
    setOverrides(o => ({ ...o, [clave]: url }))
    recargar()
  }

  const secciones = [...new Set(SLOTS.map(s => s.seccion))]

  return (
    <AdminLayout>
      <div className="admin-header-row">
        <h1 className="admin-title">Contenido</h1>
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: -12, marginBottom: 28, maxWidth: 640 }}>
        Reemplazá acá las fotos y videos del sitio. Los cambios se ven en la web apenas se suben — no hace falta pedirle nada a nadie.
      </p>

      {secciones.map(seccion => (
        <div key={seccion} style={{ marginBottom: 8 }}>
          {SLOTS.filter(s => s.seccion === seccion).map(slot => (
            <SlotCard
              key={slot.clave}
              slot={slot}
              urlActual={valorDe(slot.clave)}
              authFetch={authFetch}
              onUpdated={handleUpdated}
            />
          ))}
        </div>
      ))}
    </AdminLayout>
  )
}
