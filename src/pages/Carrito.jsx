import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './Carrito.css'

// Datos de ejemplo para mostrar la UI
const INITIAL_ITEMS = [
  { id:1, titulo:'Horóscopo 2026: tu mapa energético del año', precio:45, qty:1, emoji:'📕' },
  { id:2, titulo:'Guía práctica para manifestar con el ciclo lunar', precio:26, qty:1, emoji:'🌙' },
]

export default function Carrito() {
  const [items, setItems] = useState(INITIAL_ITEMS)
  const [checkoutStep, setCheckoutStep] = useState(0) // 0=carrito, 1=envio, 2=confirmacion

  const updateQty = (id, delta) => {
    setItems(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    )
  }
  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id))
  const total = items.reduce((acc, i) => acc + i.precio * i.qty, 0)

  if (checkoutStep === 2) return <OrderConfirmed />

  return (
    <>
      <Navbar cartCount={items.reduce((a,i) => a+i.qty, 0)} />

      <section className="carrito-section">
        <div className="container-astral">

          {/* Steps */}
          <div className="carrito-steps">
            {['Carrito', 'Datos de envío', 'Confirmación'].map((s, i) => (
              <div key={s} className={`step ${checkoutStep === i ? 'active' : ''} ${checkoutStep > i ? 'done' : ''}`}>
                <span className="step-num">{checkoutStep > i ? '✓' : i+1}</span>
                <span className="step-label">{s}</span>
                {i < 2 && <span className="step-line" />}
              </div>
            ))}
          </div>

          {items.length === 0 ? (
            <div className="carrito-empty">
              <span style={{ fontSize:'4rem' }}>🛒</span>
              <h2>Tu carrito está vacío</h2>
              <p>Explorá nuestra tienda y encontrá lo que necesitás.</p>
              <Link to="/tienda" className="btn-coral">Ir a la tienda</Link>
            </div>
          ) : checkoutStep === 0 ? (
            <div className="carrito-layout">
              {/* Items */}
              <div className="carrito-items">
                <h2 className="carrito-title">Tu carrito</h2>
                {items.map(item => (
                  <div key={item.id} className="carrito-item anim-fadeInUp">
                    <div className="carrito-item-img">
                      <span style={{ fontSize:'2rem' }}>{item.emoji}</span>
                    </div>
                    <div className="carrito-item-info">
                      <p className="carrito-item-title">{item.titulo}</p>
                      <p className="carrito-item-precio">US$ {item.precio}</p>
                    </div>
                    <div className="carrito-item-qty">
                      <button onClick={() => updateQty(item.id, -1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, +1)}>+</button>
                    </div>
                    <div className="carrito-item-subtotal">US$ {(item.precio * item.qty).toFixed(2)}</div>
                    <button className="carrito-remove" onClick={() => remove(item.id)} aria-label="Eliminar">✕</button>
                  </div>
                ))}
              </div>

              {/* Resumen */}
              <div className="carrito-summary">
                <h3 className="summary-title">Resumen del pedido</h3>
                <div className="summary-rows">
                  {items.map(i => (
                    <div key={i.id} className="summary-row">
                      <span>{i.titulo.substring(0,32)}…</span>
                      <span>US$ {(i.precio * i.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="summary-divider" />
                <div className="summary-total">
                  <span>Total</span>
                  <strong>US$ {total.toFixed(2)}</strong>
                </div>
                <button className="btn-coral summary-cta" onClick={() => setCheckoutStep(1)}>
                  Continuar al checkout
                </button>
                <Link to="/tienda" className="summary-back">← Seguir comprando</Link>
              </div>
            </div>
          ) : (
            <ShippingForm total={total} onConfirm={() => setCheckoutStep(2)} onBack={() => setCheckoutStep(0)} />
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}

function ShippingForm({ total, onConfirm, onBack }) {
  const [form, setForm] = useState({ nombre:'', email:'', telefono:'', calle:'', ciudad:'', provincia:'', cp:'', pais:'Argentina' })
  const [errors, setErrors] = useState({})

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    const e = {}
    if (!form.nombre)    e.nombre    = 'Requerido'
    if (!form.email)     e.email     = 'Requerido'
    if (!form.telefono)  e.telefono  = 'Requerido'
    if (!form.calle)     e.calle     = 'Requerido'
    if (!form.ciudad)    e.ciudad    = 'Requerido'
    if (!form.provincia) e.provincia = 'Requerido'
    if (!form.cp)        e.cp        = 'Requerido'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = e => { e.preventDefault(); if (validate()) onConfirm() }

  return (
    <div className="shipping-layout">
      <div className="shipping-form-wrap">
        <h2 className="carrito-title">Datos de envío</h2>
        <form className="shipping-form" onSubmit={submit}>
          <div className="shipping-row">
            <Field label="Nombre completo" name="nombre" value={form.nombre} onChange={handle} error={errors.nombre} />
            <Field label="Email" name="email" type="email" value={form.email} onChange={handle} error={errors.email} />
          </div>
          <Field label="Teléfono" name="telefono" value={form.telefono} onChange={handle} error={errors.telefono} />
          <Field label="Calle y número" name="calle" value={form.calle} onChange={handle} error={errors.calle} />
          <div className="shipping-row">
            <Field label="Ciudad" name="ciudad" value={form.ciudad} onChange={handle} error={errors.ciudad} />
            <Field label="Provincia" name="provincia" value={form.provincia} onChange={handle} error={errors.provincia} />
          </div>
          <div className="shipping-row">
            <Field label="Código postal" name="cp" value={form.cp} onChange={handle} error={errors.cp} />
            <Field label="País" name="pais" value={form.pais} onChange={handle} error={errors.pais} />
          </div>
          <div className="shipping-actions">
            <button type="button" className="btn-outline-white" onClick={onBack}>← Volver</button>
            <button type="submit" className="btn-coral">Confirmar pedido — US$ {total.toFixed(2)}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, name, type='text', value, onChange, error }) {
  return (
    <div className="shipping-field">
      <label className="auth-label">{label}</label>
      <input className={`auth-input${error ? ' input-error' : ''}`} type={type} name={name} value={value} onChange={onChange} />
      {error && <span className="field-error">{error}</span>}
    </div>
  )
}

function OrderConfirmed() {
  return (
    <>
      <Navbar />
      <section className="confirm-section">
        <div className="confirm-card anim-scaleIn">
          <div className="confirm-icon">✓</div>
          <h2 className="confirm-title">¡Pedido confirmado!</h2>
          <p className="confirm-desc">Gracias por tu compra. Recibirás un email con los detalles y tu próximo paso.</p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap', marginTop:32 }}>
            <Link to="/"       className="btn-outline-white">Ir al inicio</Link>
            <Link to="/tienda" className="btn-coral">Seguir comprando</Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
