import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import ProductModal from '../components/ProductModal/ProductModal'
import ScrollReveal, { StaggerGroup, StaggerItem } from '../components/ScrollReveal/ScrollReveal'
import './Tienda.css'

/* ===== DATA ===== */
const GUIAS = [
  { id:1, tipo:'Producto', titulo:'Conectá con tu poder creador — guía de manifestación', precio:'$25.000', bg:'linear-gradient(145deg,#3a2040,#1a0d28)', emoji:'◈', tag:'Nuevo' },
]

const PROGRAMAS = [
  { id:2, tipo:'Producto', titulo:'Tribu & Diseño Humano — taller grupal de 3 semanas', precio:'$77.000', bg:'linear-gradient(145deg,#0d1f2d,#1a3040)', emoji:'✺', tag:'Oferta' },
  { id:3, tipo:'Producto', titulo:'Programa de transformación cuántica — pregrabado, 7 semanas', precio:'$111.000', bg:'linear-gradient(145deg,#2f4156,#19232e)', emoji:'⚛', tag:'Más vendido' },
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

      {toast && (
        <div className="toast-notification">
          <span>✓</span> Agregado al carrito
        </div>
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddCart={addToCart}
        />
      )}

      {/* ===== BANNER 1 — GUÍAS ===== */}
      <section className="tienda-banner tienda-banner-dark">
        <div className="tienda-banner-inner">
          <ScrollReveal direction="left">
            <div className="tienda-banner-book">
              <div className="book-mockup">
                <span style={{ fontSize:'4rem' }}>◈</span>
                <div className="book-label">
                  <span>Guía de</span>
                  <strong>Manifestación<br />Cuántica</strong>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <div className="tienda-banner-content">
              <h2 className="tienda-banner-title">
                Activá tu poder<br />
                <em>de manifestación</em>
              </h2>
              <p className="tienda-banner-desc">
                Si estás adentrándote en el mundo de la manifestación, esta guía es para vos: un espacio de
                aprendizaje, consciencia y reprogramación para volverte dueñx de tu realidad.
              </p>
              <Link to="#guias" className="btn-blue">Adquirí tu guía aquí</Link>
            </div>
          </ScrollReveal>
          <div className="tienda-banner-decor" />
        </div>
      </section>

      {/* ===== SECCIÓN GUÍAS ===== */}
      <section id="guias" className="tienda-section">
        <div className="container-astral">
          <ScrollReveal direction="up">
            <div className="tienda-section-header">
              <div>
                <p className="section-eyebrow">Recursos para tu proceso</p>
                <h2 className="tienda-section-title">
                  <em>Guías</em><br />descargables
                </h2>
              </div>
              <Link to="#guias" className="btn-outline-white">Ver todas</Link>
            </div>
          </ScrollReveal>
          <StaggerGroup className="tienda-products-grid" staggerDelay={0.12}>
            {GUIAS.map(item => (
              <StaggerItem key={item.id} direction="up">
                <ProductCard item={item} onView={setSelectedProduct} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ===== BANNER 2 — PROGRAMAS ===== */}
      <section className="tienda-banner tienda-banner-blue">
        <div className="tienda-banner-inner tienda-banner-inner-rev">
          <ScrollReveal direction="right">
            <div className="tienda-banner-content">
              <p className="tienda-banner-eyebrow">✦ Formación completa</p>
              <h2 className="tienda-banner-title tienda-banner-title-light">
                Habitá tu Diseño Humano<br />
                <em>desde la conciencia cuántica</em>
              </h2>
              <p className="tienda-banner-desc tienda-banner-desc-light">
                Pasá de la confusión y el autosabotaje a habitar tu Diseño Humano, liberar bloqueos y transformar
                tu energía en magnetismo, integrando principios cuánticos para crear desde tu esencia auténtica.
              </p>
              <Link to="#programas" className="btn-coral">Explorar programas</Link>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="left" delay={0.1}>
            <div className="tienda-banner-visual">
              <div className="course-mockup">
                {['⚛','✺','◈'].map((e,i) => (
                  <div key={i} className="course-icon-card" style={{ animationDelay:`${i*0.3}s` }}>{e}</div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SECCIÓN PROGRAMAS ===== */}
      <section id="programas" className="tienda-section tienda-section-alt">
        <div className="container-astral">
          <ScrollReveal direction="up">
            <div className="tienda-section-header">
              <div>
                <p className="section-eyebrow">Programas y talleres</p>
                <h2 className="tienda-section-title">
                  <em>Formación</em><br />en Diseño Humano
                </h2>
              </div>
              <Link to="#programas" className="btn-outline-white">Ver todos</Link>
            </div>
          </ScrollReveal>
          <StaggerGroup className="tienda-products-grid" staggerDelay={0.12}>
            {PROGRAMAS.map(item => (
              <StaggerItem key={item.id} direction="up">
                <ProductCard item={item} onView={setSelectedProduct} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <Footer />
    </>
  )
}
