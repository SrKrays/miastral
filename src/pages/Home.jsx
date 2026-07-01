import { useState, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import ProductModal from '../components/ProductModal/ProductModal'
import AnimatedIcon from '../components/AnimatedIcon/AnimatedIcon'
import ScrollReveal, { StaggerGroup, StaggerItem } from '../components/ScrollReveal/ScrollReveal'
import MagneticButton from '../components/MagneticButton/MagneticButton'
import TiltCard from '../components/TiltCard/TiltCard'
import './Home.css'

const TorusFieldScene = lazy(() => import('../components/TorusField/TorusFieldScene'))

const BEST_SELLERS = [
  { id:20, tipo:'Programa', titulo:'Programa de transformación cuántica', precio:'$111.000', bg:'linear-gradient(145deg,#2f4156,#19232e)', emoji:'⚛', tag:'',
    contacto:'link', link:'https://byvalentinam.tiendup.com/curso/programadetransformacioncuantica', linkLabel:'Ver programa completo',
    desc:'7 semanas de contenido pregrabado para integrar tu Diseño Humano desde la conciencia cuántica: liberar bloqueos y transformar tu energía en magnetismo.' },
  { id:11, tipo:'Sesiones', titulo:'Del macro al micro cosmos — pack x4 sesiones personalizadas', precio:'Consultar', bg:'linear-gradient(145deg,#3a5069,#2f4156)', emoji:'∿', tag:'',
    contacto:'whatsapp' },
  { id:2, tipo:'Oráculo', titulo:'Oráculo Matriz Cuántica', precio:'Coming soon', bg:'linear-gradient(145deg,#4a6787,#3a5069)', emoji:'⬡', tag:'Coming soon',
    contacto:'proximamente', desc:'Mi propio oráculo, en camino. Dejá tu mail y te aviso apenas esté disponible.' },
]

const TOOLS = [
  { icon:'constellation', title:'Calculá tu carta de Diseño Humano', desc:'Con tu fecha, hora y lugar de nacimiento, descubrí tu BodyGraph: el mapa que revela cómo estás diseñadx para tomar decisiones, relacionarte y vivir con autenticidad.', link:'/diseno-humano', cta:'Calcular gratis' },
  { icon:'orbit', title:'Conocé tu Tipo, Estrategia y Autoridad', desc:'Los 3 pilares de tu energía: tu naturaleza, tu manera única de moverte por la vida y tu brújula interna para decisiones alineadas.', link:'/diseno-humano', cta:'Descubrir más' },
]

const BENEFITS = [
  'Talleres y encuentros para integrar tu carta',
  'Guías descargables para cada tipo energético',
  'Sesiones grupales y personalizadas',
  'Comunidad para acompañarte en el proceso',
  'Material práctico para encarnar tu energía',
]

function ProductCard({ item, onView }) {
  return (
    <TiltCard maxTilt={8}>
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
    </TiltCard>
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
            <div className="hero-eyebrow">Bienvenidx a mi tribu ✦</div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h1 className="hero-title">El poder de recordar<br />quién eres.</h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="hero-subtitle">La transformación ocurre cuando dejás de resistirte a tu propia naturaleza y abrazás todo eso que ya te habita.<br /><strong>Es hora de volver a tu frecuencia.</strong></p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="hero-tagline">Diseño Humano, Física cuántica y Autoconocimiento</p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.4}>
            <div className="hero-cta" style={{ display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center' }}>
              <MagneticButton><Link to="/diseno-humano" className="btn-coral">Conocé más de DH</Link></MagneticButton>
              <MagneticButton strength={0.25}><Link to="/tienda" className="btn-sand">Explorá tu carta conmigo</Link></MagneticButton>
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
            <h2 className="section-title-display" style={{ textAlign:'center',marginBottom:12 }}>Conocé tu carta de Diseño Humano</h2>
            <p className="section-subtitle" style={{ textAlign:'center',marginBottom:48 }}>El primer paso es calcular tu carta. Aprendé a interpretarla con recursos gratuitos.</p>
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
                <div className="membresia-tag">Diseño Humano &amp; Física Cuántica</div>
                <h2 className="membresia-title">De la mente<br /><em>a la conciencia corporal</em></h2>
                <p className="membresia-desc">El Diseño Humano es una herramienta para conocerte mejor, volver al cuerpo y tomar decisiones alineadas a tu propia verdad, dejando de lado el plano de la mente. En este espacio vas a encontrar:</p>
                <ul className="membresia-benefits">
                  {BENEFITS.map((b, i) => (
                    <ScrollReveal key={b} as="li" direction="left" delay={i * 0.08} duration={0.5}>
                      <span className="benefit-star">✦</span><span>{b}</span>
                    </ScrollReveal>
                  ))}
                </ul>
                <Link to="/membresia" className="btn-coral">Conocé más</Link>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.15}>
              <div className="membresia-video-wrap">
                <div className="membresia-video-placeholder">
                  <div className="play-icon">▶</div>
                  <p style={{ fontSize:12, fontFamily:'var(--font-label)', letterSpacing:'0.1em', textTransform:'uppercase' }}>¡Bienvenidx a esta tribu!</p>
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
