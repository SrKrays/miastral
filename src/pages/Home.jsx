import { useState, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import ProductModal from '../components/ProductModal/ProductModal'
import AnimatedIcon from '../components/AnimatedIcon/AnimatedIcon'
import ScrollReveal, { StaggerGroup, StaggerItem } from '../components/ScrollReveal/ScrollReveal'
import './Home.css'

const TorusFieldScene = lazy(() => import('../components/TorusField/TorusFieldScene'))

const BEST_SELLERS = [
  { id:1, tipo:'Guía práctica', titulo:'Manifestá con el ciclo lunar', precio:'US$ 26', bg:'linear-gradient(145deg,#2f4156,#19232e)', emoji:'🌙', tag:'' },
  { id:2, tipo:'Libro',         titulo:'La herida del valor — Quirón en Tauro', precio:'US$ 15', bg:'linear-gradient(145deg,#3a5069,#2f4156)', emoji:'♄', tag:'' },
  { id:3, tipo:'Guía práctica', titulo:'Guía para la temporada de eclipses 2026', precio:'US$ 15', bg:'linear-gradient(145deg,#4a6787,#3a5069)', emoji:'☀', tag:'' },
]

const TOOLS = [
  { icon:'constellation', title:'Calculá tu carta astral', desc:'Conocé el mapa de los planetas al momento de tu nacimiento. Entendé tus talentos, personalidad y propósito de vida.', link:'/astrologia', cta:'Calcular gratis' },
  { icon:'orbit', title:'Tránsitos diarios', desc:'Sabé cómo se mueven los planetas hoy y comprendé qué energía está influyendo en vos para tomar mejores decisiones.', link:'/astrologia', cta:'Ver tránsitos de hoy' },
]

const BENEFITS = [
  'Guía con clases semanales actualizadas',
  'Horóscopos para los 12 signos cada domingo',
  'Encuentros en vivo con la astróloga',
  'Biblioteca con más de 15 años de contenido',
  'Meditaciones y ejercicios prácticos',
]

function ProductCard({ item, onView }) {
  return (
    <div className="product-card" onClick={() => onView(item)} style={{ cursor:'pointer' }}>
      <div className="product-card-img-placeholder" style={{ background:item.bg }}>
        <span style={{ fontSize:'3.5rem', opacity:0.6 }}>{item.emoji}</span>
      </div>
      <div className="product-card-body">
        <div className="product-card-category">{item.tipo}</div>
        <div className="product-card-title">{item.titulo}</div>
        <div className="tienda-card-footer">
          <span className="product-card-price">{item.precio}</span>
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

export default function Home() {
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

      {/* HERO */}
      <section className="hero">
        <Suspense fallback={null}>
          <TorusFieldScene className="hero-torus" />
        </Suspense>
        <div className="hero-content">
          <ScrollReveal direction="down" delay={0}>
            <div className="hero-eyebrow">Bienvenid@ ✦</div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h1 className="hero-title">¡Hola,<br />astrolover!</h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="hero-subtitle">¿Buscás una guía astrológica para navegar los 365 días del año?<br /><strong>Estás en el lugar correcto.</strong></p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="hero-tagline">Explorá todo lo que tenemos para vos.</p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.4}>
            <div className="hero-cta" style={{ display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center' }}>
              <Link to="/tienda" className="btn-coral">Quiero explorar</Link>
              <Link to="/conoce" className="btn-outline-dark">Conocé más</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="bestsellers">
        <div className="container-astral">
          <ScrollReveal direction="up">
            <div className="bestsellers-header">
              <div style={{ display:'flex',flexDirection:'column',alignItems:'flex-start' }}>
                <span className="bs-title-italic">Best</span>
                <span className="bs-title-bold">sellers</span>
              </div>
              <Link to="/tienda" className="btn-outline-white">Ver productos</Link>
            </div>
          </ScrollReveal>
          <StaggerGroup className="products-grid" staggerDelay={0.15}>
            {BEST_SELLERS.map(item => (
              <StaggerItem key={item.id} direction="up">
                <ProductCard item={item} onView={setSelectedProduct} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* HERRAMIENTAS */}
      <section className="tools-section section-astral">
        <div className="container-astral">
          <ScrollReveal direction="up">
            <p className="section-eyebrow" style={{ textAlign:'center' }}>Herramientas gratuitas</p>
            <h2 className="section-title-display" style={{ textAlign:'center',marginBottom:12 }}>Estudiá tu carta astral</h2>
            <p className="section-subtitle" style={{ textAlign:'center',marginBottom:48 }}>El primer paso es calculá tu carta. Aprendé a interpretarla con recursos gratuitos.</p>
          </ScrollReveal>
          <StaggerGroup className="tools-grid" staggerDelay={0.18}>
            {TOOLS.map((t) => (
              <StaggerItem key={t.title} direction="up">
                <div className="tool-card">
                  <div className="tool-card-icon">
                    <AnimatedIcon type={t.icon} size={52} />
                  </div>
                  <h3 className="tool-card-title">{t.title}</h3>
                  <p className="tool-card-desc">{t.desc}</p>
                  <Link to={t.link} className="btn-blue" style={{ fontSize:11 }}>{t.cta}</Link>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* TRANSFORMÁ LA DUDA */}
      <section className="membresia-banner section-astral">
        <div className="container-astral">
          <div className="membresia-inner">
            <ScrollReveal direction="left">
              <div>
                <div className="membresia-tag">Astrología &amp; Bienestar</div>
                <h2 className="membresia-title">Transformá la duda<br /><em>en decisión</em></h2>
                <p className="membresia-desc">La astrología es una herramienta para conocerte mejor y tomar decisiones con certeza.</p>
                <ul className="membresia-benefits">
                  {BENEFITS.map((b, i) => (
                    <ScrollReveal key={b} as="li" direction="left" delay={i * 0.08} duration={0.5}>
                      <span className="benefit-star">✦</span><span>{b}</span>
                    </ScrollReveal>
                  ))}
                </ul>
                <Link to="/conoce" className="btn-coral">Conocé más</Link>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.15}>
              <div className="membresia-video-wrap">
                <div className="membresia-video-placeholder">
                  <div className="play-icon">▶</div>
                  <p style={{ fontSize:12, fontFamily:'var(--font-label)', letterSpacing:'0.1em', textTransform:'uppercase' }}>¡Bienvenid@, Astrolover!</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
