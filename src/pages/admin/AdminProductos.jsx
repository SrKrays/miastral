import { useState, useEffect, useContext } from 'react'
import AdminLayout from '../../components/AdminLayout/AdminLayout'
import { AuthContext } from '../../context/AuthContext'
import { API_URL } from '../../config/api'
import '../../components/AdminLayout/AdminLayout.css'

const VACIO = {
  nombre: '', descripcion: '', descripcionCompleta: '',
  precio: '', precioUSD: '', sena: '',
  duracion: '', modalidad: '', incluye: '',
  requiereDatosNacimiento: false,
  stock: '', tipo: 'producto', imageUrl: '', tag: '',
  activo: true, orden: 0,
  pesoGramos: '', altoCm: '', anchoCm: '', largoCm: '',
}

// Convierte '' a null para los campos numéricos opcionales antes de mandar al back.
function limpiarPayload(form) {
  const num = (v) => (v === '' || v === null || v === undefined ? null : Number(v))
  return {
    ...form,
    precio: num(form.precio),
    precioUSD: num(form.precioUSD),
    sena: num(form.sena),
    stock: num(form.stock),
    orden: num(form.orden) ?? 0,
    pesoGramos: num(form.pesoGramos),
    altoCm: num(form.altoCm),
    anchoCm: num(form.anchoCm),
    largoCm: num(form.largoCm),
  }
}

export default function AdminProductos() {
  const { token, authFetch } = useContext(AuthContext)
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [editando, setEditando] = useState(null) // null = cerrado, {} = nuevo, {...} = editando
  const [form, setForm] = useState(VACIO)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')       // error al guardar (dentro del form)
  const [errorLista, setErrorLista] = useState('') // error al cargar la tabla

  const cargar = () => {
    setLoading(true)
    setErrorLista('')
    authFetch(`${API_URL}/api/productos/admin`)
      .then(async res => {
        if (!res.ok) throw new Error(`El servidor respondió ${res.status}. Puede que el backend con este endpoint todavía no esté desplegado en Render.`)
        return res.json()
      })
      .then(data => setProductos(Array.isArray(data) ? data : []))
      .catch(err => setErrorLista(err.message || 'No pudimos cargar los productos.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { if (token) cargar() }, [token])

  const abrirNuevo = () => { setForm(VACIO); setEditando({}) }
  const abrirEditar = (p) => { setForm({ ...VACIO, ...p }); setEditando(p) }
  const cerrar = () => { setEditando(null); setError('') }

  const handle = e => {
    const { name, type, value, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const guardar = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const esNuevo = !editando?.id
      const url = esNuevo ? `${API_URL}/api/productos` : `${API_URL}/api/productos/${editando.id}`
      const res = await authFetch(url, {
        method: esNuevo ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(limpiarPayload(form)),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || 'No pudimos guardar el producto.')
      }
      cerrar()
      cargar()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const toggleActivo = async (p) => {
    await authFetch(`${API_URL}/api/productos/${p.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(limpiarPayload({ ...VACIO, ...p, activo: !p.activo })),
    })
    cargar()
  }

  // Borrado real (no desactivar) — para sacar productos de prueba que no
  // van a ningún lado. Si ya tiene pedidos asociados, el back lo rechaza
  // con un mensaje claro y acá se lo mostramos al admin.
  const eliminarPermanente = async (p) => {
    if (!window.confirm(`¿Eliminar "${p.nombre}" definitivamente? Esta acción no se puede deshacer.`)) return
    const res = await authFetch(`${API_URL}/api/productos/${p.id}/permanente`, { method: 'DELETE' })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      alert(data.message || 'No pudimos eliminar el producto.')
      return
    }
    cargar()
  }

  const formatPrecio = (n) => n == null ? '—' : `$${Number(n).toLocaleString('es-AR')}`

  return (
    <AdminLayout>
      <div className="admin-header-row">
        <h1 className="admin-title">Productos</h1>
        <button className="btn-coral" onClick={abrirNuevo}>+ Nuevo producto</button>
      </div>

      {editando && (
        <ProductoForm
          form={form}
          onChange={handle}
          onSubmit={guardar}
          onCancel={cerrar}
          saving={saving}
          error={error}
          esNuevo={!editando.id}
          setForm={setForm}
          authFetch={authFetch}
        />
      )}

      {errorLista && <div className="auth-error" style={{ marginBottom:20 }}>{errorLista}</div>}

      {loading ? (
        <p style={{ color:'var(--text-muted)' }}>Cargando...</p>
      ) : errorLista ? null : productos.length === 0 ? (
        <div className="admin-empty">No hay productos cargados todavía.</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productos.map(p => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>{p.tipo}</td>
                  <td>{formatPrecio(p.precio)}</td>
                  <td>{p.stock ?? '—'}</td>
                  <td><span className={`admin-badge ${p.activo ? 'activo' : 'inactivo'}`}>{p.activo ? 'Activo' : 'Inactivo'}</span></td>
                  <td style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                    <button className="admin-btn-small" onClick={() => abrirEditar(p)}>Editar</button>
                    <button className="admin-btn-small" onClick={() => toggleActivo(p)}>{p.activo ? 'Desactivar' : 'Activar'}</button>
                    <button className="admin-btn-small admin-btn-danger" onClick={() => eliminarPermanente(p)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  )
}

function ProductoForm({ form, onChange, onSubmit, onCancel, saving, error, esNuevo, setForm, authFetch }) {
  const [archivo, setArchivo] = useState(null)
  const [subiendo, setSubiendo] = useState(false)
  const [errorSubida, setErrorSubida] = useState('')

  const elegirArchivo = (e) => {
    const f = e.target.files?.[0]
    if (f) { setArchivo(f); setErrorSubida('') }
  }

  const subirAFerozo = async () => {
    if (!archivo) return
    setSubiendo(true)
    setErrorSubida('')
    try {
      const body = new FormData()
      body.append('archivo', archivo)
      const res = await authFetch(`${API_URL}/api/imagenes`, { method: 'POST', body })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.message || 'No pudimos subir la imagen.')
      setForm(f => ({ ...f, imageUrl: data.url }))
      setArchivo(null)
    } catch (err) {
      setErrorSubida(err.message)
    } finally {
      setSubiendo(false)
    }
  }

  return (
    <div className="admin-form-panel">
      <h2 style={{ marginTop:0, fontFamily:'var(--font-display)', fontWeight:400 }}>
        {esNuevo ? 'Nuevo producto' : `Editar: ${form.nombre}`}
      </h2>
      {error && <div className="auth-error">{error}</div>}
      <form onSubmit={onSubmit}>
        <p className="admin-form-section-title">Datos básicos</p>
        <div className="admin-form-grid">
          <div className="admin-form-field full">
            <label>Nombre</label>
            <input name="nombre" value={form.nombre} onChange={onChange} required />
          </div>
          <div className="admin-form-field">
            <label>Tipo</label>
            <select name="tipo" value={form.tipo} onChange={onChange}>
              <option value="producto">Producto</option>
              <option value="servicio">Servicio</option>
              <option value="programa">Programa</option>
            </select>
          </div>
          <div className="admin-form-field">
            <label>Tag (opcional)</label>
            <input name="tag" value={form.tag || ''} onChange={onChange} placeholder="Ej: Nuevo" />
          </div>
          <div className="admin-form-field">
            <label>Orden (posición en la lista)</label>
            <input name="orden" type="number" value={form.orden} onChange={onChange} />
          </div>
          <div className="admin-form-field admin-form-checkbox">
            <input id="activo" name="activo" type="checkbox" checked={form.activo} onChange={onChange} />
            <label htmlFor="activo" style={{ margin:0 }}>Activo (visible en la tienda)</label>
          </div>
          <div className="admin-form-field full">
            <label>Descripción breve (para la card)</label>
            <textarea name="descripcion" value={form.descripcion || ''} onChange={onChange} />
          </div>
          <div className="admin-form-field full">
            <label>Descripción completa (para el detalle) — separá párrafos con línea en blanco</label>
            <textarea name="descripcionCompleta" value={form.descripcionCompleta || ''} onChange={onChange} />
          </div>
          <div className="admin-form-field full">
            <label>Imagen del producto</label>
            <div className="admin-img-preview">
              {form.imageUrl ? <img src={form.imageUrl} alt="" /> : <span>Sin imagen</span>}
            </div>
            <div className="admin-img-upload-row">
              <label className="admin-btn-small admin-file-btn">
                📁 Elegir imagen
                <input type="file" accept="image/*" onChange={elegirArchivo} hidden />
              </label>
              <button
                type="button"
                className="admin-btn-small admin-btn-upload"
                onClick={subirAFerozo}
                disabled={!archivo || subiendo}
              >
                {subiendo ? 'Subiendo...' : `☁️ Subir a Ferozo${archivo ? `: ${archivo.name}` : ''}`}
              </button>
            </div>
            {errorSubida && <p className="auth-error" style={{ marginTop:8 }}>{errorSubida}</p>}
            {form.imageUrl && <p className="admin-img-url-readonly">{form.imageUrl}</p>}
          </div>
        </div>

        <p className="admin-form-section-title">Precio y stock</p>
        <div className="admin-form-grid">
          <div className="admin-form-field">
            <label>Precio (ARS)</label>
            <input name="precio" type="number" step="0.01" value={form.precio} onChange={onChange} placeholder="Vacío = a consultar" />
          </div>
          <div className="admin-form-field">
            <label>Precio (USD, opcional)</label>
            <input name="precioUSD" type="number" step="0.01" value={form.precioUSD} onChange={onChange} />
          </div>
          <div className="admin-form-field">
            <label>Seña (opcional, para sesiones)</label>
            <input name="sena" type="number" step="0.01" value={form.sena} onChange={onChange} />
          </div>
          <div className="admin-form-field">
            <label>Stock (vacío = sin control de stock)</label>
            <input name="stock" type="number" value={form.stock} onChange={onChange} />
          </div>
        </div>

        <p className="admin-form-section-title">Detalles (sesiones / servicios)</p>
        <div className="admin-form-grid">
          <div className="admin-form-field">
            <label>Duración</label>
            <input name="duracion" value={form.duracion || ''} onChange={onChange} placeholder="Ej: 90 min" />
          </div>
          <div className="admin-form-field">
            <label>Modalidad</label>
            <input name="modalidad" value={form.modalidad || ''} onChange={onChange} placeholder="Ej: Online por Google Meet" />
          </div>
          <div className="admin-form-field full">
            <label>Incluye (separá con | )</label>
            <input name="incluye" value={form.incluye || ''} onChange={onChange} placeholder="Grabación|PDF de tu carta" />
          </div>
          <div className="admin-form-field admin-form-checkbox full">
            <input id="requiereDatos" name="requiereDatosNacimiento" type="checkbox" checked={form.requiereDatosNacimiento} onChange={onChange} />
            <label htmlFor="requiereDatos" style={{ margin:0 }}>Requiere datos de nacimiento (nombre, fecha, hora, lugar)</label>
          </div>
        </div>

        <p className="admin-form-section-title">Envío (solo productos físicos, para Fase 4 / Correo Argentino)</p>
        <div className="admin-form-grid">
          <div className="admin-form-field">
            <label>Peso (gramos)</label>
            <input name="pesoGramos" type="number" value={form.pesoGramos} onChange={onChange} />
          </div>
          <div className="admin-form-field">
            <label>Alto (cm)</label>
            <input name="altoCm" type="number" value={form.altoCm} onChange={onChange} />
          </div>
          <div className="admin-form-field">
            <label>Ancho (cm)</label>
            <input name="anchoCm" type="number" value={form.anchoCm} onChange={onChange} />
          </div>
          <div className="admin-form-field">
            <label>Largo (cm)</label>
            <input name="largoCm" type="number" value={form.largoCm} onChange={onChange} />
          </div>
        </div>

        <div className="admin-form-actions">
          <button type="button" className="btn-outline-white" onClick={onCancel} disabled={saving}>Cancelar</button>
          <button type="submit" className="btn-coral" disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</button>
        </div>
      </form>
    </div>
  )
}
