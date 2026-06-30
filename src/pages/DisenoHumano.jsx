import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './DisenoHumano.css'

const PILARES = [
  { id:1, tipo:'Pilar 1', titulo:'Tipo', desc:'Devela tu naturaleza energética. Existen 5 tipos de energía y cada uno tiene características específicas que definen cómo te relacionás con el mundo.', emoji:'⚛', bg:'linear-gradient(145deg,#2f4156,#19232e)' },
  { id:2, tipo:'Pilar 2', titulo:'Estrategia', desc:'Representa la manera única de moverte por la vida de acuerdo a tu energía: cómo iniciás, respondés y te relacionás con los demás.', emoji:'∿', bg:'linear-gradient(145deg,#3a5069,#2f4156)' },
  { id:3, tipo:'Pilar 3', titulo:'Autoridad', desc:'Tu propia brújula interna, la que te guía a tomar las decisiones más alineadas a tu energía y tu diseño. (Y no, no es la mente).', emoji:'◈', bg:'linear-gradient(145deg,#1a3040,#0d1f2d)' },
]

const TIPOS = [
  { id:1, section:'tipos', tipo:'35% de la población', titulo:'Generador', desc:'Están aquí para experimentar satisfacción y para mover al mundo desde lo que les apasiona.', emoji:'⚡', bg:'linear-gradient(145deg,#2f4156,#19232e)' },
  { id:2, section:'tipos', tipo:'35% de la población', titulo:'Generador Manifestante', desc:'Su característica principal es la multipasionalidad y el multitasking. Vinieron a experimentarlo todo y a conectar con la satisfacción y la paz.', emoji:'✺', bg:'linear-gradient(145deg,#3a5069,#2f4156)' },
  { id:3, section:'tipos', tipo:'20% de la población', titulo:'Proyector', desc:'Están aquí para traer los nuevos paradigmas y las nuevas formas. Vinieron a guiar y liderar desde su energía al mundo.', emoji:'◎', bg:'linear-gradient(145deg,#1a3040,#0d1f2d)' },
  { id:4, section:'tipos', tipo:'8% de la población', titulo:'Manifestador', desc:'Están aquí para ser pioneros y traer lo nuevo. Es el único tipo que vino a accionar confiando en sus propios pulsos internos.', emoji:'✦', bg:'linear-gradient(145deg,#2d2d4a,#1a1a2e)' },
  { id:5, section:'tipos', tipo:'2% de la población', titulo:'Reflector', desc:'El único tipo lunar. Vinieron a espejar al mundo, a mostrarnos las energías disponibles y hacia dónde nos estamos dirigiendo.', emoji:'◐', bg:'linear-gradient(145deg,#0d1520,#19232e)' },
]

const BENEFICIOS = [
  'Comprender tu tipo de energía y cómo usarla de manera consciente, sin agotarte.',
  'Tomar decisiones alineadas con tu verdad interna.',
  'Reconocer los patrones mentales o condicionamientos que te alejan de tu autenticidad.',
  'Conectar con tu propósito y tu forma única de contribuir al mundo.',
  'Conocer y honrar la energía de las personas que te rodean.',
  'Dejar de lado el sobrepensamiento y usar la mente para lo que realmente vino a ser utilizada.',
  'Vivir una vida más ligera, consciente y coherente.',
  'Reactivar tu magnetismo único para manifestar desde tu propia coherencia interna.',
]

const FAQS = [
  { q:'¿Es lo mismo la carta de Diseño Humano que la carta natal?', a:'No. La carta de Diseño Humano integra la astrología dentro del sistema y se calcula con la misma información (hora, fecha y lugar de nacimiento), pero no es lo mismo que la carta natal. Es un sistema único que te da información sobre tu energía y quién sos en esencia, libre del condicionamiento y del "deber ser".' },
  { q:'¿Para qué sirve esta herramienta de autoconocimiento?', a:'Cuando se integra a conciencia, puede transformar tu vida. Te sirve para conocerte, honrarte, valorarte, activar tu magnetismo, manifestar desde tu propia coherencia energética, soltar el control, dejar de lado el sobrepensamiento, confiar en tu verdad y vivir en libertad.' },
  { q:'¿Necesito conocimiento previo para tomar una sesión?', a:'No hace falta ningún conocimiento previo. Solo ganas de conocer tu energía, desaprender y conectar con tu conciencia corporal.' },
  { q:'¿Qué tan específica tiene que ser la hora de nacimiento?', a:'Mientras más específica, mejor (podés chequearla en tu acta de nacimiento). Si tenés un aproximado, se pueden comparar cartas en distintos horarios para ver qué aspectos cambian. Si no tenés ningún dato, escribinos y te ayudamos a encontrar la mejor solución.' },
  { q:'¿Qué pasa si no aparece mi lugar de nacimiento al calcular la carta?', a:'Podés colocar una localidad cercana que sí figure en el sistema. A veces las localidades pequeñas no están registradas, pero eso no es un problema.' },
]

function PilarCard({ item }) {
  return (
    <div className="astro-card anim-fadeInUp">
      <div className="astro-card-img" style={{ background: item.bg }}>
        <span className="astro-card-emoji">{item.emoji}</span>
      </div>
      <div className="astro-card-body">
        <span className="astro-card-tipo">{item.tipo}</span>
        <h3 className="astro-card-title">{item.titulo}</h3>
        <p className="astro-card-desc">{item.desc}</p>
      </div>
    </div>
  )
}

function TipoCard({ item, delay = 0 }) {
  return (
    <div className="astro-card anim-fadeInUp" style={{ animationDelay: `${delay}s` }}>
      <div className="astro-card-img" style={{ background: item.bg }}>
        <span className="astro-card-emoji">{item.emoji}</span>
      </div>
      <div className="astro-card-body">
        <span className="astro-card-tipo">{item.tipo}</span>
        <h3 className="astro-card-title">{item.titulo}</h3>
        <p className="astro-card-desc">{item.desc}</p>
      </div>
    </div>
  )
}

export default function DisenoHumano() {
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
          <h1 className="astro-banner-title">Diseño Humano</h1>
          <p className="astro-banner-subtitle">Una guía energética para recordar quién sos, libre de condicionamientos</p>
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

      {/* QUÉ ES */}
      <section id="que-es" className="astro-section">
        <div className="container-astral">
          <div className="astro-section-header">
            <h2 className="astro-section-title">¿Qué es Diseño Humano?</h2>
          </div>
          <div className="dh-intro">
            <p>
              Diseño Humano es una guía energética que te invita a <strong>recordar quién sos</strong> realmente,
              en esencia y libre de condicionamientos.
            </p>
            <p>
              Es una herramienta de autoconocimiento canalizada en 1987 que combina <strong>conocimiento ancestral</strong>
              {' '}(Astrología, I Ching, Chakras y Kabbalah) <strong>y moderno</strong> (física cuántica y genética),
              revelando cómo funciona tu energía.
            </p>
            <p>
              Es la ciencia de la diferenciación y representa tu propio "manual de uso" para que puedas vivir
              una vida más consciente, coherente y auténtica.
            </p>
          </div>
          <ul className="dh-benefits-list">
            {BENEFICIOS.map(b => (
              <li key={b}><span className="benefit-star">✦</span><span>{b}</span></li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3 PILARES */}
      <section id="pilares" className="astro-section astro-section-alt">
        <div className="container-astral">
          <div className="astro-section-header">
            <h2 className="astro-section-title">Los 3 pilares de tu carta</h2>
            <p className="astro-section-desc">Tipo · Estrategia · Autoridad — el punto de partida para integrar tu energía</p>
          </div>
          <div className="astro-cards-grid">
            {PILARES.map(item => <PilarCard key={item.id} item={item} />)}
          </div>
          <div style={{ textAlign:'center', marginTop:48 }}>
            <a href="https://www.geneticmatrix.com/" target="_blank" rel="noopener noreferrer" className="btn-coral">Calculá tu carta gratuita</a>
          </div>
        </div>
      </section>

      {/* 5 TIPOS */}
      <section id="tipos" className="astro-section">
        <div className="container-astral">
          <div className="astro-section-header">
            <h2 className="astro-section-title">Los 5 tipos energéticos</h2>
            <p className="astro-section-desc">Una vez que tengas tu carta, descubrí cuál es tu naturaleza energética</p>
          </div>
          <div className="astro-cards-grid">
            {TIPOS.map((item, i) => <TipoCard key={item.id} item={item} delay={i * 0.08} />)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="astro-section astro-section-alt">
        <div className="container-astral">
          <div className="astro-section-header">
            <h2 className="astro-section-title">Preguntas frecuentes</h2>
          </div>
          <div className="dh-faq">
            {FAQS.map(f => (
              <div key={f.q} className="dh-faq-item">
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="astro-section" style={{ textAlign:'center' }}>
        <div className="container-astral">
          <p style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.4rem,3vw,2rem)', color:'var(--text-dark)', maxWidth:600, margin:'0 auto 28px', lineHeight:1.4 }}>
            ¿Estás listx para conocerte en profundidad y encarnar tu energía?
          </p>
          <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
            <a href="/eventos" className="btn-coral">Conocé mis espacios en vivo</a>
            <a href="/tienda" className="btn-outline-dark">Ver programas y guías</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
