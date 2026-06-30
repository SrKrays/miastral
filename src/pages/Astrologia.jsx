import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './Astrologia.css'

const CONTENT_ASTRAL = [
  { id:1, section:'carta', tipo:'Herramienta', titulo:'Calculá tu carta astral', desc:'Conocé el mapa de los planetas al momento de tu nacimiento. Entendé tus talentos, personalidad y propósito de vida.', emoji:'♄', bg:'linear-gradient(145deg,#2f4156,#19232e)' },
  { id:2, section:'transitos', tipo:'Predicción', titulo:'Tránsitos diarios', desc:'Sabé cómo se mueven los planetas hoy y comprendé qué energía está influyendo en vos.', emoji:'🪐', bg:'linear-gradient(145deg,#3a5069,#2f4156)' },
  { id:3, section:'horoscopos', tipo:'Horóscopos', titulo:'Horóscopo julio 2026: el mes más importante del año', desc:'Descubrí qué trae la Luna llena en Capricornio y cómo te afecta según tu signo.', emoji:'🌙', bg:'linear-gradient(145deg,#1a3040,#0d1f2d)' },
  { id:4, section:'horoscopos', tipo:'Horóscopos', titulo:'Júpiter en Leo transitando por tus planetas natales', desc:'¿Qué trae para ti? Descubrí cómo esta influencia te impacta en este signo.', emoji:'⭐', bg:'linear-gradient(145deg,#2d2d4a,#1a1a2e)' },
  { id:5, section:'rituales', tipo:'Rituales', titulo:'Ritual de la Luna Nueva: atrae lo que deseas', desc:'Aprende paso a paso cómo hacer un ritual poderoso en la Luna Nueva. Guía práctica.', emoji:'🌑', bg:'linear-gradient(145deg,#3a2040,#1a0d28)' },
  { id:6, section:'rituales', tipo:'Rituales', titulo:'Limpieza energética con la Luna Llena', desc:'Conocé las mejores prácticas para limpiar tu energía durante la Luna Llena.', emoji:'🌕', bg:'linear-gradient(145deg,#0d1520,#19232e)' },
]

function ContentCard({ item, delay = 0 }) {
  return (
    <div className="astro-card anim-fadeInUp" style={{ animationDelay: `${delay}s` }}>
      <div className="astro-card-img" style={{ background: item.bg }}>
        <span className="astro-card-emoji">{item.emoji}</span>
      </div>
      <div className="astro-card-body">
        <span className="astro-card-tipo">{item.tipo}</span>
        <h3 className="astro-card-title">{item.titulo}</h3>
        <p className="astro-card-desc">{item.desc}</p>
        <button className="btn-blue astro-card-cta">Explorar</button>
      </div>
    </div>
  )
}

export default function Astrologia() {
  const cartaItems = CONTENT_ASTRAL.filter(i => i.section === 'carta')
  const transitosItems = CONTENT_ASTRAL.filter(i => i.section === 'transitos')
  const horoscopesItems = CONTENT_ASTRAL.filter(i => i.section === 'horoscopos')
  const ritualesItems = CONTENT_ASTRAL.filter(i => i.section === 'rituales')

  return (
    <>
      <Navbar />

      {/* BANNER */}
      <section className="astro-banner">
        <div className="astro-banner-decoration astro-banner-left">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="90" fill="var(--bg-cream)" />
            <circle cx="100" cy="100" r="85" fill="var(--accent-coral)" />
            <circle cx="100" cy="100" r="60" fill="var(--bg-black)" opacity="0.8" />
            <circle cx="100" cy="100" r="50" fill="none" stroke="var(--text-dark)" strokeWidth="2" opacity="0.3" />
          </svg>
        </div>
        <div className="astro-banner-content">
          <h1 className="astro-banner-title">Astrología</h1>
          <p className="astro-banner-subtitle">Descubrí los misterios del cosmos y cómo influyen en tu vida</p>
        </div>
        <div className="astro-banner-decoration astro-banner-right">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="90" fill="var(--bg-cream)" />
            <circle cx="100" cy="100" r="80" fill="var(--bg-black)" />
            <circle cx="100" cy="100" r="70" fill="var(--accent-coral)" opacity="0.9" />
            <circle cx="70" cy="70" r="25" fill="var(--bg-cream)" opacity="0.6" />
          </svg>
        </div>
      </section>

      {/* CARTA ASTRAL */}
      <section id="carta" className="astro-section">
        <div className="container-astral">
          <div className="astro-section-header">
            <h2 className="astro-section-title">Carta astral</h2>
            <p className="astro-section-desc">Tu mapa celestial personal — entendé quién eres realmente</p>
          </div>
          <div className="astro-cards-grid">
            {cartaItems.map((item, i) => <ContentCard key={item.id} item={item} delay={i * 0.1} />)}
          </div>
        </div>
      </section>

      {/* TRÁNSITOS */}
      <section id="transitos" className="astro-section astro-section-alt">
        <div className="container-astral">
          <div className="astro-section-header">
            <h2 className="astro-section-title">Tránsitos planetarios</h2>
            <p className="astro-section-desc">Cómo se mueven los planetas hoy y qué energía traen</p>
          </div>
          <div className="astro-cards-grid">
            {transitosItems.map((item, i) => <ContentCard key={item.id} item={item} delay={i * 0.1} />)}
          </div>
        </div>
      </section>

      {/* HORÓSCOPOS */}
      <section id="horoscopos" className="astro-section">
        <div className="container-astral">
          <div className="astro-section-header">
            <h2 className="astro-section-title">Horóscopos</h2>
            <p className="astro-section-desc">Pronósticos personalizados para cada signo</p>
          </div>
          <div className="astro-cards-grid">
            {horoscopesItems.map((item, i) => <ContentCard key={item.id} item={item} delay={i * 0.1} />)}
          </div>
        </div>
      </section>

      {/* RITUALES */}
      <section id="rituales" className="astro-section astro-section-alt">
        <div className="container-astral">
          <div className="astro-section-header">
            <h2 className="astro-section-title">Rituales y prácticas</h2>
            <p className="astro-section-desc">Conectá con la energía lunar y planetaria</p>
          </div>
          <div className="astro-cards-grid">
            {ritualesItems.map((item, i) => <ContentCard key={item.id} item={item} delay={i * 0.1} />)}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

