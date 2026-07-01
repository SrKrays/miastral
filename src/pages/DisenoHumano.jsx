import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './DisenoHumano.css'

const PILARES = [
  { id:1, tipo:'Pilar 1', titulo:'Tipo', desc:'Revela tu naturaleza energética. Existen 5 tipos áuricos y cada uno tiene características específicas que definen cómo te relacionás con el mundo y la vida.', emoji:'⚛', bg:'linear-gradient(145deg,#2f4156,#19232e)' },
  { id:2, tipo:'Pilar 2', titulo:'Estrategia', desc:'Es la manera más alineada de interactuar con la vida según tu tipo de energía. Te muestra cómo accionar desde un lugar correcto para fluir en armonía con la vida sin resistencias, moverte con mayor facilidad y conectar con tu autenticidad.', emoji:'∿', bg:'linear-gradient(145deg,#3a5069,#2f4156)' },
  { id:3, tipo:'Pilar 3', titulo:'Autoridad', desc:'Tu propia brújula interna, la que te guía a tomar las decisiones más alineadas a tu energía y tu diseño. (Y no, tu brújula no es la mente).', emoji:'◈', bg:'linear-gradient(145deg,#1a3040,#0d1f2d)' },
]

const TIPOS = [
  { id:1, tipo:'35% de la población', titulo:'Generador', desc:'Están aquí para experimentar satisfacción y construir una vida alineada con lo que verdaderamente los apasiona. Cuando siguen su respuesta interna, inspiran al mundo con su energía vital y creadora.', emoji:'⚡', bg:'linear-gradient(145deg,#2f4156,#19232e)', pdf:'https://drive.google.com/file/d/1oEED-TDQZlu51Njzd-VQLyrPKfFlyc19/view' },
  { id:2, tipo:'35% de la población', titulo:'Generador Manifestante', desc:'Están aquí para experimentar, crear y abrirse a múltiples caminos. Su naturaleza multipotencial los impulsa a innovar, adaptarse y demostrar que no existe una única forma de vivir el propósito.', emoji:'✺', bg:'linear-gradient(145deg,#3a5069,#2f4156)', pdf:'https://drive.google.com/file/d/1Xm9Zs-p4vnr_p817CjKotkr67pmHkQ71/view' },
  { id:3, tipo:'20% de la población', titulo:'Proyector', desc:'Están aquí para traer nuevos paradigmas y nuevas formas de comprender la vida. Su energía está diseñada para guiar, liderar y acompañar a otros hacia su máximo potencial.', emoji:'◎', bg:'linear-gradient(145deg,#1a3040,#0d1f2d)', pdf:'https://drive.google.com/file/d/1VjDnuXU7o7_geX57ehvBmqbFdP2vkpQ9/view' },
  { id:4, tipo:'8% de la población', titulo:'Manifestador', desc:'Están aquí para ser pioneros y traer lo nuevo. Son el único tipo diseñado para iniciar desde sus propios impulsos internos, convirtiéndose en catalizadores del cambio.', emoji:'✦', bg:'linear-gradient(145deg,#2d2d4a,#1a1a2e)', pdf:'https://drive.google.com/file/d/1s4ZyTqY5rL7RXE6Bxl5zkfZaZqkd3AlT/view' },
  { id:5, tipo:'2% de la población', titulo:'Reflector', desc:'Son el único tipo lunar. Están aquí para reflejar la salud de la comunidad y mostrarnos, a través de su sensibilidad, el potencial y la dirección de nuestro entorno.', emoji:'◐', bg:'linear-gradient(145deg,#0d1520,#19232e)', pdf:'https://drive.google.com/file/d/1X4MmvFhcjCvkgyGEn6mY2DFGLZ0o55uF/view' },
]

const BENEFICIOS = [
  'Comprender cómo funciona tu energía y aprender a gestionarla sin agotarte.',
  'Tomar decisiones alineadas con tu verdad interna.',
  'Reconocer los patrones mentales o condicionamientos que te alejan de tu autenticidad.',
  'Conectar con tu propósito y tu forma única de contribuir al mundo.',
  'Conocer y honrar la energía de las personas que te rodean.',
  'Dejar de identificarte con la mente y utilizarla para lo que realmente fue diseñada: observar, aprender e inspirar, no decidir.',
  'Vivir con mayor coherencia, autenticidad y confianza en tu propio camino.',
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
        {item.pdf && (
          <a href={item.pdf} target="_blank" rel="noopener noreferrer" className="btn-sand" style={{ fontSize:11, marginTop:12 }}>
            Descargá la guía gratuita
          </a>
        )}
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
        <div className="astro-banner-content">
          <h1 className="astro-banner-title">Diseño Humano</h1>
          <p className="astro-banner-subtitle">Un mapa energético para recordar tu verdad, liberarte de los condicionamientos y vivir más auténticamente</p>
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
              El Diseño Humano es un mapa energético que se calcula a partir de tus datos de nacimiento y te invita
              a recordar quién sos realmente: más allá de los condicionamientos, las expectativas y los mandatos
              que fuiste incorporando a lo largo de tu vida.
            </p>
            <p>
              Es una herramienta de autoconocimiento canalizada en 1987 por Ra Uru Hu que integra sabidurías
              ancestrales como la Astrología, el I Ching, la Kabbalah y el sistema de chakras, junto con
              conocimientos modernos de la genética y la física.
            </p>
            <p>
              Conocido como "la ciencia de la diferenciación", el Diseño Humano revela la forma única en que tu
              energía fue diseñada para expresarse. Más que decirte quién tenés que ser, te ofrece una guía para
              comprender cómo tomar decisiones alineadas con tu naturaleza, relacionarte con mayor autenticidad
              y vivir una vida más consciente, coherente y en armonía con vos mismo.
            </p>
          </div>
          <p className="dh-benefits-title">Esta herramienta te ayuda a:</p>
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

      {/* VIDEO — placeholder hasta que Valentina lo tenga listo */}
      <section className="astro-section astro-section-alt">
        <div className="container-astral" style={{ textAlign:'center' }}>
          <div className="astro-section-header">
            <h2 className="astro-section-title">Cómo interpretar tu BodyGraph</h2>
            <p className="astro-section-desc">Una guía visual para empezar a leer tu carta desde cero</p>
          </div>
          <div className="dh-video-wrap">
            <div className="dh-video-placeholder">
              <div className="play-icon">▶</div>
              <p style={{ fontSize:12, fontFamily:'var(--font-label)', letterSpacing:'0.1em', textTransform:'uppercase', marginTop:16, color:'rgba(255,255,255,0.5)' }}>Video próximamente</p>
            </div>
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
            <a href="/tienda#sesiones" className="btn-coral">Conocé mis servicios</a>
            <a href="/tienda#programas" className="btn-sand">Ver programas y talleres</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
