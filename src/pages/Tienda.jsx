import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import ProductModal from '../components/ProductModal/ProductModal'
import './Tienda.css'

/* ===== DATA ===== */
const LIBROS = [
  { id:1, tipo:'Producto', titulo:'Horóscopo 2026: tu mapa energético del año', precio:'US$ 45', bg:'linear-gradient(145deg,#3a2040,#1a0d28)', emoji:'📕', tag:'Nuevo' },
  { id:2, tipo:'Producto', titulo:'Guía práctica para aprender a manifestar con el ciclo lunar', precio:'US$ 26', bg:'linear-gradient(145deg,#0d1f2d,#1a3040)', emoji:'🌙', tag:'' },
  { id:3, tipo:'Producto', titulo:'La herida del valor. Una guía práctica para el tránsito de Quirón en Tauro', precio:'US$ 15', bg:'linear-gradient(145deg,#1a1a2e,#2d2d4a)', emoji:'♄', tag:'' },
]

const CURSOS = [
  { id:4, tipo:'Producto', titulo:'Astrología práctica: interpretá tu carta natal desde cero', precio:'US$ 59', bg:'linear-gradient(145deg,#2f4156,#19232e)', emoji:'⭐', tag:'Más vendido' },
  { id:5, tipo:'Producto', titulo:'Tránsitos planetarios 2026: cómo aprovechar cada movimiento', precio:'US$ 39', bg:'linear-gradient(145deg,#19232e,#0d1520)', emoji:'🪐', tag:'' },
  { id:6, tipo:'Producto', titulo:'Kabbalah y astrología: un viaje hacia tu propósito de vida', precio:'US$ 49', bg:'linear-gradient(145deg,#3a2828,#2a1a1a)', emoji:'🔮', tag:'' },
]

function ProductCard({ item, onView }) {
  return (
    <div className="tienda-card" onClick={() => onView(item)} style={{ cursor:'pointer' }}>
      <div className="tienda-card-img" style={{ background: item.bg }}>
        <span className="tienda-card-emoji">{item.emoji}</span>
        {item.tag && <span className="tienda-card-tag">{item.tag}</span>}
      </div>
      <div className="tienda-card-body">
        <span className="tienda-card-tipo">{item.tipo}</span>
        <h3 className="tienda-card-title">{item.titulo}</h3>
        <div className="tienda-card-footer">
          <span className="tienda-card-precio">{item.precio}</span>
          <button className="btn-coral tienda-add-btn" onClick={(e) => {
            e.stopPropagation()
            onView(item)
          }}>
            Ver detalle
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Tienda() {
  const [cartItems, setCartItems] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [toast, setToast] = useState(null)

  const addToCart = (item) => {
    setCartItems(prev => {
      const exists = prev.find(i => i.id === item.id)
      if (exists) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + item.qty } : i)
      return [...prev, item]
    })
    setToast(item.titulo)
    setTimeout(() => setToast(null), 2500)
  }

  return (
    <>
      <Navbar cartCount={cartItems.reduce((a,i) => a+i.qty, 0)} />

      {/* Toast */}
      {toast && (
        <div className="toast-notification">
          <span>✓</span> Agregado al carrito
        </div>
      )}

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddCart={addToCart}
        />
      )}

      {/* ===== BANNER 1 — LIBROS ===== */}
      <section className="tienda-banner tienda-banner-dark">
        <div className="tienda-banner-inner">
          <div className="tienda-banner-book">
            <div className="book-mockup">
              <span style={{ fontSize:'4rem' }}>📕</span>
              <div className="book-label">
                <span>Guía para la</span>
                <strong>Temporada de<br />Eclipses 2026</strong>
              </div>
            </div>
          </div>
          <div className="tienda-banner-content">
            <h2 className="tienda-banner-title">
              Integra la energía<br />
              <em>de la temporada de eclipses</em>
            </h2>
            <p className="tienda-banner-desc">
              Descubrí qué hacer antes, durante y después de los eclipses en Leo y Piscis
              con esta guía descargable que incluye ejercicios prácticos.
            </p>
            <Link to="#libros" className="btn-blue">Adquirí tu guía aquí</Link>
          </div>
          <div className="tienda-banner-decor" />
        </div>
      </section>

      {/* ===== SECCIÓN LIBROS ===== */}
      <section id="libros" className="tienda-section">
        <div className="container-astral">
          <div className="tienda-section-header">
            <div>
              <p className="section-eyebrow">Lecturas recomendadas</p>
              <h2 className="tienda-section-title">
                <em>Favoritos</em><br />del momento
              </h2>
            </div>
            <Link to="#libros" className="btn-outline-white">Ver todos</Link>
          </div>
          <div className="tienda-products-grid">
            {LIBROS.map(item => <ProductCard key={item.id} item={item} onView={setSelectedProduct} />)}
          </div>
        </div>
      </section>

      {/* ===== BANNER 2 — CURSOS ===== */}
      <section className="tienda-banner tienda-banner-blue">
        <div className="tienda-banner-inner tienda-banner-inner-rev">
          <div className="tienda-banner-content">
            <p className="tienda-banner-eyebrow">✦ Formación completa</p>
            <h2 className="tienda-banner-title tienda-banner-title-light">
              Aprendé astrología<br />
              <em>desde adentro</em>
            </h2>
            <p className="tienda-banner-desc tienda-banner-desc-light">
              Cursos en profundidad para entender los tránsitos, la carta natal
              y las energías disponibles cada año. Aprendé a tu ritmo.
            </p>
            <Link to="#cursos" className="btn-coral">Explorar cursos</Link>
          </div>
          <div className="tienda-banner-visual">
            <div className="course-mockup">
              {['⭐','🪐','🔮'].map((e,i) => (
                <div key={i} className="course-icon-card" style={{ animationDelay:`${i*0.3}s` }}>{e}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECCIÓN CURSOS ===== */}
      <section id="cursos" className="tienda-section tienda-section-alt">
        <div className="container-astral">
          <div className="tienda-section-header">
            <div>
              <p className="section-eyebrow">Cursos y talleres</p>
              <h2 className="tienda-section-title">
                <em>Formación</em><br />astrológica
              </h2>
            </div>
            <Link to="#cursos" className="btn-outline-white">Ver todos</Link>
          </div>
          <div className="tienda-products-grid">
            {CURSOS.map(item => <ProductCard key={item.id} item={item} onView={setSelectedProduct} />)}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
