import { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import ProductModal from '../components/ProductModal/ProductModal'
import ScrollReveal, { StaggerGroup, StaggerItem } from '../components/ScrollReveal/ScrollReveal'
import './Tienda.css'

/* ── PRODUCTOS (físicos y digitales) ──
   contacto: 'mail' | 'proximamente' — no hay pasarela de pago real, así que
   todo lo que no tiene precio fijo se resuelve por consulta directa. */
const PRODUCTOS = [
  {
    id:1, tipo:'Guía física', titulo:'Conectá con tu poder creador — guía de manifestación',
    precio:'$25.000', bg:'linear-gradient(145deg,#3a2040,#1a0d28)', emoji:'◈',
    contacto:'mail',
    desc:'Una guía impresa para adentrarte en el mundo de la manifestación: aprendizaje, consciencia y reprogramación para volverte dueñx de tu realidad. (Descripción a confirmar con foto real).',
  },
  {
    id:2, tipo:'Oráculo', titulo:'Oráculo Matriz Cuántica',
    precio:'Coming soon', bg:'linear-gradient(145deg,#2f4156,#19232e)', emoji:'⬡', tag:'Coming soon',
    contacto:'proximamente',
    desc:'Mi propio oráculo, en camino. Dejá tu mail y te aviso apenas esté disponible.',
  },
  {
    id:3, tipo:'Oráculo', titulo:'Oráculo 11:11',
    precio:'Consultar', bg:'linear-gradient(145deg,#1a3040,#0d1f2d)', emoji:'✦',
    contacto:'mail',
    desc:'(Descripción e imagen a confirmar).',
  },
  {
    id:4, tipo:'Oráculo', titulo:'Oráculo Espejo del alma',
    precio:'Consultar', bg:'linear-gradient(145deg,#2d2d4a,#1a1a2e)', emoji:'◐',
    contacto:'mail',
    desc:'(Descripción e imagen a confirmar).',
  },
  {
    id:5, tipo:'Cuadro original', titulo:'Cuadros pintados a mano',
    precio:'Consultar', bg:'linear-gradient(145deg,#4a2d1a,#2a1810)', emoji:'▲', tag:'Según disponibilidad',
    contacto:'mail',
    desc:'Obras únicas, pintadas a mano. La disponibilidad varía según lo que tenga pintado en el momento — escribime y te cuento qué hay.',
  },
]

/* ── SERVICIOS / SESIONES — se coordinan por WhatsApp, no tienen precio fijo ── */
const SESIONES = [
  { id:10, tipo:'Sesión 1:1',       titulo:'El poder de recordar — sesión individual',        precio:'Consultar', bg:'linear-gradient(145deg,#2f4156,#19232e)', emoji:'✦', contacto:'whatsapp' },
  { id:11, tipo:'Pack x4',          titulo:'Del macro al micro cosmos — pack de 4 sesiones',  precio:'Consultar', bg:'linear-gradient(145deg,#3a5069,#2f4156)', emoji:'◈', contacto:'whatsapp' },
  { id:12, tipo:'Sesión 1:1',       titulo:'On demand — sesión individual',                   precio:'Consultar', bg:'linear-gradient(145deg,#1a3040,#0d1f2d)', emoji:'⚡', contacto:'whatsapp' },
  { id:13, tipo:'Lectura vincular', titulo:'Sinergia frecuencial — lectura vincular',          precio:'Consultar', bg:'linear-gradient(145deg,#0d1520,#19232e)', emoji:'∿', contacto:'whatsapp' },
  { id:14, tipo:'PDF',              titulo:'Informe personalizado — PDF',                      precio:'Consultar', bg:'linear-gradient(145deg,#2d2d4a,#1a1a2e)', emoji:'◎', contacto:'whatsapp' },
]

/* ── PROGRAMAS Y TALLERES — la compra final ocurre en Tiendup / la landing que use;
      acá solo se muestra la info y se deriva al link real. ── */
const PROGRAMAS = [
  {
    id:20, tipo:'Programa pregrabado', titulo:'Programa de transformación cuántica — 7 semanas',
    precio:'$111.000', bg:'linear-gradient(145deg,#2f4156,#19232e)', emoji:'⚛', tag:'Más vendido',
    contacto:'link', link:'https://byvalentinam.tiendup.com/curso/programadetransformacioncuantica', linkLabel:'Ver programa completo',
    desc:'7 semanas de contenido pregrabado para integrar tu Diseño Humano desde la conciencia cuántica: liberar bloqueos y transformar tu energía en magnetismo.',
  },
]

/* ── CARD única para productos, servicios y programas ── */
function TiendaCard({ item, onView, delay = 0 }) {
  const isProximo = item.contacto === 'proximamente'
  return (
    <div className="tienda-card" onClick={() => onView(item)} style={{ cursor:'pointer', animationDelay:`${delay}s` }}>
      <div className="tienda-card-img" style={{ background: item.bg }}>
        {item.foto
          ? <img src={item.foto} alt={item.titulo} className="tienda-card-photo" />
          : <span className="tienda-card-emoji">{item.emoji}</span>
        }
        {item.tag && <span className="tienda-card-tag">{item.tag}</span>}
      </div>
      <div className="tienda-card-body">
        <span className="tienda-card-tipo">{item.tipo}</span>
        <h3 className="tienda-card-title">{item.titulo}</h3>
        <div className="tienda-card-footer">
          <span className="tienda-card-precio">{item.precio}</span>
          <button className="btn-coral tienda-add-btn" onClick={e => { e.stopPropagation(); onView(item) }}>
            {isProximo ? 'Ver más' : 'Ver detalle'}
          </button>
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

      {/* PRODUCTOS */}
      <section id="productos" className="tienda-section tienda-section-first">
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
                <TiendaCard item={item} onView={setSelectedProduct} />
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
                <TiendaCard item={item} onView={setSelectedProduct} />
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
                <TiendaCard item={item} onView={setSelectedProduct} />
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
