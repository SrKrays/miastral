import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './Home.css'

const BEST_SELLERS = [
  { id:1, category:'Guía práctica', title:'Manifestá con el ciclo lunar', price:'US$ 26', bg:'linear-gradient(145deg,#2f4156,#19232e)', emoji:'🌙' },
  { id:2, category:'Libro',         title:'La herida del valor — Quirón en Tauro', price:'US$ 15', bg:'linear-gradient(145deg,#3a5069,#2f4156)', emoji:'♄' },
  { id:3, category:'Guía práctica', title:'Guía para la temporada de eclipses 2026', price:'US$ 15', bg:'linear-gradient(145deg,#4a6787,#3a5069)', emoji:'☀' },
]

const TOOLS = [
  { icon:'✦', title:'Calculá tu carta astral', desc:'Conocé el mapa de los planetas al momento de tu nacimiento. Entendé tus talentos, personalidad y propósito de vida.', link:'/astrologia#carta', cta:'Calcular gratis' },
  { icon:'◑', title:'Tránsitos diarios', desc:'Sabé cómo se mueven los planetas hoy y comprendé qué energía está influyendo en vos para tomar mejores decisiones.', link:'/astrologia#transitos', cta:'Ver tránsitos de hoy' },
]

const BENEFITS = [
  'Guía con clases semanales actualizadas',
  'Horóscopos para los 12 signos cada domingo',
  'Encuentros en vivo con la astróloga',
  'Biblioteca con más de 15 años de contenido',
  'Meditaciones y ejercicios prácticos',
]

function ProductCard({ product, delay }) {
  return (
    <div className="product-card anim-fadeInUp" style={{ animationDelay:`${delay}s` }}>
      <div className="product-card-img-placeholder" style={{ background:product.bg }}>
        <span style={{ fontSize:'3.5rem', opacity:0.6 }}>{product.emoji}</span>
      </div>
      <div className="product-card-body">
        <div className="product-card-category">{product.category}</div>
        <div className="product-card-title">{product.title}</div>
        <div className="product-card-price">{product.price}</div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-photo">
          <div style={{ width:'100%',height:'100%',background:'linear-gradient(160deg,#d1dbe6 0%,#b3c3d5 100%)',display:'flex',alignItems:'flex-end',justifyContent:'center' }}>
            <div style={{ width:'78%',height:'90%',background:'linear-gradient(180deg,#96acc5 0%,#7894b5 100%)',borderRadius:'12px 12px 0 0',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'5rem',opacity:0.3 }}>✦</div>
          </div>
        </div>
        <div className="hero-content">
          <div className="hero-eyebrow">Bienvenid@ ✦</div>
          <h1 className="hero-title">¡Hola,<br />astrolover!</h1>
          <p className="hero-subtitle">¿Buscás una guía astrológica para navegar los 365 días del año?<br /><strong>Estás en el lugar correcto.</strong></p>
          <p className="hero-tagline">Explorá todo lo que tenemos para vos.</p>
          <div className="hero-cta" style={{ display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center' }}>
            <Link to="/tienda" className="btn-coral">Quiero explorar</Link>
            <Link to="/conoce" className="btn-outline-dark">Conocé más</Link>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="bestsellers">
        <div className="container-astral">
          <div className="bestsellers-header">
            <div style={{ display:'flex',flexDirection:'column',alignItems:'flex-start' }}>
              <span className="bs-title-italic">Best</span>
              <span className="bs-title-bold">sellers</span>
            </div>
            <Link to="/tienda" className="btn-outline-white">Ver productos</Link>
          </div>
          <div className="products-grid">
            {BEST_SELLERS.map((p,i) => <ProductCard key={p.id} product={p} delay={i*0.12} />)}
          </div>
        </div>
      </section>

      {/* HERRAMIENTAS */}
      <section className="tools-section section-astral">
        <div className="container-astral">
          <p className="section-eyebrow" style={{ textAlign:'center' }}>Herramientas gratuitas</p>
          <h2 className="section-title-display" style={{ textAlign:'center',marginBottom:12 }}>Estudiá tu carta astral</h2>
          <p className="section-subtitle" style={{ textAlign:'center',marginBottom:48 }}>El primer paso es calculá tu carta. Aprendé a interpretarla con recursos gratuitos.</p>
          <div className="tools-grid">
            {TOOLS.map((t,i) => (
              <div key={t.title} className={`tool-card anim-fadeInUp delay-${i+1}`}>
                <div className="tool-card-icon">{t.icon}</div>
                <h3 className="tool-card-title">{t.title}</h3>
                <p className="tool-card-desc">{t.desc}</p>
                <Link to={t.link} className="btn-blue" style={{ fontSize:11 }}>{t.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSFORMÁ LA DUDA — sin countdown, botón "Conocé más" */}
      <section className="membresia-banner section-astral">
        <div className="container-astral">
          <div className="membresia-inner">
            <div>
              <div className="membresia-tag">Astrología &amp; Bienestar</div>
              <h2 className="membresia-title">Transformá la duda<br /><em>en decisión</em></h2>
              <p className="membresia-desc">La astrología es una herramienta para conocerte mejor y tomar decisiones con certeza.</p>
              <ul className="membresia-benefits">
                {BENEFITS.map(b => <li key={b}><span className="benefit-star">✦</span><span>{b}</span></li>)}
              </ul>
              <Link to="/conoce" className="btn-coral">Conocé más</Link>
            </div>
            <div className="membresia-video-wrap">
              <div className="membresia-video-placeholder">
                <div className="play-icon">▶</div>
                <p style={{ fontSize:12, fontFamily:'var(--font-label)', letterSpacing:'0.1em', textTransform:'uppercase' }}>¡Bienvenid@, Astrolover!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
