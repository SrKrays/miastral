import { useContext } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { ContenidoContext } from '../context/ContenidoContext'
import { getYoutubeThumb } from '../utils/youtube'
import './Bienestar.css'

// clave = prefijo usado en el panel admin (Contenido) para esta card:
// {clave}Titulo, {clave}Desc y, según esVideo, {clave} (link de YouTube) o
// {clave}Imagen (foto subida a Ferozo).
const CONTENT_BIENESTAR = [
  { id:1, clave:'bienestar1', esVideo:false, section:'manifestacion', tipo:'Manifestación', titulo:'Conectá con tu poder creador', desc:'Una guía para adentrarte en el mundo de la manifestación: aprendizaje, consciencia y reprogramación para volverte dueñx de tu realidad.', emoji:'◈', bg:'linear-gradient(145deg,#3a5069,#2f4156)', link:'/tienda#productos' },
  { id:2, clave:'bienestar2', esVideo:true, section:'manifestacion', tipo:'Manifestación', titulo:'Diseño Humano & Manifestación', desc:'Cuando te anclás en tu frecuencia propia y verdadera, la manifestación y los procesos de cocreación son más alineados y suaves.', emoji:'✺', bg:'linear-gradient(145deg,#2f4156,#19232e)', link:'https://youtu.be/tGXzNPjVgtc' },
  { id:3, clave:'bienestar3', esVideo:true, section:'conciencia-corporal', tipo:'Conciencia corporal', titulo:'Reconectá con tu verdad', desc:'Menos mente y más conciencia corporal: la espera como acto de alineación y cómo la mente interfiere en la toma de decisiones.', emoji:'◐', bg:'linear-gradient(145deg,#1a3040,#0d1f2d)', link:'https://youtu.be/wpdvSn7m3CY' },
  { id:4, clave:'bienestar4', esVideo:true, section:'conciencia-corporal', tipo:'Conciencia corporal', titulo:'El poder de la palabra', desc:'Las palabras no son inocentes: cada una lleva una carga energética, una intención y una frecuencia que impacta en quien las recibe y en quien las emite.', emoji:'∿', bg:'linear-gradient(145deg,#2d2d4a,#1a1a2e)', link:'https://youtu.be/yjfWwwnglEA' },
  { id:5, clave:'bienestar5', esVideo:false, section:'magnetismo', tipo:'Magnetismo', titulo:'Activá tu magnetismo único', desc:'Cuando entendemos cómo funcionamos energéticamente y honramos nuestra frecuencia, nos abrimos a vivir realidades más ligeras, creativas y expansivas.', emoji:'⚡', bg:'linear-gradient(145deg,#3a2040,#1a0d28)', link:null },
  { id:6, clave:'bienestar6', esVideo:false, section:'centros', tipo:'Centros energéticos', titulo:'Centros energéticos de tu carta', desc:'Una guía para conocer los centros de energía de tu BodyGraph y cómo cada uno influye en tu manera de tomar decisiones.', emoji:'⚛', bg:'linear-gradient(145deg,#0d1520,#19232e)', link:'https://drive.google.com/file/d/1ddLx7wW2Zl6rFWN5Eu6oiXu5IpO4-EgI/view?usp=sharing' },
]

function WellnessCard({ item, delay = 0, contenido }) {
  const titulo = contenido?.[`${item.clave}Titulo`] || item.titulo
  const desc = contenido?.[`${item.clave}Desc`] || item.desc
  const link = item.esVideo ? (contenido?.[item.clave] || item.link) : item.link
  const foto = item.esVideo ? getYoutubeThumb(link) : (contenido?.[`${item.clave}Imagen`] || null)
  const isExternal = link && link.startsWith('http')
  return (
    <div className="wellness-card anim-fadeInUp" style={{ animationDelay: `${delay}s` }}>
      <div className="wellness-card-img" style={{ background: item.bg }}>
        {foto
          ? <img src={foto} alt={titulo} className="wellness-card-photo" />
          : <span className="wellness-card-emoji">{item.emoji}</span>
        }
      </div>
      <div className="wellness-card-body">
        <span className="wellness-card-tipo">{item.tipo}</span>
        <h3 className="wellness-card-title">{titulo}</h3>
        <p className="wellness-card-desc">{desc}</p>
        {link ? (
          <a href={link} {...(isExternal ? { target:'_blank', rel:'noopener noreferrer' } : {})} className="btn-blue wellness-card-cta">Ver clase</a>
        ) : (
          <span className="wellness-card-cta wellness-card-cta--soon">Muy pronto</span>
        )}
      </div>
    </div>
  )
}

export default function Bienestar() {
  const { contenido } = useContext(ContenidoContext)
  const manifestacionItems = CONTENT_BIENESTAR.filter(i => i.section === 'manifestacion')
  const concienciaItems = CONTENT_BIENESTAR.filter(i => i.section === 'conciencia-corporal')
  const magnetismoItems = CONTENT_BIENESTAR.filter(i => i.section === 'magnetismo')
  const centrosItems = CONTENT_BIENESTAR.filter(i => i.section === 'centros')

  return (
    <>
      <Navbar />

      {/* BANNER */}
      <section className="wellness-banner">
        <div className="wellness-banner-content">
          <h1 className="wellness-banner-title">Bienestar</h1>
          <p className="wellness-banner-subtitle">Conciencia corporal, magnetismo y frecuencia: cuidá tu energía desde adentro</p>
        </div>
      </section>

      {/* MANIFESTACIÓN */}
      <section id="manifestacion" className="wellness-section">
        <div className="container-astral">
          <div className="wellness-section-header">
            <h2 className="wellness-section-title">Manifestación</h2>
            <p className="wellness-section-desc">Aprendé a crear desde tu coherencia energética</p>
          </div>
          <div className="wellness-cards-grid">
            {manifestacionItems.map((item, i) => <WellnessCard key={item.id} item={item} delay={i * 0.1} contenido={contenido} />)}
          </div>
        </div>
      </section>

      {/* CONCIENCIA CORPORAL */}
      <section id="conciencia-corporal" className="wellness-section wellness-section-alt">
        <div className="container-astral">
          <div className="wellness-section-header">
            <h2 className="wellness-section-title">Conciencia corporal</h2>
            <p className="wellness-section-desc">Menos mente, más cuerpo: confiá en tu intuición</p>
          </div>
          <div className="wellness-cards-grid">
            {concienciaItems.map((item, i) => <WellnessCard key={item.id} item={item} delay={i * 0.1} contenido={contenido} />)}
          </div>
        </div>
      </section>

      {/* MAGNETISMO */}
      <section id="magnetismo" className="wellness-section">
        <div className="container-astral">
          <div className="wellness-section-header">
            <h2 className="wellness-section-title">Magnetismo y atracción</h2>
            <p className="wellness-section-desc">Desplegá tu poder magnético natural</p>
          </div>
          <div className="wellness-cards-grid">
            {magnetismoItems.map((item, i) => <WellnessCard key={item.id} item={item} delay={i * 0.1} contenido={contenido} />)}
          </div>
        </div>
      </section>

      {/* CENTROS ENERGÉTICOS */}
      <section id="centros" className="wellness-section wellness-section-alt">
        <div className="container-astral">
          <div className="wellness-section-header">
            <h2 className="wellness-section-title">Centros energéticos</h2>
            <p className="wellness-section-desc">Conocé el mapa de tu energía en profundidad</p>
          </div>
          <div className="wellness-cards-grid">
            {centrosItems.map((item, i) => <WellnessCard key={item.id} item={item} delay={i * 0.1} contenido={contenido} />)}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
