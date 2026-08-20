import { useState, useContext } from 'react'
import AdminLayout from '../../components/AdminLayout/AdminLayout'
import { AuthContext } from '../../context/AuthContext'
import { ContenidoContext } from '../../context/ContenidoContext'
import { API_URL } from '../../config/api'
import { getYoutubeThumb } from '../../utils/youtube'
import '../../components/AdminLayout/AdminLayout.css'

// Todo lo que hoy es "fijo" en el código del sitio (fotos, links de YouTube y
// textos cortos de cada card) y que Vale puede reemplazar sola desde acá, sin
// tocar código. Si se agrega una card nueva al sitio en el futuro, alcanza
// con sumarla acá y usar el mismo prefijo de clave en la página correspondiente.
//
// tipo 'imagen'      → sube un archivo a Ferozo.
// tipo 'video'       → un link de YouTube; la miniatura se genera sola.
// campos: cuáles de título / descripción / medio mostrar para esa card.
const SECCIONES = [
  {
    id: 'sobre-mi', nombre: 'Sobre Mí',
    cards: [
      { clave: 'sobreMiFoto', label: 'Foto de portada', tipo: 'imagen', campos: ['imagen'] },
    ],
  },
  {
    id: 'diseno-humano', nombre: 'Diseño Humano',
    cards: [
      { clave: 'disenoHumanoImagen', label: 'Imagen de ejemplo (debajo de "¿Qué es Diseño Humano?")', tipo: 'imagen', campos: ['imagen'] },
      { clave: 'dhVideoBodygraph', label: 'Video "Cómo interpretar tu BodyGraph"', tipo: 'video', campos: ['video'] },
      { clave: 'disenoHumanoPilar1', label: 'Pilar 1: Tipo', tipo: 'imagen', campos: ['imagen'] },
      { clave: 'disenoHumanoPilar2', label: 'Pilar 2: Estrategia', tipo: 'imagen', campos: ['imagen'] },
      { clave: 'disenoHumanoPilar3', label: 'Pilar 3: Autoridad', tipo: 'imagen', campos: ['imagen'] },
      { clave: 'disenoHumanoTipo1', label: 'Tipo energético: Generador', tipo: 'imagen', campos: ['imagen'] },
      { clave: 'disenoHumanoTipo2', label: 'Tipo energético: Generador Manifestante', tipo: 'imagen', campos: ['imagen'] },
      { clave: 'disenoHumanoTipo3', label: 'Tipo energético: Proyector', tipo: 'imagen', campos: ['imagen'] },
      { clave: 'disenoHumanoTipo4', label: 'Tipo energético: Manifestador', tipo: 'imagen', campos: ['imagen'] },
      { clave: 'disenoHumanoTipo5', label: 'Tipo energético: Reflector', tipo: 'imagen', campos: ['imagen'] },
    ],
  },
  {
    id: 'inicio', nombre: 'Inicio',
    cards: [
      { clave: 'homeVideoBienvenida', label: 'Video de bienvenida ("De la mente a la conciencia corporal")', tipo: 'video', campos: ['video'] },
    ],
  },
  {
    id: 'bienestar', nombre: 'Bienestar',
    cards: [
      { clave: 'bienestar1', label: 'Conectá con tu poder creador', tipo: 'imagen', campos: ['titulo', 'desc', 'imagen'] },
      { clave: 'bienestar2', label: 'Diseño Humano & Manifestación', tipo: 'video', campos: ['titulo', 'desc', 'video'] },
      { clave: 'bienestar3', label: 'Reconectá con tu verdad', tipo: 'video', campos: ['titulo', 'desc', 'video'] },
      { clave: 'bienestar4', label: 'El poder de la palabra', tipo: 'video', campos: ['titulo', 'desc', 'video'] },
      { clave: 'bienestar5', label: 'Activá tu magnetismo único', tipo: 'imagen', campos: ['titulo', 'desc', 'imagen'] },
      { clave: 'bienestar6', label: 'Centros energéticos de tu carta', tipo: 'imagen', campos: ['titulo', 'desc', 'imagen'] },
    ],
  },
  {
    id: 'material-gratuito', nombre: 'Material Gratuito',
    cards: [
      { clave: 'materialVideo1', label: 'Video: El poder de la palabra', tipo: 'video', campos: ['titulo', 'desc', 'video'] },
      { clave: 'materialVideo2', label: 'Video: Diseño Humano y manifestación', tipo: 'video', campos: ['titulo', 'desc', 'video'] },
      { clave: 'materialVideo3', label: 'Video: Reconectá con tu verdad', tipo: 'video', campos: ['titulo', 'desc', 'video'] },
      { clave: 'materialGuia1', label: 'Guía de centros energéticos', tipo: 'imagen', campos: ['titulo', 'desc', 'imagen'] },
      { clave: 'materialGuia2', label: 'Guía de corte psicomágico', tipo: 'imagen', campos: ['titulo', 'desc', 'imagen'] },
      { clave: 'materialGuia3', label: 'Guía de reprogramación de pensamientos', tipo: 'imagen', campos: ['titulo', 'desc', 'imagen'] },
      { clave: 'materialGuia4', label: 'Guía sobre conciencia corporal', tipo: 'imagen', campos: ['titulo', 'desc', 'imagen'] },
    ],
  },
]

// ── Campo de texto (título / descripción) con guardado independiente ──
function CampoTexto({ clave, label, multilinea, valorActual, authFetch, onSaved }) {
  const [valor, setValor] = useState(valorActual || '')
  const [guardando, setGuardando] = useState(false)
  const [ok, setOk] = useState(false)
  const [error, setError] = useState('')

  const guardar = async () => {
    setGuardando(true); setError(''); setOk(false)
    try {
      const res = await authFetch(`${API_URL}/api/contenido/${clave}/texto`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ valor }),
      })
      if (!res.ok) throw new Error('No pudimos guardar.')
      onSaved(clave, valor)
      setOk(true)
      setTimeout(() => setOk(false), 1500)
    } catch (err) {
      setError(err.message)
    } finally {
      setGuardando(false)
    }
  }

  const Campo = multilinea ? 'textarea' : 'input'

  return (
    <div className="admin-form-field full">
      <label>{label}</label>
      <div style={{ display: 'flex', gap: 8, alignItems: multilinea ? 'flex-start' : 'center' }}>
        <Campo
          value={valor}
          onChange={e => setValor(e.target.value)}
          placeholder="(usando el texto por defecto del sitio)"
          style={{ flex: 1 }}
        />
        <button type="button" className="admin-btn-small admin-btn-upload" onClick={guardar} disabled={guardando}>
          {guardando ? '...' : ok ? '✓ Guardado' : 'Guardar'}
        </button>
      </div>
      {error && <p className="auth-error" style={{ marginTop: 6 }}>{error}</p>}
    </div>
  )
}

// ── Campo de video: link de YouTube + miniatura automática ──
function CampoVideo({ clave, valorActual, authFetch, onSaved }) {
  const [valor, setValor] = useState(valorActual || '')
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')
  const thumb = getYoutubeThumb(valor)

  const guardar = async () => {
    setGuardando(true); setError('')
    try {
      const res = await authFetch(`${API_URL}/api/contenido/${clave}/texto`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ valor }),
      })
      if (!res.ok) throw new Error('No pudimos guardar el link.')
      onSaved(clave, valor)
    } catch (err) {
      setError(err.message)
    } finally {
      setGuardando(false)
    }
  }

  return (
    <div className="admin-form-field full">
      <label>Link de YouTube</label>
      {thumb && <img src={thumb} alt="" style={{ width: 160, borderRadius: 8, marginBottom: 8, display: 'block' }} />}
      <div style={{ display: 'flex', gap: 8 }}>
        <input value={valor} onChange={e => setValor(e.target.value)} placeholder="https://youtu.be/..." style={{ flex: 1 }} />
        <button type="button" className="admin-btn-small admin-btn-upload" onClick={guardar} disabled={guardando}>
          {guardando ? '...' : 'Guardar'}
        </button>
      </div>
      <p style={{ margin: '6px 0 0', fontSize: 11, color: 'var(--text-muted)' }}>La miniatura se toma sola de YouTube — no hace falta subir ninguna imagen.</p>
      {error && <p className="auth-error" style={{ marginTop: 6 }}>{error}</p>}
    </div>
  )
}

// ── Campo de imagen: sube un archivo a Ferozo ──
function CampoImagen({ clave, urlActual, authFetch, onSaved }) {
  const [archivo, setArchivo] = useState(null)
  const [subiendo, setSubiendo] = useState(false)
  const [error, setError] = useState('')

  const elegirArchivo = (e) => {
    const f = e.target.files?.[0]
    if (f) { setArchivo(f); setError('') }
  }

  const subir = async () => {
    if (!archivo) return
    setSubiendo(true); setError('')
    try {
      const body = new FormData()
      body.append('archivo', archivo)
      const res = await authFetch(`${API_URL}/api/contenido/${clave}`, { method: 'PUT', body })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.message || 'No pudimos subir la imagen.')
      onSaved(clave, data.url)
      setArchivo(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubiendo(false)
    }
  }

  return (
    <div className="admin-form-field full">
      <label>Imagen</label>
      <div className="admin-img-preview">
        {urlActual ? <img src={urlActual} alt="" /> : <span>Sin imagen — usa el valor por defecto del sitio</span>}
      </div>
      <div className="admin-img-upload-row">
        <label className="admin-btn-small admin-file-btn">
          📁 Elegir imagen
          <input type="file" accept="image/*" onChange={elegirArchivo} hidden />
        </label>
        <button type="button" className="admin-btn-small admin-btn-upload" onClick={subir} disabled={!archivo || subiendo}>
          {subiendo ? 'Subiendo...' : `☁️ Subir a Ferozo${archivo ? `: ${archivo.name}` : ''}`}
        </button>
      </div>
      {error && <p className="auth-error" style={{ marginTop: 8 }}>{error}</p>}
    </div>
  )
}

function CardEditor({ card, contenido, authFetch, onSaved }) {
  const valorDe = (sufijo) => contenido[`${card.clave}${sufijo}`]
  // Cards con solo un campo (ej: sobreMiFoto, dhVideoBodygraph) guardan bajo
  // la clave "pelada". Cards combinadas con título/descripción (ej: las de
  // Bienestar y Material Gratuito) guardan la imagen bajo "{clave}Imagen"
  // para no pisar el link/valor de otro campo de la misma card. El video
  // siempre usa la clave pelada — es el "valor principal" de esa card.
  const esCardCombinada = card.campos.includes('titulo') || card.campos.includes('desc')
  const claveImagen = esCardCombinada ? `${card.clave}Imagen` : card.clave

  return (
    <div className="admin-form-panel" style={{ marginBottom: 16 }}>
      <h3 style={{ margin: '0 0 14px', fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 17 }}>{card.label}</h3>
      <div className="admin-form-grid">
        {card.campos.includes('titulo') && (
          <CampoTexto clave={`${card.clave}Titulo`} label="Título" valorActual={valorDe('Titulo')} authFetch={authFetch} onSaved={onSaved} />
        )}
        {card.campos.includes('desc') && (
          <CampoTexto clave={`${card.clave}Desc`} label="Descripción" multilinea valorActual={valorDe('Desc')} authFetch={authFetch} onSaved={onSaved} />
        )}
        {card.campos.includes('imagen') && (
          <CampoImagen clave={claveImagen} urlActual={contenido[claveImagen]} authFetch={authFetch} onSaved={onSaved} />
        )}
        {card.campos.includes('video') && (
          <CampoVideo clave={card.clave} valorActual={contenido[card.clave]} authFetch={authFetch} onSaved={onSaved} />
        )}
      </div>
    </div>
  )
}

export default function AdminContenido() {
  const { authFetch } = useContext(AuthContext)
  const { contenido: contenidoBase, recargar } = useContext(ContenidoContext)
  const [overrides, setOverrides] = useState({})

  const contenido = { ...contenidoBase, ...overrides }

  const handleSaved = (clave, valor) => {
    setOverrides(o => ({ ...o, [clave]: valor }))
    recargar()
  }

  return (
    <AdminLayout>
      <div className="admin-header-row">
        <h1 className="admin-title">Contenido</h1>
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: -12, marginBottom: 24, maxWidth: 640 }}>
        Reemplazá acá los textos, imágenes y videos de cada sección. Los cambios se ven en la web apenas se guardan — no hace falta pedirle nada a nadie. Si dejás un campo vacío, se usa el valor por defecto del sitio.
      </p>

      {SECCIONES.map(seccion => (
        <details key={seccion.id} className="admin-contenido-seccion" open>
          <summary className="admin-contenido-seccion-titulo">{seccion.nombre}</summary>
          <div style={{ marginTop: 16 }}>
            {seccion.cards.map(card => (
              <CardEditor key={card.clave} card={card} contenido={contenido} authFetch={authFetch} onSaved={handleSaved} />
            ))}
          </div>
        </details>
      ))}
    </AdminLayout>
  )
}
