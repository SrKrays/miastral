import { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import ProductModal from '../components/ProductModal/ProductModal'
import ScrollReveal, { StaggerGroup, StaggerItem } from '../components/ScrollReveal/ScrollReveal'
import './Tienda.css'

/* ── PRODUCTOS (físicos y digitales) ── */
const PRODUCTOS = [
  { id:1,  tipo:'Guía digital',  titulo:'Conecta con tu poder creador — guía de manifestación', precio:'$25.000', bg:'linear-gradient(145deg,#3a2040,#1a0d28)', emoji:'◈', tag:'', email:true },
  { id:2,  tipo:'Oráculo',       titulo:'Oráculo Matriz Cuántica', precio:'Próximamente', bg:'linear-gradient(145deg,#2f4156,#19232e)', emoji:'⬡', tag:'Pronto', proximamente:true },
  { id:3,  tipo:'Oráculo',       titulo:'Oráculo 11:11', precio:'Consultar', bg:'linear-gradient(145deg,#1a3040,#0d1f2d)', emoji:'✦', tag:'', email:true },
  { id:4,  tipo:'Oráculo',       titulo:'Oráculo Espejo del alma', precio:'Consultar', bg:'linear-gradient(145deg,#2d2d4a,#1a1a2e)', emoji:'◐', tag:'', email:true },
]

/* ── SERVICIOS / SESIONES ── */
const SESIONES = [
  { id:10, tipo:'Sesión 1:1',    titulo:'El poder de recordar — sesión individual',              precio:'Consultar', bg:'linear-gradient(145deg,#2f4156,#19232e)', emoji:'✦' },
  { id:11, tipo:'Pack x4',       titulo:'Del macro al micro cosmos — pack de 4 sesiones',         precio:'Consultar', bg:'linear-gradient(145deg,#3a5069,#2f4156)', emoji:'◈' },
  { id:12, tipo:'Sesión 1:1',    titulo:'On demand — sesión individual',                          precio:'Consultar', bg:'linear-gradient(145deg,#1a3040,#0d1f2d)', emoji:'⚡' },
  { id:13, tipo:'Lectura vincular', titulo:'Sinergia frecuencial — lectura vincular',             precio:'Consultar', bg:'linear-gradient(145deg,#0d1520,#19232e)', emoji:'∿' },
  { id:14, tipo:'PDF',           titulo:'Informe personalizado — PDF',                            precio:'Consultar', bg:'linear-gradient(145deg,#2d2d4a,#1a1a2e)', emoji:'◎' },
]

/* ── PROGRAMAS Y TALLERES ── */
const PROGRAMAS = [
  { id:20, tipo:'Programa pregrabado', titulo:'Programa de transformación cuántica — 7 semanas', precio:'$111.000', bg:'linear-gradient(145deg,#2f4156,#19232e)', emoji:'⚛', tag:'Más vendido', link:'https://byvalentinam.tiendup.com/curso/programadetransformacioncuantica' },
]

/* ── CARD DE PRODUCTO ── */
function ProductCard({ item, onView }) {
  const isProximo = item.proximamente
  return (
    <div className={`tienda-card${isProximo ? ' tienda-card--pronto' : ''}`}
      onClick={() => !isProximo && onView(item)}
      style={{ cursor: isProximo ? 'default' : 'pointer' }}>
      <div className="tienda-card-img" style={{ background: item.bg }}>
        <span className="tienda-card-emoji">{item.emoji}</span>
        {item.tag && <span className="tienda-card-tag">{item.tag}</span>}
      </div>
      <div className="tienda-card-body">
        <span className="tienda-card-tipo">{item.tipo}</span>
        <h3 className="tienda-card-title">{item.titulo}</h3>
        <div className="tienda-card-footer">
          <span className="tienda-card-precio">{item.precio}</span>
          {!isProximo && (
            item.email
              ? <a href={`mailto:valemelchior@gmail.com?subject=Consulta sobre: ${encodeURIComponent(item.titulo)}`}
                   className="btn-coral tienda-add-btn">Consultar por mail</a>
              : <button className="btn-coral tienda-add-btn" onClick={e => { e.stopPropagation(); onView(item) }}>Ver detalle</button>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── CARD DE SESIÓN ── */
function SesionCard({ item }) {
  return (
    <div className="tienda-card">
      <div className="tienda-card-img" style={{ background: item.bg }}>
        <span className="tienda-card-emoji">{item.emoji}</span>
      </div>
      <div className="tienda-card-body">
        <span className="tienda-card-tipo">{item.tipo}</span>
        <h3 className="tienda-card-title">{item.titulo}</h3>
        <div className="tienda-card-footer">
          <span className="tienda-card-precio">{item.precio}</span>
          <a href={`https://api.whatsapp.com/send?phone=5493512115420&text=Hola%21%20me%20interesa%20la%20${encodeURIComponent(item.titulo)}`}
             target="_blank" rel="noopener noreferrer" className="btn-sand tienda-add-btn">
            Consultar por WP
          </a>
        </div>
      </div>
    </div>
  )
}

/* ── CARD DE PROGRAMA ── */
function ProgramaCard({ item }) {
  return (
    <div className="tienda-card">
      <div className="tienda-card-img" style={{ background: item.bg }}>
        <span className="tienda-card-emoji">{item.emoji}</span>
        {item.tag && <span className="tienda-card-tag">{item.tag}</span>}
      </div>
      <div className="tienda-card-body">
        <span className="tienda-card-tipo">{item.tipo}</span>
        <h3 className="tienda-card-title">{item.titulo}</h3>
        <div className="tienda-card-footer">
          <span className="tienda-card-precio">{item.precio}</span>
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn-coral tienda-add-btn">Ver programa</a>
        </div>
      </div>
    </div>
  )
}

export default function Tienda() {
  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <>
      <Navbar />

      {/* BANNER */}
      <section className="tienda-banner">
        <h1 className="tienda-banner-title">Tienda</h1>
        <p className="tienda-banner-subtitle">Servicios, productos y programas para acompañarte en tu proceso</p>
      </section>

      {/* PRODUCTOS */}
      <section id="productos" className="tienda-section">
        <div className="container-astral">
          <ScrollReveal direction="up">
            <div className="tienda-section-header">
              <h2 className="tienda-section-title">Productos</h2>
              <p className="tienda-section-desc">Guías, oráculos y materiales para tu proceso de autoconocimiento</p>
            </div>
          </ScrollReveal>
          <StaggerGroup className="tienda-grid" staggerDelay={0.12}>
            {PRODUCTOS.map(item => (
              <StaggerItem key={item.id} direction="up">
                <ProductCard item={item} onView={setSelectedProduct} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* SESIONES */}
      <section id="sesiones" className="tienda-section tienda-section-alt">
        <div className="container-astral">
          <ScrollReveal direction="up">
            <div className="tienda-section-header">
              <h2 className="tienda-section-title">Servicios</h2>
              <p className="tienda-section-desc">Sesiones individuales y lecturas personalizadas de Diseño Humano</p>
            </div>
          </ScrollReveal>
          <StaggerGroup className="tienda-grid" staggerDelay={0.12}>
            {SESIONES.map(item => (
              <StaggerItem key={item.id} direction="up">
                <SesionCard item={item} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* PROGRAMAS */}
      <section id="programas" className="tienda-section">
        <div className="container-astral">
          <ScrollReveal direction="up">
            <div className="tienda-section-header">
              <h2 className="tienda-section-title">Programas y talleres</h2>
              <p className="tienda-section-desc">Experiencias grupales e intensivos de transformación</p>
            </div>
          </ScrollReveal>
          <StaggerGroup className="tienda-grid" staggerDelay={0.12}>
            {PROGRAMAS.map(item => (
              <StaggerItem key={item.id} direction="up">
                <ProgramaCard item={item} />
              </StaggerItem>
            ))}
          </StaggerGroup>
          <p className="tienda-nota">
            ✦ Los programas y talleres en vivo se publican a medida que se confirman fechas. Seguí las novedades en Instagram <a href="https://www.instagram.com/byvalentinam__/" target="_blank" rel="noopener noreferrer" className="contacto-link">@byvalentinam__</a>
          </p>
        </div>
      </section>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddCart={() => setSelectedProduct(null)}
        />
      )}

      <Footer />
    </>
  )
}
