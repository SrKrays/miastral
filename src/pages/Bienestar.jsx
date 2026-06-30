import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './Bienestar.css'

const CONTENT_BIENESTAR = [
  { id:1, section:'manifestacion', tipo:'Manifestación', titulo:'Conectá con tu poder creador', desc:'Una guía para adentrarte en el mundo de la manifestación: aprendizaje, consciencia y reprogramación para volverte dueñx de tu realidad.', emoji:'◈', bg:'linear-gradient(145deg,#3a5069,#2f4156)' },
  { id:2, section:'manifestacion', tipo:'Manifestación', titulo:'Diseño Humano & Manifestación', desc:'Cuando te anclás en tu frecuencia propia y verdadera, la manifestación y los procesos de cocreación son más alineados y suaves.', emoji:'✺', bg:'linear-gradient(145deg,#2f4156,#19232e)' },
  { id:3, section:'conciencia-corporal', tipo:'Conciencia corporal', titulo:'Reconectá con tu verdad', desc:'Menos mente y más conciencia corporal: la espera como acto de alineación y cómo la mente interfiere en la toma de decisiones.', emoji:'◐', bg:'linear-gradient(145deg,#1a3040,#0d1f2d)' },
  { id:4, section:'conciencia-corporal', tipo:'Conciencia corporal', titulo:'El poder de la palabra', desc:'Las palabras no son inocentes: cada una lleva una carga energética, una intención y una frecuencia que impacta en quien las recibe y en quien las emite.', emoji:'∿', bg:'linear-gradient(145deg,#2d2d4a,#1a1a2e)' },
  { id:5, section:'magnetismo', tipo:'Magnetismo', titulo:'Activá tu magnetismo único', desc:'Cuando entendemos cómo funcionamos energéticamente y honramos nuestra frecuencia, nos abrimos a vivir realidades más ligeras, creativas y expansivas.', emoji:'⚡', bg:'linear-gradient(145deg,#3a2040,#1a0d28)' },
  { id:6, section:'centros', tipo:'Centros energéticos', titulo:'Centros energéticos de tu carta', desc:'Una guía para conocer los centros de energía de tu BodyGraph y cómo cada uno influye en tu manera de tomar decisiones.', emoji:'⚛', bg:'linear-gradient(145deg,#0d1520,#19232e)' },
]

function WellnessCard({ item, delay = 0 }) {
  return (
    <div className="wellness-card anim-fadeInUp" style={{ animationDelay: `${delay}s` }}>
      <div className="wellness-card-img" style={{ background: item.bg }}>
        <span className="wellness-card-emoji">{item.emoji}</span>
      </div>
      <div className="wellness-card-body">
        <span className="wellness-card-tipo">{item.tipo}</span>
        <h3 className="wellness-card-title">{item.titulo}</h3>
        <p className="wellness-card-desc">{item.desc}</p>
        <button className="btn-blue wellness-card-cta">Ver clase</button>
      </div>
    </div>
  )
}

export default function Bienestar() {
  const manifestacionItems = CONTENT_BIENESTAR.filter(i => i.section === 'manifestacion')
  const concienciaItems = CONTENT_BIENESTAR.filter(i => i.section === 'conciencia-corporal')
  const magnetismoItems = CONTENT_BIENESTAR.filter(i => i.section === 'magnetismo')
  const centrosItems = CONTENT_BIENESTAR.filter(i => i.section === 'centros')

  return (
    <>
      <Navbar />

      {/* BANNER */}
      <section className="wellness-banner">
        <div className="wellness-banner-decoration wellness-banner-left">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="90" fill="var(--bg-cream)" />
            <circle cx="100" cy="100" r="85" fill="var(--accent-coral)" />
            <circle cx="100" cy="100" r="60" fill="var(--bg-black)" opacity="0.8" />
            <circle cx="100" cy="100" r="50" fill="none" stroke="var(--text-dark)" strokeWidth="2" opacity="0.3" />
          </svg>
        </div>
        <div className="wellness-banner-content">
          <h1 className="wellness-banner-title">Bienestar</h1>
          <p className="wellness-banner-subtitle">Conciencia corporal, magnetismo y frecuencia: cuidá tu energía desde adentro</p>
        </div>
        <div className="wellness-banner-decoration wellness-banner-right">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="90" fill="var(--bg-cream)" />
            <circle cx="100" cy="100" r="80" fill="var(--bg-black)" />
            <circle cx="100" cy="100" r="70" fill="var(--accent-coral)" opacity="0.9" />
            <circle cx="70" cy="70" r="25" fill="var(--bg-cream)" opacity="0.6" />
          </svg>
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
            {manifestacionItems.map((item, i) => <WellnessCard key={item.id} item={item} delay={i * 0.1} />)}
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
            {concienciaItems.map((item, i) => <WellnessCard key={item.id} item={item} delay={i * 0.1} />)}
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
            {magnetismoItems.map((item, i) => <WellnessCard key={item.id} item={item} delay={i * 0.1} />)}
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
            {centrosItems.map((item, i) => <WellnessCard key={item.id} item={item} delay={i * 0.1} />)}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

